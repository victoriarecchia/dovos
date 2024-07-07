// // DeleteAccount.tsx

// import React from "react";
// import { Button } from "@mui/material";
// import { useAuth } from "../auth/AuthProvider";
// import { API_URL } from "../auth/authConstants";
// import Swal from "sweetalert2";

// const DeleteAccount: React.FC = () => {
//   const auth = useAuth();

//   const handleDeleteAccount = async () => {
//     try {
//       const accessToken = auth.getAccessToken();
//       const response = await fetch(`${API_URL}/user/${auth.getUser()?.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`
//         }
//       });

//       if (response.ok) {
//         Swal.fire({
//           title: "¿Estas seguro/a de que quieres eliminar tu cuenta?",
//           text: "Esta acción es irreversible.",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Si, eliminar"
//         }).then((result) => {
//           if (result.isConfirmed) {
//             Swal.fire({
//               title: "Cuenta eliminada!",
//               text: "Su cuenta de DOVOS ha sido eliminada.",
//               icon: "success"
//             });
//             auth.signout();
//           }
//         });

//       } else {
//         console.error('Error al eliminar la cuenta');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

  
//   return (
//     <div>

//       <Button variant="contained" color="error" onClick={handleDeleteAccount}>
//         Eliminar cuenta
//       </Button>
//     </div>
//   )
// }

// export default DeleteAccount;

import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import Swal from "sweetalert2";

const DeleteAccount: React.FC = () => {
  const auth = useAuth();

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro/a de que quieres eliminar tu cuenta?",
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    });

    if (result.isConfirmed) {
      try {
        const accessToken = auth.getAccessToken();
        const response = await fetch(`${API_URL}/user/${auth.getUser()?.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          Swal.fire({
            title: "Cuenta eliminada!",
            text: "Su cuenta de DOVOS ha sido eliminada.",
            icon: "success"
          });
          auth.signout();
        } else {
          console.error('Error al eliminar la cuenta');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // El usuario canceló la acción, no hacemos nada
      console.log('Cancelado');
    }
  }

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDeleteAccount}>
        Eliminar cuenta
      </Button>
    </div>
  )
}

export default DeleteAccount;
