import sjon from 'secure-json-parse';

export function parseJson(json) {
  if (!json) return undefined;
  try {
    return sjon(json);
  } catch {
    return undefined;
  }
}
