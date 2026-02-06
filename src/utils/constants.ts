
export const LOGO_URL = 'https://i.postimg.cc/Kj6R2R75/LOGODRA.png';
export const TOOL_URL = 'https://kitsupervivenvivneciacuid-arte.netlify.app/';

export const COUNTRIES = [
  { name: 'España', code: 'ES', dial: '+34', timezone: 'Europe/Madrid' },
  { name: 'México', code: 'MX', dial: '+52', timezone: 'America/Mexico_City' },
  { name: 'Colombia', code: 'CO', dial: '+57', timezone: 'America/Bogota' },
  { name: 'Argentina', code: 'AR', dial: '+54', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Chile', code: 'CL', dial: '+56', timezone: 'America/Santiago' },
  { name: 'Perú', code: 'PE', dial: '+51', timezone: 'America/Lima' },
  { name: 'Ecuador', code: 'EC', dial: '+593', timezone: 'America/Guayaquil' },
  { name: 'Venezuela', code: 'VE', dial: '+58', timezone: 'America/Caracas' },
  { name: 'Bolivia', code: 'BO', dial: '+591', timezone: 'America/La_Paz' },
  { name: 'Uruguay', code: 'UY', dial: '+598', timezone: 'America/Montevideo' },
  { name: 'Paraguay', code: 'PY', dial: '+595', timezone: 'America/Asuncion' },
  { name: 'Costa Rica', code: 'CR', dial: '+506', timezone: 'America/Costa_Rica' },
  { name: 'Panamá', code: 'PA', dial: '+507', timezone: 'America/Panama' },
  { name: 'República Dominicana', code: 'DO', dial: '+1', timezone: 'America/Santo_Domingo' },
  { name: 'Estados Unidos', code: 'US', dial: '+1', timezone: 'America/New_York' },
  { name: 'Otros', code: 'OT', dial: '+', timezone: '' },
].sort((a, b) => (a.name === 'Otros' ? 1 : b.name === 'Otros' ? -1 : a.name.localeCompare(b.name)));
