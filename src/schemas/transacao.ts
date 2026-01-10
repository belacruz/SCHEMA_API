import { s, setErrorMap } from "@schemini/core";
import { ptBR } from "@schemini/locale";
import { FORMA_PAGAMENTO, STATUS_TRANSACAO } from "./constants.ts";
import moedaParaNumero from "../utils/moedaParaNumero.ts";
import stringToDate from "../utils/stringToDate.ts";

setErrorMap(ptBR);

export const transacaoAPISchema = s.object({
  Status: s.enum(STATUS_TRANSACAO),
  ID: s.number(),
  Data: s.string(),
  Nome: s.string(),
  "Forma de Pagamento": s.enum(FORMA_PAGAMENTO),
  Email: s.string().email(),
  "Valor (R$)": s.string(),
  "Cliente Novo": s.number(),
});

export type TransacaoAPI = s.infer<typeof transacaoAPISchema>;

export const transacaoNormSchema = transacaoAPISchema.transform((raw) => ({
  status: raw.Status,
  id: raw.ID,
  data: stringToDate(raw.Data),
  nome: raw.Nome,
  email: raw.Email,
  formaDePagamento: raw["Forma de Pagamento"],
  clienteNovo: Boolean(raw["Cliente Novo"]),
  moeda: raw["Valor (R$)"],
  valor: moedaParaNumero(raw["Valor (R$)"]),
}));

export type TransacaoNorm = s.infer<typeof transacaoNormSchema>;

export const transacoesNormSchema = s.array(transacaoNormSchema);
