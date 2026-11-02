import PropTypes from "prop-types";
import ProdutoCard from "../molecules/ProdutoCard";
import estilos from "./ListaProdutos.module.css";

// RF02 — Trata carregamento, erro, lista vazia e renderiza a grade com key estável.
function ListaProdutos({
  produtos,
  carregando,
  erro = null,
  aoAdicionar,
  vazio = <p>Nenhum produto disponível no momento.</p>,
}) {
  if (carregando) {
    return <p role="status">Carregando produtos...</p>;
  }

  if (erro) {
    return <p role="alert" className={estilos.erro}>{erro}</p>;
  }

  if (produtos.length === 0) {
    return vazio;
  }

  return (
    <div className={estilos.grade}>
      {produtos.map((produto) => (
        <ProdutoCard key={produto.id} produto={produto} aoAdicionar={aoAdicionar} />
      ))}
    </div>
  );
}

ListaProdutos.propTypes = {
  produtos: PropTypes.arrayOf(PropTypes.object).isRequired,
  carregando: PropTypes.bool.isRequired,
  erro: PropTypes.string,
  aoAdicionar: PropTypes.func.isRequired,
  vazio: PropTypes.node,
};

export default ListaProdutos;
