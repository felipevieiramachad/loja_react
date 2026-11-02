import PropTypes from "prop-types";
import Botao from "../atoms/Botao";
import Preco from "../atoms/Preco";
import estilos from "./ItemCarrinho.module.css";

// RF08 — Item do carrinho com controle de quantidade, subtotal e remoção.
function ItemCarrinho({ item, aoAlterarQuantidade, aoRemover }) {
  return (
    <li className={estilos.item}>
      <img src={item.imagem} alt={`Foto do produto ${item.nome}`} className={estilos.imagem} />
      <div className={estilos.info}>
        <h3 className={estilos.nome}>{item.nome}</h3>
        <span className={estilos.unitario}>
          Unitário: <Preco valor={item.preco} />
        </span>
      </div>

      <div className={estilos.quantidade} role="group" aria-label={`Quantidade de ${item.nome}`}>
        <Botao
          variante="secundario"
          aria-label={`Diminuir quantidade de ${item.nome}`}
          onClick={() => aoAlterarQuantidade(item.id, item.quantidade - 1)}
          disabled={item.quantidade <= 1}
        >
          −
        </Botao>
        <span className={estilos.valor} aria-live="polite">{item.quantidade}</span>
        <Botao
          variante="secundario"
          aria-label={`Aumentar quantidade de ${item.nome}`}
          onClick={() => aoAlterarQuantidade(item.id, item.quantidade + 1)}
          disabled={item.quantidade >= item.estoque}
        >
          +
        </Botao>
      </div>

      <div className={estilos.subtotal}>
        <span>Subtotal</span>
        <Preco valor={item.preco * item.quantidade} />
      </div>

      <Botao variante="perigo" onClick={() => aoRemover(item.id)}>
        Remover
      </Botao>
    </li>
  );
}

ItemCarrinho.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
    quantidade: PropTypes.number.isRequired,
  }).isRequired,
  aoAlterarQuantidade: PropTypes.func.isRequired,
  aoRemover: PropTypes.func.isRequired,
};

export default ItemCarrinho;
