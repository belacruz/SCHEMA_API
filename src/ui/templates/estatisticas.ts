import { html, type TemplateResult } from "lit-html";

export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Status display mapping with full Tailwind class names
const STATUS_DISPLAY: Record<
  string,
  { label: string; tickColorClass: string }
> = {
  Paga: { label: "Paga", tickColorClass: "bg-status-green" },
  "Recusada pela operadora de cartão": {
    label: "Recusada",
    tickColorClass: "bg-status-red",
  },
  "Aguardando pagamento": {
    label: "Aguardando",
    tickColorClass: "bg-status-orange",
  },
  Estornada: { label: "Estornada", tickColorClass: "bg-status-purple" },
};

// Payment method icons
const PAGAMENTO_ICONS: Record<string, string> = {
  Boleto: "description",
  "Cartão de Crédito": "credit_card",
};

// Generate tick bars for status visualization
const generateTickBar = (
  count: number,
  total: number,
  tickColorClass: string,
): TemplateResult => {
  const TOTAL_TICKS = 30;
  const filledTicks = Math.round((count / total) * TOTAL_TICKS);

  const ticks = [];
  for (let i = 0; i < TOTAL_TICKS; i++) {
    if (i < filledTicks) {
      ticks.push(html`<div class="tick ${tickColorClass}"></div>`);
    } else {
      ticks.push(
        html`<div class="tick bg-status-gray dark:bg-status-gray-dark"></div>`,
      );
    }
  }

  return html`<div class="tick-bar w-full overflow-hidden">${ticks}</div>`;
};

// Status card component
export const statusCard = (
  statusKey: string,
  count: number,
  total: number,
): TemplateResult => {
  const display = STATUS_DISPLAY[statusKey] || {
    label: statusKey,
    tickColorClass: "bg-status-gray",
  };

  return html`
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-soft"
    >
      <div class="flex justify-between items-center mb-3">
        <span class="font-medium text-slate-700 dark:text-slate-200"
          >${display.label}</span
        >
        <span class="text-xl font-bold text-slate-900 dark:text-white"
          >${count}</span
        >
      </div>
      ${generateTickBar(count, total, display.tickColorClass)}
    </div>
  `;
};

// Status cards container
export const statusCardsTemplate = (
  statusCounts: Record<string, number>,
): TemplateResult => {
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  const orderedStatuses = [
    "Paga",
    "Aguardando pagamento",
    "Recusada pela operadora de cartão",
    "Estornada",
  ];

  return html`
    ${orderedStatuses.map((status) =>
      statusCard(status, statusCounts[status] || 0, total),
    )}
  `;
};

// Payment method card component
export const pagamentoCard = (
  method: string,
  count: number,
): TemplateResult => {
  const icon = PAGAMENTO_ICONS[method] || "payments";

  return html`
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft flex items-center justify-between"
    >
      <div>
        <span
          class="text-sm font-medium text-slate-500 dark:text-slate-400 block mb-1"
          >${method}</span
        >
        <span class="text-3xl font-semibold text-slate-900 dark:text-white"
          >${count}</span
        >
      </div>
      <div
        class="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500"
      >
        <span class="material-icons-round">${icon}</span>
      </div>
    </div>
  `;
};

// Payment cards container
export const pagamentoCardsTemplate = (
  pagamentoCounts: Record<string, number>,
): TemplateResult => {
  return html`
    ${Object.entries(pagamentoCounts).map(([method, count]) =>
      pagamentoCard(method, count),
    )}
  `;
};

// Legacy export for backward compatibility
export const listaItems = (
  lista: Record<string, number>,
): TemplateResult => html`
  ${Object.entries(lista).map(([key, value]) => html`<p>${key}: ${value}</p>`)}
`;
