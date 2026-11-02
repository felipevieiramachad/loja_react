import { describe, it, expect } from "vitest";
import {
  adicionarProduto,
  alterarQuantidadeItem,
  calcularTotal,
  calcularQuantidadeTotal,
} from "../carrinho";

const produto = { id: "1", nome: "Tênis", preco: 100, estoque: 2 };

describe("adicionarProduto", () => {
  it("adiciona produto novo com quantidade 1", () => {
    expect(adicionarProduto([], produto)).toEqual([{ ...produto, quantidade: 1 }]);
  });

  it("soma 1 quando o produto já está no carrinho", () => {
    const itens = [{ ...produto, quantidade: 1 }];
    expect(adicionarProduto(itens, produto)[0].quantidade).toBe(2);
  });

  it("não ultrapassa o estoque", () => {
    const itens = [{ ...produto, quantidade: 2 }];
    expect(adicionarProduto(itens, produto)[0].quantidade).toBe(2);
  });

  it("não adiciona produto sem estoque", () => {
    expect(adicionarProduto([], { ...produto, estoque: 0 })).toEqual([]);
  });
});

describe("alterarQuantidadeItem", () => {
  const itens = [{ ...produto, quantidade: 1 }];

  it("não permite quantidade menor que 1", () => {
    expect(alterarQuantidadeItem(itens, "1", 0)[0].quantidade).toBe(1);
  });

  it("não permite passar do estoque", () => {
    expect(alterarQuantidadeItem(itens, "1", 9)[0].quantidade).toBe(2);
  });
});

describe("totais do carrinho", () => {
  const itens = [
    { ...produto, quantidade: 2 },
    { id: "2", nome: "Mouse", preco: 50, estoque: 5, quantidade: 1 },
  ];

  it("calcula o valor total", () => {
    expect(calcularTotal(itens)).toBe(250);
  });

  it("calcula a quantidade total", () => {
    expect(calcularQuantidadeTotal(itens)).toBe(3);
  });

  it("retorna 0 para carrinho vazio", () => {
    expect(calcularTotal([])).toBe(0);
  });
});
