// Formata um número em reais (R$ 1.234,50).
export function formatarMoeda(valor) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return "R$ 0,00";
  return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
