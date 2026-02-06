
import React from 'react';
import { motion } from 'framer-motion';
import { FormData, SubmissionStatus } from '../../types';
import { COUNTRIES, LOGO_URL } from '../utils/constants';

interface RegistrationFormProps {
    formData: FormData;
    status: SubmissionStatus;
    errorMessage: string | null;
    progress: number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
    formData,
    status,
    errorMessage,
    progress,
    handleInputChange,
    handleSubmit,
}) => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <div className="flex justify-center mb-6">
                        <img src={LOGO_URL} alt="Logo Dra. Odile" className="h-24 md:h-32 object-contain" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                        Escuela Cuid-Arte <br />
                        <span className="text-slate-500 font-medium">By Odile Fernández</span>
                    </h1>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">
                        Únete a nuestra lista prioritaria y recibe de regalo el{' '}
                        <span className="text-emerald-600 font-bold">Kit de Supervivencia</span> exclusivo de la Dra. Odile.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
                        <div className="h-full bg-emerald-500 progress-bar" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="p-6 md:p-12">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold flex gap-3 items-center border border-red-100"
                                >
                                    <i className="fa-solid fa-circle-exclamation"></i> {errorMessage}
                                </motion.div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nombre Completo *</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all bg-slate-50/50 outline-none"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Principal *</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all bg-slate-50/50 outline-none"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            <div
                                className={`grid grid-cols-1 ${formData.country === 'Otros' ? 'md:grid-cols-3' : 'md:grid-cols-2'
                                    } gap-6 transition-all duration-300`}
                            >
                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">País *</label>
                                    <div className="relative">
                                        <select
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 appearance-none bg-slate-50/50 pr-10 outline-none"
                                        >
                                            {COUNTRIES.map((c) => (
                                                <option key={c.name} value={c.name}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <i className="fa-solid fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>

                                {formData.country === 'Otros' && (
                                    <div className="group animate-fade-in">
                                        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Tu País *</label>
                                        <input
                                            name="otherCountry"
                                            type="text"
                                            required
                                            value={formData.otherCountry}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all bg-slate-50/50 outline-none"
                                            placeholder="Ej: Costa Rica"
                                        />
                                    </div>
                                )}

                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">WhatsApp *</label>
                                    <div className="flex gap-2">
                                        <input
                                            name="countryCode"
                                            type="text"
                                            required
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            readOnly={formData.country !== 'Otros'}
                                            className={`w-20 shrink-0 px-2 py-4 rounded-2xl border border-slate-200 text-center font-bold outline-none transition-colors ${formData.country === 'Otros'
                                                ? 'bg-white border-slate-400 focus:ring-4 focus:ring-slate-900/5'
                                                : 'bg-slate-100 text-slate-500'
                                                }`}
                                            placeholder="+1"
                                        />
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="flex-1 px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all bg-slate-50/50 outline-none"
                                            placeholder="600 000 000"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Rango de edad *</label>
                                    <div className="relative">
                                        <select
                                            name="age"
                                            required
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 appearance-none bg-slate-50/50 pr-10 outline-none"
                                        >
                                            <option value="" disabled>
                                                Selecciona rango
                                            </option>
                                            <option value="<35">Menos de 35 años</option>
                                            <option value="35-45">35–45 años</option>
                                            <option value="46-55">46–55 años</option>
                                            <option value=">55">Más de 55 años</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <i className="fa-solid fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Sexo *</label>
                                    <div className="relative">
                                        <select
                                            name="sex"
                                            required
                                            value={formData.sex}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 appearance-none bg-slate-50/50 pr-10 outline-none"
                                        >
                                            <option value="" disabled>
                                                Selecciona opción
                                            </option>
                                            <option value="Mujer">Mujer</option>
                                            <option value="Hombre">Hombre</option>
                                            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <i className="fa-solid fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="block text-base font-bold text-slate-800 ml-1">¿Situación actual? *</label>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {[
                                            'He pasado por un cáncer',
                                            'Quiero prevenir y mejorar mis hábitos',
                                            'Estoy en tratamiento actualmente',
                                            'Acompaño a alguien con cáncer/enfermedad',
                                            'Simplemente quiero cuidarme mejor',
                                        ].map((opt) => (
                                            <label
                                                key={opt}
                                                className={`flex items-center p-4 cursor-pointer rounded-2xl border-2 transition-all ${formData.situation === opt
                                                    ? 'border-slate-900 bg-slate-50'
                                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="situation"
                                                    value={opt}
                                                    checked={formData.situation === opt}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                    required
                                                />
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.situation === opt ? 'border-slate-900' : 'border-slate-200'
                                                        }`}
                                                >
                                                    {formData.situation === opt && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-base font-bold text-slate-800 ml-1">Interés en la Escuela *</label>
                                    <div className="grid grid-cols-1 gap-2.5">
                                        {[
                                            { v: 'Muy interesado/a', l: 'Muy interesado/a (¡avisadme el primero/a!)' },
                                            { v: 'Interesado/a con dudas', l: 'Me interesa, pero tengo preguntas' },
                                            { v: 'Solo informado/a', l: 'Solo quiero recibir actualizaciones' },
                                        ].map((opt) => (
                                            <label
                                                key={opt.v}
                                                className={`flex items-center p-4 cursor-pointer rounded-2xl border-2 transition-all ${formData.interest === opt.v
                                                    ? 'border-slate-900 bg-slate-50'
                                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="interest"
                                                    value={opt.v}
                                                    checked={formData.interest === opt.v}
                                                    onChange={handleInputChange}
                                                    className="sr-only"
                                                    required
                                                />
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${formData.interest === opt.v ? 'border-slate-900' : 'border-slate-200'
                                                        }`}
                                                >
                                                    {formData.interest === opt.v && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">{opt.l}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        required
                                        checked={formData.consent}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 accent-slate-900"
                                    />
                                    <div className="text-xs text-slate-600 leading-tight">
                                        <span className="font-bold text-slate-800 block mb-1">Privacidad y comunicaciones *</span>
                                        Acepto que mis datos sean tratados por la Dra. Odile Fernández para enviarme novedades sobre la
                                        Escuela Cuid-Arte y consejos de salud. Podrás darte de baja cuando quieras.
                                    </div>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold text-xl hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10 active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <i className="fa-solid fa-circle-notch animate-spin"></i>
                                        Guardando...
                                    </>
                                ) : (
                                    'Unirme con prioridad'
                                )}
                            </button>

                            <div className="flex justify-center items-center gap-4 opacity-40">
                                <i className="fa-solid fa-shield-halved text-sm"></i>
                                <span className="text-[10px] uppercase font-bold tracking-widest">RGPD Compliant</span>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </main>
            <footer className="py-12 text-center text-slate-400 text-[10px] font-medium border-t border-slate-200 bg-white">
                © {new Date().getFullYear()} Escuela Cuid-Arte · Dra. Odile Fernández
            </footer>
        </div>
    );
};

export default RegistrationForm;
