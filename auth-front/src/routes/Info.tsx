import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import "../styles/Info.css";
import FooterLayout from "../layout/FooterLayout";

const Info = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const abrirModal = (imagen: string) => {
    setModalImage(imagen);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  return (
    <PortalLayout>
      {/* <main className="> */}
      <div className="containerInfo">


        <div className="der">
          <div className="infoDovos">
            <h1>¡Bienvenidos a DOVOS!</h1>
            <div className="imgInfo">

              <a href="#" className="aInfo" onClick={() => abrirModal('https://i.ibb.co/kgnMh58/compatibilidad.png')}>
                <img
                  src="https://i.ibb.co/XJqBt4W/gente.jpg"
                  className="imagen-circular"
                  alt="marcador"
                  width="130px"
                />
                <p>¿Quienes pueden?</p>
              </a>

              <a href="#" className="aInfo" onClick={() => abrirModal('https://i.ibb.co/kgnMh58/compatibilidad.png')}>
                <img src="https://i.ibb.co/3TVHhwT/logo.jpg"
                  className="imagen-circular"
                  alt="preg"
                  width="130px"
                />
                <p>¿Por que donar?</p>
              </a>

              <a href="https://www.argentina.gob.ar/salud/donarsangre/donde" target="_blank" className="aInfo">
                <img
                  src="https://i.ibb.co/DLfySH6/marcador.jpg"
                  className="imagen-circular"
                  alt="marcador"
                  width="130px"
                />
                <p>¿Donde donar?</p>
              </a>
            </div>

            {modalOpen && (
              <div className="modal" onClick={cerrarModal}>
                <div className="modal-contenido">
                  <span className="cerrar">&times;</span>
                  <img
                    src={modalImage}
                    alt="Imagen en modal"
                    className="imagen-modal"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="left">
          <div className="infoLeft">
            <h5>    Nuestro objetivo es conectar a
              donantes y receptores de sangre de manera rápida y
              efectiva.</h5>
            <p className="parrafoInfo">
              Buscamos agilizar el proceso de búsqueda de donantes, generando un impacto directo en aquellas personas que más lo necesitan.
            </p>
          </div>
        </div>
      </div>
      {/* </main> */}
      <FooterLayout/>
    </PortalLayout>
  );
};

export default Info;

