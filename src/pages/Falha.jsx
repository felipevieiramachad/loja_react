import Botao from "../components/atoms/Botao";
import estilos from "./paginas.module.css";

// RF13 — Mantém os itens do carrinho e permite tentar novamente.
function Falha() {
  return (
    <section className={estilos.resultado}>
      <h1>Compra não aprovada</h1>
      <p className={estilos.mensagemFalha} role="alert">
        tentativa de golpe
      </p>
      <Botao to="/pagamento" variante="secundario">
        Tentar novamente
      </Botao>
    </section>
  );
}

export default Falha;
