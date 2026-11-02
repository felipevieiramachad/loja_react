import PropTypes from "prop-types";
import { formatarMoeda } from "../../utils/moeda";

function Preco({ valor, className }) {
  return <strong className={className}>{formatarMoeda(valor)}</strong>;
}

Preco.propTypes = {
  valor: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Preco;
