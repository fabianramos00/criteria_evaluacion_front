import { postData, getData } from '../config/client.http';

export function getItemEvaluation(item, token) {
  return getData(`/${item}/${token}`);
}

export function evalVisibility(token, data) {
  return postData(`/visibility/${token}`, data);
}

export async function evalPolitics(token, data) {
  return postData(`/policy/${token}`, data);
}

export async function evalLegalAspects(token, data) {
  return postData(`/legal_aspects/${token}`, data);
}

export async function evalMetadata(token, data) {
  return postData(`/metadata/${token}`, data);
}

export async function evalInteroperability() {
  return 'Interoperabilidad evaluada';
}
