import { Link, NavLink } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useCarrinho } from "../../hooks/useCarrinho";
import estilos from "./Header.module.css";

// RF09 — Header com contador de itens do carrinho (Badge do Material UI).
function Header() {
  const { quantidadeTotal } = useCarrinho();
  const classeLink = ({ isActive }) => (isActive ? `${estilos.link} ${estilos.ativo}` : estilos.link);

  return (
    <header className={estilos.header}>
      <div className={estilos.conteudo}>
        <Link to="/produtos" className={estilos.logo}>
          Nordeva
        </Link>
        <nav aria-label="Principal" className={estilos.nav}>
          <NavLink to="/produtos" className={classeLink}>
            Produtos
          </NavLink>
          <NavLink to="/carrinho" className={classeLink}>
            <Badge
              badgeContent={quantidadeTotal}
              color="warning"
              showZero
              sx={{ "& .MuiBadge-badge": { right: -14, top: 2 } }}
            >
              Carrinho
            </Badge>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
