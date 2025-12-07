const STATUS_TRANSACAO = [
  'Paga',
  'Recusada pela operadora de cartão',
  'Aguardando pagamento',
  'Estornada',
] as const;
const FORMA_PAGAMENTO = ['Boleto', 'Cartão de Crédito'] as const;

export const SCHEMA_API = {
  Status: STATUS_TRANSACAO,
  ID: Number,
  Data: String,
  Nome: String,
  'Forma de Pagamento': FORMA_PAGAMENTO,
  Email: String,
  'Valor (R$)': String,
  'Cliente Novo': Number,
} as const;

type schemeToType<T> = {
  [K in keyof T]: T[K] extends readonly (infer U)[]
    ? U
    : T[K] extends NumberConstructor
      ? number
      : T[K] extends StringConstructor
        ? string
        : T[K] extends BooleanConstructor
          ? boolean
          : never;
};

export type transacaoAPI = schemeToType<typeof SCHEMA_API>;
