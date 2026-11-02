import { describe, it, expect } from "vitest";
import { todosDigitosIguais, normalizarNumeroCartao } from "../pagamento";

describe("todosDigitosIguais", () => {
  it("detecta cartão com todos os dígitos iguais", () => {
    expect(todosDigitosIguais("1111 1111 1111 1111")).toBe(true);
  });

  it("aceita cartão com dígitos diferentes", () => {
    expect(todosDigitosIguais("1234-5678-9012-3456")).toBe(false);
  });

  it("retorna false para texto vazio", () => {
    expect(todosDigitosIguais("")).toBe(false);
  });
});

describe("normalizarNumeroCartao", () => {
  it("remove espaços e hífens", () => {
    expect(normalizarNumeroCartao("1234 5678-9012 3456")).toBe("1234567890123456");
  });
});
