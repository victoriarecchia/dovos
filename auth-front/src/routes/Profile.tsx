// // 
// import React, { useState, useEffect } from "react";
// import PortalLayout from "../layout/PortalLayout";
// import { useAuth } from "../auth/AuthProvider";
// import { API_URL } from "../auth/authConstants";
// import { Link } from "react-router-dom";
// import '../styles/Profile.css'
// import FooterLayout from "../layout/FooterLayout";

// interface UserData {
//   factor: string;
//   nombre: string;
//   apellido: string;
//   ciudad: string;
//   provincia: string;
//   rol: string;
//   telefono: number;
//   cp: number
// }

// const Profile: React.FC = () => {
//   const [userData, setUserData] = useState<UserData>({
//     factor: "",
//     nombre: "",
//     apellido: "",
//     ciudad: "",
//     provincia: "",
//     rol: "",
//     telefono: 0,
//     cp: 0
//   });


//   const auth = useAuth();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const accessToken = auth.getAccessToken();
//         const response = await fetch(`${API_URL}/editprofile`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//           }
//         });

//         if (response.ok) {
//           const data = await response.json() as UserData;
//           setUserData(data);
//         } else {
//           console.error('Error al obtener los datos del perfil');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchUserData();
//   }, [auth]);

//   return (
//     <PortalLayout>
//       <div className="container">
//         <form className="form">
//           <h1>PERFIL</h1>
//           <div className="ubicacion">
//             <li> <strong>NOMBRE Y APELLIDO: </strong>{userData.nombre} {userData.apellido}</li>
//             <li> <strong> UBICACION:</strong>            {userData.ciudad} {userData.provincia}</li>

//             <li><strong>CP:</strong>  {userData.cp}</li>
//             <li><strong>FACTOR SANGUINEO:</strong>  {userData.factor}</li>
//             <li><strong>ROL: </strong>{userData.rol}</li>
//             <li><strong>TELEFONO: </strong>{userData.telefono}</li>
//           </div>

//           <button className="button">
//             <Link to="/me">EDITAR</Link> 
//           </button>
//         </form>
//       </div>
//       <FooterLayout/>
//     </PortalLayout>
//   );
// };

// export default Profile; 
// 
import React, { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { Link } from "react-router-dom";
import '../styles/Profile.css'
import FooterLayout from "../layout/FooterLayout";
import { Typography } from "@mui/material";

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
        <form className="form">
        <Typography variant="h4" textAlign={"center"}>MIS DATOS</Typography>
        <div className="ubicacion">
            <li> <strong> NOMBRE Y APELLIDO <br/> </strong>{userData.nombre} {userData.apellido}</li>
            <li> <strong>UBICACION <br/> </strong>
            <p>Ciudad: {userData.ciudad} </p> 
            <p>Provincia:{userData.provincia}</p>
            </li>
            <li><strong>CODIGO POSTAL <br/> </strong>  {userData.cp}</li>
            <li><strong>FACTOR SANGUINEO <br/> </strong>  {userData.factor}</li>
            <li><strong>ROL <br/>  </strong>{userData.rol}</li>
            <li><strong>TELEFONO <br/> </strong>{userData.telefono}</li>
          </div>
            <Link to="/me"> <button className="button">EDITAR</button></Link>
          
        </form>
      </div>
      <FooterLayout/>
    </PortalLayout>
  );
};

export default Profile; 