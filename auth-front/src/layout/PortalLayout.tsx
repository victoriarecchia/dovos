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
        <nav className="navbar">
          <div>
            <li>
              <img src="https://i.ibb.co/x1q4MdF/logo-removebg-preview-2.png" alt="logo-removebg-preview-2" width={50} />
            </li>
          </div>
          <div>

            <ul>
              <li>
                <Link to="/info">Sobre DOVOS </Link>
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
              <li>
                <a href="#" onClick={handleSignOut}>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
