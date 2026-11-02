import { useEffect } from "react";
import { useCarrinho } from "../hooks/useCarrinho";
import Botao from "../components/atoms/Botao";
import estilos from "./paginas.module.css";

function Sucesso() {
  const { limparCarrinho } = useCarrinho();

  // RF13 — Compra aprovada: limpa o carrinho.
  useEffect(() => {
    limparCarrinho();
  }, [limparCarrinho]);

  return (
    <section className={estilos.resultado}>
      <h1>Compra aprovada</h1>
      <p>Seu pagamento foi confirmado e o pedido já está sendo preparado.</p>
      <Botao to="/produtos">Voltar às compras</Botao>
    </section>
  );
}

export default Sucesso;
