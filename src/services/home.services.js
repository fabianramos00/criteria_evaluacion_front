import { postData } from '../config/client.http';

export async function evaluate(input) {
  return await postData('/', input);
}
