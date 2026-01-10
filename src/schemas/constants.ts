export const STATUS_TRANSACAO = [
  "Paga",
  "Recusada pela operadora de cartão",
  "Aguardando pagamento",
  "Estornada",
] as const;

export const FORMA_PAGAMENTO = ["Boleto", "Cartão de Crédito"] as const;

export type StatusTransacao = (typeof STATUS_TRANSACAO)[number];
export type FormaPagamento = (typeof FORMA_PAGAMENTO)[number];
