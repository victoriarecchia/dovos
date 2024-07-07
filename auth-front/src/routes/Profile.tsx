import React, { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { Link } from "react-router-dom";
import '../styles/Profile.css'
import FooterLayout from "../layout/FooterLayout";
import DeleteAccount from "./Delete";

interface UserData {
  factor: string;
  nombre: string;
  apellido: string;
  ciudad: string;
  provincia: string;
  rol: string;
  telefono: number;
  cp: number
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    factor: "",
    nombre: "",
    apellido: "",
    ciudad: "",
    provincia: "",
    rol: "",
    telefono: 0,
    cp: 0
  });

  const auth = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = auth.getAccessToken();
        const response = await fetch(`${API_URL}/editprofile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json() as UserData;
          setUserData(data);
        } else {
          console.error('Error al obtener los datos del perfil');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [auth]);


  return (
    <PortalLayout>
      <div className="container">
        <div className="div1">
          <h1>MIS DATOS</h1>
          <h2>Recorda mantener tus datos siempre actualizados.</h2>
        </div>
        <div className="div2">

        <form className="form">
          <li className="listaPerfil"> <strong> NOMBRE Y APELLIDO: </strong>{userData.nombre} {userData.apellido}</li>
          <li className="listaPerfil"> <strong>UBICACION: </strong>{userData.ciudad}, {userData.provincia}
            {/* <p>{userData.ciudad}, {userData.provincia}</p> */}
          </li>
          <li className="listaPerfil"><strong>CODIGO POSTAL: </strong>  {userData.cp}</li>
          <li className="listaPerfil"><strong>FACTOR SANGUINEO: </strong>  {userData.factor}</li>
          <li className="listaPerfil"><strong>ROL:  </strong>{userData.rol}</li>
          <li className="listaPerfil" ><strong>TELEFONO: </strong>{userData.telefono}</li>
          <Link to="/me"> <button className="button">EDITAR</button></Link>
    <br/>
      <DeleteAccount/>
        </form>

        </div>

      </div>
      <FooterLayout />
    </PortalLayout>
  );
};

export default Profile; 