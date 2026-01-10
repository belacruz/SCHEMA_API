import countBy from "../utils/countBy.ts";
import type { TransacaoNorm } from "../schemas/index.ts";

type TransacaoValor = TransacaoNorm & { valor: number };

function filtraValor(transacao: TransacaoNorm): transacao is TransacaoValor {
  return transacao.valor !== null;
}

export default class Estatisticas {
  private transacoes: TransacaoNorm[];
  total: number;
  pagamento;
  status;
  semana;
  melhorDia;

  constructor(transacoes: TransacaoNorm[]) {
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
      .reduce((acc, curr) => acc + curr.valor, 0);
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
      "Domingo": 0,
      "Segunda-Feira": 0,
      "Terça-Feira": 0,
      "Quarta-Feira": 0,
      "Quinta-Feira": 0,
      "Sexta-Feira": 0,
      "Sábado": 0,
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
    return Object.entries(this.semana).sort((a, b) => b[1] - a[1])[0];
  }
}
