import { describe, it, expect } from "vitest";
import { formatarMoeda } from "../moeda";

const limpar = (texto) => texto.replace(/\s/g, " ");

describe("formatarMoeda", () => {
  it("formata valores em reais", () => {
    expect(limpar(formatarMoeda(1234.5))).toBe("R$ 1.234,50");
  });

  it("retorna R$ 0,00 para valor inválido", () => {
    expect(limpar(formatarMoeda("abc"))).toBe("R$ 0,00");
  });
});
