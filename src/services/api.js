import db from "../../db.json";

// RF18 — Com VITE_USAR_JSON_SERVER=true usa o json-server local;
// caso contrário lê o db.json direto no front-end (ideal para deploy).
const USAR_JSON_SERVER = import.meta.env.VITE_USAR_JSON_SERVER === "true";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function listarProdutos() {
  if (!USAR_JSON_SERVER) return db.produtos;

  const resposta = await fetch(`${API_URL}/produtos`);
  if (!resposta.ok) throw new Error(`Falha ao listar produtos (${resposta.status})`);
  return resposta.json();
}

// Retorna o produto, ou null quando não existe (404).
export async function buscarProduto(id) {
  if (!USAR_JSON_SERVER) {
    return db.produtos.find((produto) => String(produto.id) === String(id)) ?? null;
  }

  const resposta = await fetch(`${API_URL}/produtos/${id}`);
  if (resposta.status === 404) return null;
  if (!resposta.ok) throw new Error(`Falha ao buscar produto (${resposta.status})`);
  return resposta.json();
}
