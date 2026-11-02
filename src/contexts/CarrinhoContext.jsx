import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  adicionarProduto,
  alterarQuantidadeItem,
  removerProduto,
  calcularTotal,
  calcularQuantidadeTotal,
} from "../utils/carrinho";

export const CarrinhoContext = createContext(null);

// RF06 — Provider do carrinho, compartilhado entre todas as páginas.
export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  // useCallback: funções estáveis, pois são repassadas a vários componentes
  // e entram no value memoizado do contexto.
  const adicionarItem = useCallback((produto) => {
    setItens((atuais) => adicionarProduto(atuais, produto));
  }, []);

  const alterarQuantidade = useCallback((id, quantidade) => {
    setItens((atuais) => alterarQuantidadeItem(atuais, id, quantidade));
  }, []);

  const removerItem = useCallback((id) => {
    setItens((atuais) => removerProduto(atuais, id));
  }, []);

  const limparCarrinho = useCallback(() => setItens([]), []);

  const quantidadeTotal = useMemo(() => calcularQuantidadeTotal(itens), [itens]);
  const valorTotal = useMemo(() => calcularTotal(itens), [itens]);

  const valor = useMemo(
    () => ({
      itens,
      adicionarItem,
      alterarQuantidade,
      removerItem,
      limparCarrinho,
      quantidadeTotal,
      valorTotal,
    }),
    [itens, adicionarItem, alterarQuantidade, removerItem, limparCarrinho, quantidadeTotal, valorTotal]
  );

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}

CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
