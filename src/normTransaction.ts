import moedaParaNumero from './moedaParaNumero.ts';
import {
  SCHEMA_API,
  type schemeToType,
  type transacaoAPI,
} from './schemaAPI.ts';
import stringToDate from './stringToDate.ts';

export const VALOR_TRANSACAO = [Number, null] as const;

export function mapearSchemaParaNormalizado(schemaOriginal: typeof SCHEMA_API) {
  return {
    status: schemaOriginal.Status,
    id: schemaOriginal.ID,
    data: Date,
    nome: schemaOriginal.Nome,
    email: schemaOriginal.Email,
    formaDePagamento: schemaOriginal['Forma de Pagamento'],
    clienteNovo: Boolean,
    moeda: schemaOriginal['Valor (R$)'],
    valor: VALOR_TRANSACAO,
  } as const;
}

export const SCHEMA_API_NORM = mapearSchemaParaNormalizado(SCHEMA_API);

export type transacaoAPINorm = schemeToType<typeof SCHEMA_API_NORM>;

export function normalizarTransacao(item: transacaoAPI): transacaoAPINorm {
  return {
    status: item.Status,
    id: item.ID,
    data: stringToDate(item.Data),
    nome: item.Nome,
    email: item.Email,
    formaDePagamento: item['Forma de Pagamento'],
    clienteNovo: Boolean(item['Cliente Novo']),
    moeda: item['Valor (R$)'],
    valor: moedaParaNumero(item['Valor (R$)']),
  };
}
