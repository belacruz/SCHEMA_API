import countBy from './countBy.ts';
import type { transacaoAPINorm } from './normTransaction.ts';

type TransacaoValor = transacaoAPINorm & { valor: number };

function filtraValor(transacao: transacaoAPINorm): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes: transacaoAPINorm[];
  total: number;
  pagamento;
  status;
  constructor(transacoes: transacaoAPINorm[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
  }
  private setTotal(): number {
    return this.transacoes
      .filter((item) => filtraValor(item))
      .reduce((acumulador, atual) => {
        return acumulador + atual.valor;
      }, 0);
  }
  private setPagamento() {
    return countBy(
      this.transacoes.map(({ formaDePagamento }) => formaDePagamento),
    );
  }
  private setStatus() {
    return countBy(
      this.transacoes.map(({ status }) => status),
    );
  }
}