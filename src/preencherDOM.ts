import Estatisticas from './Estatisticas.ts';
import type { transacaoAPINorm } from './normTransaction.ts';

export function preencherTabela(transacoes: transacaoAPINorm[]): void {
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

export function preencherLista(
  lista: Record<string, number>,
  containerID: string,
): void {
  const containerElement = document.getElementById(containerID);
  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
    });
  }
}

export function preencherEstatisticas(transacoes: transacaoAPINorm[]): void {
  const data = new Estatisticas(transacoes);
  preencherLista(data.status, 'status');

  const pagamentoElemento = document.getElementById('pagamento');
  if (pagamentoElemento) {
    Object.keys(data.pagamento).forEach((key) => {
      pagamentoElemento.innerHTML += `<p>${key}: ${data.pagamento[key]}</p>`;
    });
  }

  const totalElement = document.querySelector<HTMLElement>('#totalSpan');
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  const diaElement = document.querySelector<HTMLElement>('#dia');
  if (diaElement) {
    diaElement.innerText = data.melhorDia[0];
  }
}
