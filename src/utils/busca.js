// RF04 — Filtra produtos pelo nome, sem diferenciar maiúsculas de minúsculas.
export function filtrarProdutos(produtos, termo) {
  const termoNormalizado = (termo ?? "").trim().toLowerCase();
  if (!termoNormalizado) return produtos;
  return produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoNormalizado)
  );
}
