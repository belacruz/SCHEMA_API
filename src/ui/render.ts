import { render } from "lit-html";
import Estatisticas from "../domain/Estatisticas.ts";
import type { TransacaoNorm } from "../schemas/index.ts";
import { tabelaBody, listaItems, formatCurrency } from "./templates/index.ts";

export function renderTabela(transacoes: TransacaoNorm[]): void {
  const container = document.querySelector(
    "#tabelaTransacoes tbody",
  ) as HTMLElement | null;
  if (!container) return;
  render(tabelaBody(transacoes), container);
}

export function renderEstatisticas(transacoes: TransacaoNorm[]): void {
  const stats = new Estatisticas(transacoes);

  const statusContainer = document.getElementById("status");
  if (statusContainer) render(listaItems(stats.status), statusContainer);

  const pagamentoContainer = document.getElementById("pagamento");
  if (pagamentoContainer)
    render(listaItems(stats.pagamento), pagamentoContainer);

  const totalElement = document.querySelector<HTMLElement>("#totalSpan");
  if (totalElement) totalElement.textContent = formatCurrency(stats.total);

  const diaElement = document.querySelector<HTMLElement>("#dia");
  if (diaElement) diaElement.textContent = stats.melhorDia[0];
}
