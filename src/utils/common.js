export const getError = (errors, field) => errors?.[field]?.message;

export const cleanJSON = (object = {}) => {
  let newObject = {};

  Object.keys(object).forEach(key => {
    const value = object[key];

    if (key === 'undefined') return;
    if (typeof value !== 'boolean' && !value) return;

    newObject = { ...newObject, [key]: object[key] };
  });

  return newObject;
};

export const isEmptyObject = (obj = {}) => Object.keys(obj).length === 0;

export const formatDate = (dateString, keepUTC = true) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: keepUTC ? 'UTC' : undefined,
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

export const getQualityInfo = (score, max) => {
  if (!max) return { label: 'N/D' };
  const pct = (score / max) * 100;
  if (pct >= 80) return { label: 'Alto', className: 'high-score' };
  if (pct >= 50) return { label: 'Medio', className: 'medium-score' };
  return { label: 'Bajo', className: 'low-score' };
}
