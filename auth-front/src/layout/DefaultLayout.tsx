import { Link } from "react-router-dom";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <header>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Iniciar sesion</Link>
            </li>
            <li>
              <Link to="/signup">Crear cuenta</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
