
export interface FormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  otherCountry?: string;
  countryCode: string;
  age: string;
  sex: string;
  situation: string;
  interest: string;
  consent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  downloaded_kit?: boolean;
}

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
