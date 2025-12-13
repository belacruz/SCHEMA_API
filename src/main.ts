import Estatisticas from './Estatisticas.ts';
import { fetchData } from './fetchData.ts';
import {
  normalizarTransacao,
  type transacaoAPINorm,
} from './normTransaction.ts';
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

function preencherTabela(transacoes: transacaoAPINorm[]): void {
  const tabela = document.querySelector('#tabelaTransacoes tbody');
  if (!tabela) return;
  transacoes.forEach(
    (item) =>
      (tabela.innerHTML += `
  <tr>
  <td>${item.nome}</td>
  <td>${item.email}</td>
  <td>R$ ${item.moeda}</td>
  <td>${item.formaDePagamento}</td>
  <td>${item.status}</td>
  <td>${item.data}</td>
  </tr>
  `),
  );
}

function preencherEstatisticas(transacoes: transacaoAPINorm[]): void {
  const data = new Estatisticas(transacoes);

  const totalElement = document.querySelector<HTMLElement>('#totalSpan');
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

handleData('https://api.origamid.dev/json/transacoes.json');
