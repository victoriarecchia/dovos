
import React from "react";
import  '../index.css'
import '../styles/Footer.css'
interface FooterLayoutProps {
  children?: React.ReactNode;
}

const FooterLayout: React.FC<FooterLayoutProps> = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="content">
        {/* Contenido principal de la página */}
        {children}
      </div>
      
      {/* Footer */}
      <footer>
        <div className="footer-info">
          <p>Todos los derechos reservados &copy; 2024</p>
          <a href="/politica" target="blanck" style={{textDecoration:"none", color: "rgb(105, 32, 32)"}}><p>Politicas de privacidad</p></a>
        </div>
      </footer>
    </div>
  );
}

export default FooterLayout;
