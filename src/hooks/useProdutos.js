import { useEffect, useState } from "react";
import { buscarProduto, listarProdutos } from "../services/api";

// RF02 — Carrega a lista com estados de carregamento e erro.
export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;

    async function carregar() {
      try {
        const dados = await listarProdutos();
        if (!cancelado) setProdutos(dados);
      } catch {
        if (!cancelado) setErro("Não foi possível carregar os produtos. Verifique se a API está no ar e tente novamente.");
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, []);

  return { produtos, carregando, erro };
}

// RF05 — Carrega um produto pelo id (produto === null quando não existe).
export function useProduto(id) {
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    async function carregar() {
      try {
        const dado = await buscarProduto(id);
        if (!cancelado) setProduto(dado);
      } catch {
        if (!cancelado) setErro("Não foi possível carregar o produto. Tente novamente.");
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregar();
    return () => {
      cancelado = true;
    };
  }, [id]);

  return { produto, carregando, erro };
}
