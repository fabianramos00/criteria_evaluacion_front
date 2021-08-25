import { SERVER_ENDPOINT } from './env';

const headers = {
  'Content-Type': 'application/json',
  Accept: '*/*',
};

export const postData = async (path = '/', body) => {
  const response = await fetch(`${SERVER_ENDPOINT}${path}`, {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
  });
  return {
    'status': response.status,
    'data': await response.json()
  };
};
