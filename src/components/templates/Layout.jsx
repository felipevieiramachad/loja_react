import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import estilos from "./Layout.module.css";

// RF14 — Header + Outlet + Footer, aplicado a todas as páginas.
function Layout() {
  return (
    <div className={estilos.layout}>
      <Header />
      <main className={estilos.principal}>
        <Outlet />
      </main>
      <footer className={estilos.footer}>
        <p>© {new Date().getFullYear()} Nordeva — projeto acadêmico. Pagamento apenas simulado.</p>
      </footer>
    </div>
  );
}

export default Layout;
