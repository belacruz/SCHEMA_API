# SCHEMA_API

Projeto em **TypeScript** focado em validação, normalização e processamento de dados vindos de uma API, seguindo uma abordagem **data-driven** e defensiva.

A ideia principal não é apenas consumir uma API, mas **garantir segurança, previsibilidade e controle sobre os dados**, mesmo que a API externa quebre ou mude.

---

## Objetivo do Projeto

Demonstrar:

* Consumo seguro de API
* Validação manual de dados (sem libraries externas)
* Normalização de dados antes do uso
* Processamento estatístico desacoplado
* Uso consciente de TypeScript

Este projeto foi feito **intencionalmente sem bibliotecas de schema** (como Zod/Yup) para deixar explícito o raciocínio e a lógica por trás da validação.

---

## Abordagem (Data-Driven Design)

O fluxo do projeto segue este pipeline:

```
API (dados crus)
  → Validação (schema manual)
  → Normalização
  → Processamento (estatísticas)
  → Renderização no DOM
```

* **Dados externos nunca são confiados diretamente**
* Qualquer quebra de contrato da API é detectada cedo
* O restante do código trabalha apenas com dados confiáveis

---

## Estrutura do Projeto

Os arquivos TypeScript estão organizados diretamente dentro da pasta `src/`,
separados por responsabilidade (fetch, schema, normalização, estatísticas e utilitários).

A simplicidade da estrutura é intencional, já que o escopo do projeto é reduzido.

---

## Principais Conceitos Usados

* **Type Guards** para validação de dados
* **Schema como fonte de verdade**
* **Normalização explícita** antes do uso
* **Classes desacopladas** (estatísticas não conhecem API nem DOM)
* **TypeScript como ferramenta de segurança**, não apenas autocomplete

---

## Estatísticas Calculadas

* Valor total das transações
* Quantidade por forma de pagamento
* Quantidade por status
* Quantidade por dia da semana
* Melhor dia de compra

---

## Por que não usei bibliotecas de schema?

* Para demonstrar entendimento do problema
* Para manter controle total sobre validações
* Para não depender de geração automática de tipos
* Para evitar confiar cegamente na API externa

Em um projeto maior ou comercial, bibliotecas seriam uma opção válida. Aqui, o foco é **clareza e domínio técnico**.

---

## Como executar

1. Instale as dependências

```bash
npm install
```

2. Rode o projeto

```bash
npm run dev
```

---

##  Observações

* Projeto educacional / portfólio
* Código prioriza legibilidade e segurança
* Não possui testes automatizados (escopo reduzido)

---

##  Autor

Projeto desenvolvido por **belacruz**.
