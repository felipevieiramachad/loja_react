import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Botao from "../atoms/Botao";
import Preco from "../atoms/Preco";
import estilos from "./ProdutoCard.module.css";

// RF03 — Card de produto: recebe tudo por props.
function ProdutoCard({ produto, aoAdicionar }) {
  return (
    <article className={estilos.card}>
      <img
        src={produto.imagem}
        alt={`Foto do produto ${produto.nome}`}
        className={estilos.imagem}
        loading="lazy"
      />
      <div className={estilos.corpo}>
        <span className={estilos.categoria}>{produto.categoria}</span>
        <h3 className={estilos.nome}>
          <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
        </h3>
        <Preco valor={produto.preco} className={estilos.preco} />
        <Botao onClick={() => aoAdicionar(produto)} disabled={produto.estoque < 1}>
          {produto.estoque < 1 ? "Indisponível" : "Adicionar ao carrinho"}
        </Botao>
      </div>
    </article>
  );
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
  aoAdicionar: PropTypes.func.isRequired,
};

export default ProdutoCard;
