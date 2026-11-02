// RF10/RF11 — Espaços e hífens do número do cartão são desconsiderados.
export function normalizarNumeroCartao(numero = "") {
  return numero.replace(/[\s-]/g, "");
}

// RF11 — A compra falha somente se todos os dígitos do cartão forem iguais.
export function todosDigitosIguais(numero) {
  const digitos = normalizarNumeroCartao(numero);
  if (digitos.length === 0) return false;
  return digitos.split("").every((digito) => digito === digitos[0]);
}
