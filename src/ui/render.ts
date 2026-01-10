import { render } from "lit-html";
import Estatisticas from "../domain/Estatisticas.ts";
import type { TransacaoNorm } from "../schemas/index.ts";
import {
  tabelaBody,
  paginationInfo,
  formatCurrency,
  statusCardsTemplate,
  pagamentoCardsTemplate,
} from "./templates/index.ts";

export function renderTabela(transacoes: TransacaoNorm[]): void {
  // Render table body
  const container = document.querySelector("#tabelaBody") as HTMLElement | null;
  if (container) {
    render(tabelaBody(transacoes), container);
  }

  // Render pagination info
  const paginationElement =
    document.querySelector<HTMLElement>("#paginationInfo");
  if (paginationElement) {
    render(
      paginationInfo(transacoes.length, transacoes.length),
      paginationElement,
    );
  }
}

export function renderEstatisticas(transacoes: TransacaoNorm[]): void {
  const stats = new Estatisticas(transacoes);

  // Render total value
  const totalElement = document.querySelector<HTMLElement>("#totalValue");
  if (totalElement) {
    totalElement.textContent = formatCurrency(stats.total);
  }

  // Render status cards
  const statusContainer = document.getElementById("statusCards");
  if (statusContainer) {
    render(statusCardsTemplate(stats.status), statusContainer);
  }

  // Render payment method cards
  const pagamentoContainer = document.getElementById("pagamentoCards");
  if (pagamentoContainer) {
    render(pagamentoCardsTemplate(stats.pagamento), pagamentoContainer);
  }
}
