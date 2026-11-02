import { describe, it, expect } from "vitest";
import { filtrarProdutos } from "../busca";

const produtos = [
  { id: "1", nome: "Tênis Runner" },
  { id: "2", nome: "Mouse Sem Fio" },
];

describe("filtrarProdutos", () => {
  it("filtra pelo nome sem diferenciar maiúsculas de minúsculas", () => {
    expect(filtrarProdutos(produtos, "TÊNIS")).toEqual([produtos[0]]);
  });

  it("retorna todos quando o termo está vazio", () => {
    expect(filtrarProdutos(produtos, "  ")).toEqual(produtos);
  });

  it("retorna lista vazia quando nada corresponde", () => {
    expect(filtrarProdutos(produtos, "geladeira")).toEqual([]);
  });
});
