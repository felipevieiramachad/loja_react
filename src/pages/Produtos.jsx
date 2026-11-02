import { useEffect, useMemo, useRef, useState } from "react";
import { useProdutos } from "../hooks/useProdutos";
import { useCarrinho } from "../hooks/useCarrinho";
import { filtrarProdutos } from "../utils/busca";
import CampoBusca from "../components/atoms/CampoBusca";
import Botao from "../components/atoms/Botao";
import ListaProdutos from "../components/organisms/ListaProdutos";
import estilos from "./paginas.module.css";

function Produtos() {
  const { produtos, carregando, erro } = useProdutos();
  const { adicionarItem } = useCarrinho();
  const [busca, setBusca] = useState("");
  const campoBuscaRef = useRef(null);

  // useRef (opcional): foca o campo de busca ao abrir a página.
  useEffect(() => {
    campoBuscaRef.current?.focus();
  }, []);

  // RF04 — Lista filtrada calculada com useMemo.
  const produtosFiltrados = useMemo(() => filtrarProdutos(produtos, busca), [produtos, busca]);

  const semResultados = (
    <div className={estilos.vazio}>
      <p>Nenhum produto encontrado</p>
      <Botao variante="secundario" onClick={() => setBusca("")}>
        Limpar busca
      </Botao>
    </div>
  );

  return (
    <section>
      <h1>Produtos</h1>
      <CampoBusca ref={campoBuscaRef} valor={busca} aoMudar={setBusca} />
      <ListaProdutos
        produtos={produtosFiltrados}
        carregando={carregando}
        erro={erro}
        aoAdicionar={adicionarItem}
        vazio={busca.trim() && produtos.length > 0 ? semResultados : undefined}
      />
    </section>
  );
}

export default Produtos;
