import { html, type TemplateResult } from "lit-html";
import type { TransacaoNorm } from "../../schemas/index.ts";

const tabelaRow = (item: TransacaoNorm): TemplateResult => html`
  <tr>
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>R$ ${item.moeda}</td>
    <td>${item.formaDePagamento}</td>
    <td>${item.status}</td>
    <td>${item.data}</td>
  </tr>
`;

export const tabelaBody = (transacoes: TransacaoNorm[]): TemplateResult => html`
  ${transacoes.map(tabelaRow)}
`;
