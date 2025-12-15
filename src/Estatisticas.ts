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
  semana;
  melhorDia;

  constructor(transacoes: transacaoAPINorm[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
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
    return countBy(this.transacoes.map(({ status }) => status));
  }
  private setSemana() {
    const semana: Record<string, number> = {
      ['Domingo']: 0,
      ['Segunda-Feira']: 0,
      ['Terça-Feira']: 0,
      ['Quarta-Feira']: 0,
      ['Quinta-Feira']: 0,
      ['Sexta-Feira']: 0,
      ['Sabado']: 0,
    };
    const keys = Object.keys(semana);

    for (const transacao of this.transacoes) {
      const payDay = transacao.data.getDay();
      const dia = keys[payDay];
      semana[dia] += 1;
    }
    return semana;
  }
  private setMelhorDia(): [string, number] {
    return Object.entries(this.semana).sort((prox, atual) => {
      return atual[1] - prox[1];
    })[0];
  }
}
