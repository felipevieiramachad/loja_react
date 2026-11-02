import { Link } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";
import ItemCarrinho from "../components/molecules/ItemCarrinho";
import ResumoCompra from "../components/organisms/ResumoCompra";
import Botao from "../components/atoms/Botao";
import estilos from "./paginas.module.css";

// RF08 — Lê os itens do CarrinhoContext.
function Carrinho() {
  const { itens, alterarQuantidade, removerItem, valorTotal } = useCarrinho();

  if (itens.length === 0) {
    return (
      <section className={estilos.vazio}>
        <h1>Seu carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/produtos">Ver produtos</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Seu carrinho</h1>
      <ul className={estilos.listaCarrinho}>
        {itens.map((item) => (
          <ItemCarrinho
            key={item.id}
            item={item}
            aoAlterarQuantidade={alterarQuantidade}
            aoRemover={removerItem}
          />
        ))}
      </ul>
      <ResumoCompra total={valorTotal} />
      <Botao to="/pagamento">Finalizar compra</Botao>
    </section>
  );
}

export default Carrinho;
