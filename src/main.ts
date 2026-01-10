import { fetchTransacoes } from "./services/api.ts";
import { renderTabela, renderEstatisticas } from "./ui/render.ts";
import "./styles/main.css";

async function main() {
  try {
    const transacoes = await fetchTransacoes();
    renderTabela(transacoes);
    renderEstatisticas(transacoes);
  } catch (error) {
    console.error(error);
  }
}

main();
