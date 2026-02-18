import { postData, getData } from '../config/client.http';

export async function evaluate(input) {
  return await postData('/', input);
}

export function listEvaluations(page = 1, quantity = 20, search = '') {
  let url = `/list?page=${page}&quantity=${quantity}`;
  if (search) {
    url += `&search=${search}`;
  }
  return getData(url);
}
