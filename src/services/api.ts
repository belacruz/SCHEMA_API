import { transacoesNormSchema, type TransacaoNorm } from "../schemas/index.ts";

const API_URL = "https://api.origamid.dev/json/transacoes.json";

export async function fetchTransacoes(): Promise<TransacaoNorm[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Erro de fetch: ${response.status}`);
  const json: unknown = await response.json();
  return transacoesNormSchema.parse(json);
}
