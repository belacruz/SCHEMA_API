export const STATUS_TRANSACAO = [
  'Paga',
  'Recusada pela operadora de cartão',
  'Aguardando pagamento',
  'Estornada',
] as const;
export const FORMA_PAGAMENTO = ['Boleto', 'Cartão de Crédito'] as const;

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

type MapearTipoSingular<V> = V extends NumberConstructor
  ? number
  : V extends StringConstructor
    ? string
    : V extends BooleanConstructor
      ? boolean
      : V extends DateConstructor 
        ? Date
        : V extends undefined
          ? undefined
          : V extends null
            ? null
            : never;

export type schemeToType<T> = {
  [K in keyof T]: T[K] extends readonly unknown[]
    ? { [I in keyof T[K]]: MapearTipoSingular<T[K][I]> }[number]
    : MapearTipoSingular<T[K]>;
};

export type transacaoAPI = schemeToType<typeof SCHEMA_API>;

type Transformar<T> = {
  [K in keyof T]: T[K] extends number ? `${T[K]}-id` : T[K];
};

type Ex = Transformar<{
  nome: string;
  idade: number;
}>;
