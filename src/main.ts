import { fetchData } from './fetchData.ts';
import { isTransacaoAPI } from './typeGuards.ts';

async function handleData(url: string) {
  try {
    const data = await fetchData(url);
    if (!Array.isArray(data))
      throw new Error(`Erro de API: Formato de resposta inesperado`);
    data.forEach((item) => {
      if (isTransacaoAPI(item)) {
        console.log(item);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

handleData('https://api.origamid.dev/json/transacoes.json');
