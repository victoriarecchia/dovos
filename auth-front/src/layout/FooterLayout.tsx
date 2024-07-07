
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
          <p>Politicas de privacidad</p>
        </div>
      </footer>
    </div>
  );
}

export default FooterLayout;
