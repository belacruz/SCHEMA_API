import { transacoesNormSchema, type TransacaoNorm } from "../schemas/index.ts";

const API_URL = "https://api.origamid.dev/json/transacoes.json";

export async function fetchTransacoes(): Promise<TransacaoNorm[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const json: unknown = await response.json();
    return transacoesNormSchema.parse(json);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("Erro HTTP:")) throw error;
      throw new Error(`Erro de rede: ${error.message}`);
    }
    throw new Error("Erro desconhecido ao buscar transações");
  }
}
