import { fetchData } from './fetchData.ts';
import {
  normalizarTransacao,
  type transacaoAPINorm,
} from './normTransaction.ts';
import { preencherEstatisticas, preencherTabela } from './preencherDOM.ts';
import { type transacaoAPI } from './schemaAPI.ts';
import { isTransacaoAPI } from './typeGuards.ts';

async function handleData(url: string) {
  try {
    const data = await fetchData<transacaoAPI>(url);
    if (!Array.isArray(data))
      throw new Error(`Erro de API: Formato de resposta inesperado`);
    if (!data.every(isTransacaoAPI))
      throw new Error(`Erro de API: Alguns itens são inválidos`);
    const transacoes: transacaoAPINorm[] = data.map((item) => {
      return normalizarTransacao(item);
    });
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
  } catch (error) {
    console.error(error);
  }
}

handleData('https://api.origamid.dev/json/transacoes.json');


