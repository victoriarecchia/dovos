import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import "../styles/Info.css";

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
      <div className="infoDovos">
        <h1>¡Bienvenidos a DOVOS!</h1>
        <h3>    En DOVOS, nuestro objetivo es conectar a
          donantes voluntarios con receptores de sangre de una manera rápida y
          eficiente.</h3>
        <p className="parrafoInfo">
          Queremos facilitar el proceso de búsqueda y emparejamiento entre
          donantes voluntarios y personas necesitadas de sangre, reduciendo así
          el tiempo necesario para encontrar potenciales donantes y aumentando
          las posibilidades de salvar vidas.
        </p>
      </div>

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
    </PortalLayout>
  );
};

export default Info;

