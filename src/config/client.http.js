import { SERVER_ENDPOINT } from './env';

const BASE_URL = import.meta.env.DEV ? '/api' : SERVER_ENDPOINT;

const headers = {
  'Content-Type': 'application/json',
  Accept: '*/*',
};

export const postData = async (path = '/', body) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers,
      method: 'POST',
      body: JSON.stringify(body),
    });
    
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }
    
    return data;
  } catch (e) {
    throw e;
  }
};

export const getData = async (path = '') => {
  try {
    const response = await fetch(`${BASE_URL}${path}`, { headers });
    const data = await response.json();

    if (!response.ok) {
        throw data.error || data;
    }

    return data;
  } catch (e) {
    throw e;
  }
};
