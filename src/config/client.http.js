import { SERVER_ENDPOINT } from './env';

const headers = {
  'Content-Type': 'application/json',
  Accept: '*/*',
};

export const postData = async (path = '/', body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}${path}`, {
        headers,
        method: 'POST',
        body: JSON.stringify(body),
      });
      const { status } = response;
      const data = await response.json();

      if (status === 200) {
        resolve(data);
      }
      if (status >= 400 && status <= 599) {
        reject(data);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export const getData = async (path = '') =>
  new Promise((resolve, reject) => {
    fetch(`${SERVER_ENDPOINT}${path}`).then(response => {
      const { status } = response;
      console.log("RESPONSE ", response)

      response.json().then(data => {
        if (status >= 400 && status <= 599) {
          reject(data.error);
        } else {
          resolve(data);
        }
      });
    });
  });
