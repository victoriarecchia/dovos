
// import React from "react";

// interface PortalLayoutProps {
//   children?: React.ReactNode;
// }
// export default function FooterLayout({ children }: PortalLayoutProps) {
//   return (
//     <>
//       <main>{children}</main>
//       <footer>
//     <div className="footer-info">
//         <p>Todos los derechos reservados &copy; 2024</p>
//         <p>Otra información del footer aquí...</p>
//     </div>
// </footer>
//     </>
//   );
// }
import React from "react";
import  '../index.css'
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
          <p>Otra información del footer aquí...</p>
        </div>
      </footer>
    </div>
  );
}

export default FooterLayout;
