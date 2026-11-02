// Regras de negócio do carrinho, em funções puras (sem React).

// RF07 — Adiciona 1 unidade; se já existir soma 1, sem ultrapassar o estoque.
export function adicionarProduto(itens, produto) {
  const existente = itens.find((item) => item.id === produto.id);

  if (!existente) {
    if (produto.estoque < 1) return itens;
    return [...itens, { ...produto, quantidade: 1 }];
  }

  return itens.map((item) =>
    item.id === produto.id
      ? { ...item, quantidade: Math.min(item.quantidade + 1, item.estoque) }
      : item
  );
}

// RF08 — Altera a quantidade respeitando o mínimo 1 e o estoque.
export function alterarQuantidadeItem(itens, id, quantidade) {
  return itens.map((item) =>
    item.id === id
      ? { ...item, quantidade: Math.max(1, Math.min(quantidade, item.estoque)) }
      : item
  );
}

export function removerProduto(itens, id) {
  return itens.filter((item) => item.id !== id);
}

export function calcularTotal(itens) {
  return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export function calcularQuantidadeTotal(itens) {
  return itens.reduce((total, item) => total + item.quantidade, 0);
}
