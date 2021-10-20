import { postData, getData } from '../config/client.http';

export async function evaluate(input) {
  return await postData('/', input);
}

export function listEvaluations(page = 1, quantity = 20) {
  return getData(`/list?page=${page}&quantity=${quantity}`);
}
