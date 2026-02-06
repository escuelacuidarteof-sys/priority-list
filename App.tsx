
import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from './src/services/supabase';
import { FormData, SubmissionStatus } from './types';
import { COUNTRIES } from './src/utils/constants';
import LoadingView from './src/components/LoadingView';
import GatedKitView from './src/components/GatedKitView';
import SuccessView from './src/components/SuccessView';
import RegistrationForm from './src/components/RegistrationForm';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: 'España',
    otherCountry: '',
    countryCode: '+34',
    age: '',
    sex: '',
    situation: '',
    interest: '',
    consent: false,
    utm_source: undefined,
    utm_medium: undefined,
    utm_campaign: undefined,
  });

  const [status, setStatus] = useState<SubmissionStatus | 'verifying' | 'gated_kit'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Al cargar, verificar si viene con un ID para ver el Kit
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uidFromUrl = params.get('uid');
    const uidFromStorage = localStorage.getItem('cuidarte_uid');
    const uid = uidFromUrl || uidFromStorage;

    if (uid) {
      verifyAccess(uid);
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedCountry = COUNTRIES.find(c => c.timezone.startsWith(tz.split('/')[0])) || COUNTRIES.find(c => c.name === 'España');

    setFormData(prev => ({
      ...prev,
      country: detectedCountry?.name || 'España',
      countryCode: detectedCountry?.dial || '+34',
      utm_source: params.get('utm_source') || undefined,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAccess = async (uid: string) => {
    setStatus('verifying');
    try {
      const { data, error } = await supabase
        .from('leads_escuela_cuidarte')
        .select('id')
        .eq('id', uid)
        .single();

      if (error) throw error;

      if (data) {
        setSubmittedLeadId(data.id);
        localStorage.setItem('cuidarte_uid', data.id);
        setStatus('gated_kit');
      } else {
        localStorage.removeItem('cuidarte_uid');
        setStatus('idle');
        setErrorMessage('El enlace de acceso ha caducado o no es válido. Por favor, regístrate de nuevo.');
      }
    } catch (err: unknown) {
      console.error('Verify access error:', err);
      setStatus('idle');
      // If error (e.g. not found), go to idle
    }
  };

  const progress = useMemo(() => {
    const requiredFields = ['name', 'email', 'phone', 'country', 'age', 'sex', 'situation', 'interest', 'consent'];
    const filled = requiredFields.filter(field => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (field === 'consent') return (formData as any).consent;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !!(formData as any)[field];
    }).length;
    return (filled / requiredFields.length) * 100;
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = type === 'checkbox' ? (e.target as any).checked : value;

    setFormData(prev => {
      const newData = { ...prev, [name]: val };
      if (name === 'country') {
        const countryData = COUNTRIES.find(c => c.name === value);
        if (countryData && value !== 'Otros') {
          newData.countryCode = countryData.dial;
        } else if (value === 'Otros') {
          newData.countryCode = '+';
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const cleanPhoneInput = formData.phone.replace(/[\s\-\(\)]/g, '');
    const normalizedPhone = `${(formData.countryCode || '').trim()}${cleanPhoneInput}`;
    const finalCountry = formData.country === 'Otros' ? (formData.otherCountry || 'Otros') : formData.country;

    try {
      const { data, error } = await supabase
        .from('leads_escuela_cuidarte')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: normalizedPhone,
          country: finalCountry,
          age: formData.age,
          sex: formData.sex,
          situation: formData.situation,
          interest: formData.interest,
          consent: formData.consent,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
        }])
        .select('id')
        .single();

      if (error) throw error;

      if (data) {
        setSubmittedLeadId(data.id);
        localStorage.setItem('cuidarte_uid', data.id);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).confetti) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#34d399']
        });
      }

      setStatus('success');
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage('No se pudo completar el registro. Inténtalo de nuevo.');
    }
  };

  const handleOpenKit = async () => {
    if (!submittedLeadId) return;
    setIsDownloading(true);
    setStatus('gated_kit');

    try {
      await supabase
        .from('leads_escuela_cuidarte')
        .update({ downloaded_kit: true })
        .eq('id', submittedLeadId);
    } catch (err) {
      console.error('Error tracking download:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {status === 'verifying' && <LoadingView key="loading" />}
      {status === 'gated_kit' && <GatedKitView key="gated_kit" onVerify={() => setStatus('success')} />}
      {status === 'success' && (
        <SuccessView
          key="success"
          submittedLeadId={submittedLeadId}
          onOpenKit={handleOpenKit}
          isDownloading={isDownloading}
        />
      )}
      {!['verifying', 'gated_kit', 'success'].includes(status) && (
        <RegistrationForm
          key="registration"
          formData={formData}
          status={status as SubmissionStatus}
          errorMessage={errorMessage}
          progress={progress}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </AnimatePresence>
  );
};

export default App;
