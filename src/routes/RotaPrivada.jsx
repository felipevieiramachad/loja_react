import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useCarrinho } from "../hooks/useCarrinho";

// RF12 — Só libera a rota se houver ao menos um item no carrinho.
function RotaPrivada({ children }) {
  const { itens } = useCarrinho();
  if (itens.length === 0) return <Navigate to="/carrinho" replace />;
  return children;
}

RotaPrivada.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RotaPrivada;
