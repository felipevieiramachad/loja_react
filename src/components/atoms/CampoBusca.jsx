import { forwardRef } from "react";
import PropTypes from "prop-types";
import estilos from "./CampoBusca.module.css";

// Campo controlado: valor e onChange vêm do componente pai (useState).
const CampoBusca = forwardRef(function CampoBusca({ valor, aoMudar }, ref) {
  return (
    <div className={estilos.wrapper}>
      <label htmlFor="busca" className={estilos.rotulo}>
        Buscar produto
      </label>
      <input
        id="busca"
        ref={ref}
        type="search"
        className={estilos.campo}
        placeholder="Digite o nome do produto"
        value={valor}
        onChange={(evento) => aoMudar(evento.target.value)}
      />
    </div>
  );
});

CampoBusca.propTypes = {
  valor: PropTypes.string.isRequired,
  aoMudar: PropTypes.func.isRequired,
};

export default CampoBusca;
