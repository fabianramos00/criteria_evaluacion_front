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

export const formatDate = date => new Date(date).toDateString();
