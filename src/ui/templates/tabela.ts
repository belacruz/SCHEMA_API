import { html, type TemplateResult } from "lit-html";
import type { TransacaoNorm } from "../../schemas/index.ts";

// Status display mapping with colors
const STATUS_CONFIG: Record<
  string,
  { label: string; textColor: string; barColor: string; barWidth: string }
> = {
  Paga: {
    label: "Paga",
    textColor: "text-emerald-600 dark:text-emerald-400",
    barColor: "bg-emerald-400",
    barWidth: "w-full",
  },
  "Recusada pela operadora de cartão": {
    label: "Recusada",
    textColor: "text-rose-600 dark:text-rose-400",
    barColor: "bg-rose-400",
    barWidth: "w-1/4",
  },
  "Aguardando pagamento": {
    label: "Aguardando",
    textColor: "text-amber-600 dark:text-amber-400",
    barColor: "bg-amber-400",
    barWidth: "w-1/2",
  },
  Estornada: {
    label: "Estornada",
    textColor: "text-violet-600 dark:text-violet-400",
    barColor: "bg-violet-400 opacity-50",
    barWidth: "w-full",
  },
};

// Payment method icons
const PAGAMENTO_ICONS: Record<string, string> = {
  Boleto: "description",
  "Cartão de Crédito": "credit_card",
  Pix: "pix",
};

// Format date for display
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const tabelaRow = (item: TransacaoNorm, index: number): TemplateResult => {
  const statusConfig = STATUS_CONFIG[item.status] || {
    label: item.status,
    textColor: "text-slate-600 dark:text-slate-400",
    barColor: "bg-slate-400",
    barWidth: "w-1/2",
  };

  const icon = PAGAMENTO_ICONS[item.formaDePagamento] || "payments";
  const isEven = index % 2 === 1;
  const rowBg = isEven ? "bg-slate-50/50 dark:bg-white/[0.02]" : "";

  return html`
    <tr
      class="${rowBg} group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors border-b border-slate-100 dark:border-slate-800/50"
    >
      <td class="py-4 px-6 font-medium text-slate-900 dark:text-white">
        ${item.nome}
      </td>
      <td class="py-4 px-6 text-slate-500 dark:text-slate-400">
        ${item.email}
      </td>
      <td class="py-4 px-6 font-mono text-slate-700 dark:text-slate-300">
        R$ ${item.moeda}
      </td>
      <td class="py-4 px-6 text-slate-600 dark:text-slate-300">
        <div class="flex items-center gap-2">
          <span class="material-icons-round text-base text-slate-400"
            >${icon}</span
          >
          ${item.formaDePagamento === "Cartão de Crédito"
            ? "Cartão"
            : item.formaDePagamento}
        </div>
      </td>
      <td class="py-4 px-6">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-semibold ${statusConfig.textColor}"
            >${statusConfig.label}</span
          >
          <div class="flex gap-0.5 h-1.5 w-24">
            <div
              class="${statusConfig.barWidth} ${statusConfig.barColor} rounded-sm"
            ></div>
            ${statusConfig.barWidth !== "w-full"
              ? html`<div
                  class="flex-grow bg-slate-200 dark:bg-slate-700 rounded-sm"
                ></div>`
              : ""}
          </div>
        </div>
      </td>
      <td
        class="py-4 px-6 text-right text-slate-500 dark:text-slate-400 font-mono"
      >
        ${formatDate(item.data)}
      </td>
    </tr>
  `;
};

export const tabelaBody = (transacoes: TransacaoNorm[]): TemplateResult => html`
  ${transacoes.map((item, index) => tabelaRow(item, index))}
`;

// Pagination info template
export const paginationInfo = (
  showing: number,
  total: number,
): TemplateResult => {
  return html`Mostrando 1-${showing} de ${total}`;
};
