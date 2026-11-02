import { Link } from "react-router-dom";
import estilos from "./paginas.module.css";

function NaoEncontrada() {
  return (
    <section className={estilos.resultado}>
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/produtos">Ir para os produtos</Link>
    </section>
  );
}

export default NaoEncontrada;
