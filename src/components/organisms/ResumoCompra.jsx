import PropTypes from "prop-types";
import Preco from "../atoms/Preco";
import estilos from "./ResumoCompra.module.css";

function ResumoCompra({ total, rotulo = "Total da compra" }) {
  return (
    <div className={estilos.resumo}>
      <span>{rotulo}</span>
      <Preco valor={total} className={estilos.valor} />
    </div>
  );
}

ResumoCompra.propTypes = {
  total: PropTypes.number.isRequired,
  rotulo: PropTypes.string,
};

export default ResumoCompra;
