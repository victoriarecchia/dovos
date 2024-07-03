import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            {/* <li>
              <Link to="/dashboard">DOVOS</Link>
            </li> */}
                <li>
                  <Link to="/info">Informacion</Link>
                </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
                <li>
                  <Link to="/donantes">Donantes</Link>
                </li>
                <li>
                  <Link to="/receptores">Receptores</Link>
                </li>
            {/* <li>
              <Link to="/me">{auth.getUser()?.username ?? ""}</Link>
            </li> */}
            <li>
              <a href="#" onClick={handleSignOut}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
