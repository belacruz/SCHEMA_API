import { html, type TemplateResult } from "lit-html";

export const listaItems = (
  lista: Record<string, number>,
): TemplateResult => html`
  ${Object.entries(lista).map(([key, value]) => html`<p>${key}: ${value}</p>`)}
`;

export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
