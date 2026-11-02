import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import estilos from "./Botao.module.css";

// Botão reutilizável: vira <Link> quando recebe a prop `to`.
function Botao({ children, variante = "primario", to, ...resto }) {
  const classe = `${estilos.botao} ${estilos[variante]}`;

  if (to) {
    return (
      <Link to={to} className={classe} {...resto}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classe} {...resto}>
      {children}
    </button>
  );
}

Botao.propTypes = {
  children: PropTypes.node.isRequired,
  variante: PropTypes.oneOf(["primario", "secundario", "perigo"]),
  to: PropTypes.string,
};

export default Botao;
