import { SCHEMA_API, type transacaoAPI } from './schemaAPI.ts';

function isSubSchema(rule: unknown): rule is Record<string, unknown> {
  return (
    typeof rule === 'object' &&
    rule !== null &&
    !Array.isArray(rule) &&
    rule !== Number &&
    rule !== String &&
    rule !== Boolean
  );
}

export function checkSchemaCompatibility(
  data: Record<string, unknown>,
  schema: Record<string, unknown> = SCHEMA_API,
): boolean {
  const keysSCHEMA = Object.keys(schema).sort();
  const keysData = Object.keys(data).sort();

  if (keysData.length !== keysSCHEMA.length) return false;

  const keysMatch = keysSCHEMA.every((key, index) => {
    return key === keysData[index];
  });

  if (!keysMatch) return false;

  for (const key of keysSCHEMA) {
    const rule = schema[key];
    const value = data[key];
    if (Array.isArray(rule)) {
      if (typeof value !== 'string' || !rule.includes(value)) return false;
      continue;
    }

    if (rule === Number) {
      if (typeof value !== 'number') return false;
    } else if (rule === String) {
      if (typeof value !== 'string') return false;
    } else if (isSubSchema(rule)) {
      if (!isSubSchema(value)) return false;
      if (!checkSchemaCompatibility(value, rule)) return false;
    } else {
      return false;
    }
  }
  return true;
}

export function isTransacaoAPI(data: unknown): data is transacaoAPI {
  if (data === null || typeof data !== 'object' || Array.isArray(data))
    return false;
  return checkSchemaCompatibility(data as Record<string, unknown>);
}
