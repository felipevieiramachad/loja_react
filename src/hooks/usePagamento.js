import { useCallback, useState } from "react";
import { todosDigitosIguais } from "../utils/pagamento";

const TEMPO_PROCESSAMENTO_MS = 1600;

// RF11 — Simula o processamento assíncrono e devolve "sucesso" ou "falha".
export function usePagamento() {
  const [processando, setProcessando] = useState(false);

  const processarCompra = useCallback((numeroCartao) => {
    setProcessando(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const resultado = todosDigitosIguais(numeroCartao) ? "falha" : "sucesso";
        setProcessando(false);
        resolve(resultado);
      }, TEMPO_PROCESSAMENTO_MS);
    });
  }, []);

  return { processando, processarCompra };
}
