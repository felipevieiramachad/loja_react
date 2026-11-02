import { Link, useParams } from "react-router-dom";
import { useProduto } from "../hooks/useProdutos";
import { useCarrinho } from "../hooks/useCarrinho";
import Botao from "../components/atoms/Botao";
import Preco from "../components/atoms/Preco";
import estilos from "./paginas.module.css";

// RF05 — Rota dinâmica /produtos/:id
function DetalheProduto() {
  const { id } = useParams();
  const { produto, carregando, erro } = useProduto(id);
  const { adicionarItem } = useCarrinho();

  if (carregando) return <p role="status">Carregando produto...</p>;
  if (erro) return <p role="alert" className={estilos.erro}>{erro}</p>;

  if (!produto) {
    return (
      <section className={estilos.vazio}>
        <h1>Produto não encontrado</h1>
        <Link to="/produtos">Voltar ao catálogo</Link>
      </section>
    );
  }

  return (
    <section className={estilos.detalhe}>
      <img src={produto.imagem} alt={`Foto do produto ${produto.nome}`} className={estilos.detalheImagem} />
      <div className={estilos.detalheInfo}>
        <span className={estilos.categoria}>{produto.categoria}</span>
        <h1>{produto.nome}</h1>
        <p>{produto.descricao}</p>
        <Preco valor={produto.preco} className={estilos.detalhePreco} />
        <p className={estilos.estoque}>
          {produto.estoque > 0 ? `${produto.estoque} unidades em estoque` : "Produto sem estoque"}
        </p>
        <div className={estilos.acoes}>
          <Botao onClick={() => adicionarItem(produto)} disabled={produto.estoque < 1}>
            Adicionar ao carrinho
          </Botao>
          <Botao to="/produtos" variante="secundario">
            Voltar ao catálogo
          </Botao>
        </div>
      </div>
    </section>
  );
}

export default DetalheProduto;
