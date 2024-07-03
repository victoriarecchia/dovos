// import { useState } from "react";
// import DefaultLayout from "../layout/DefaultLayout";
// import { useAuth } from "../auth/AuthProvider";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { AuthResponse, AuthResponseError } from "../types/types";
// import { API_URL } from "../auth/authConstants";
// import { Button, TextField, Typography } from "@mui/material";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [errorResponse, setErrorResponse] = useState("");

//   const auth = useAuth();
//   const goTo = useNavigate();

//   async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_URL}/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password, email }),
//       });

//       if (response.ok) {
//         const json = await response.json() as AuthResponseError;
//         setUsername("");
//         setPassword("");
//         setEmail("");
//         goTo("/");
//       } else {
//         const json = await response.json();
//         if (response.status === 409 && json.error === "El nombre de usuario ya existe") {
//           setErrorResponse("El nombre de usuario ya está en uso. Por favor, elija otro.");
//         } else {
//           setErrorResponse(json.error || "Email incorrecto");
//         }
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrorResponse("Error de red al intentar crear usuario.");
//     }
//   }

//   if (auth.isAuthenticated) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <DefaultLayout>
//       <form onSubmit={handleSubmit} className="formEdit">
//         <Typography variant="h4" className="login">Crear cuenta</Typography>

//         <Typography variant="h6">
//           {errorResponse && <div className="errorMessage">{errorResponse}</div>}
//         </Typography>

//         <TextField
//           name="email"
//           label="Email"
//           type="email" // Asegúrate de que sea tipo "email"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required // Campo requerido
//         />
//         <TextField
//           name="username"
//           label="Usuario"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required // Campo requerido
//         />
//         <TextField
//           name="password"
//           label="Contraseña"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required // Campo requerido
//         />

//         <Button type="submit" className="formEdit">Crear cuenta</Button>

//         <Typography className="formEdit">
//           ¿Ya tienes cuenta? <Link to="/"><Button>Iniciar sesión</Button></Link>
//         </Typography>
//       </form>
//     </DefaultLayout>
//   );
// }
import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/authConstants";
import { Button, TextField, Typography } from "@mui/material";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        // const json = await response.json() as AuthResponse;
        setUsername("");
        setPassword("");
        setEmail("");
        setErrorResponse("")
        goTo("/");
      } 
      else {
        const json = await response.json() as AuthResponseError; 
        if (response.status === 409 && json.body.error === "El nombre de usuario ya existe") {
          setErrorResponse("El nombre de usuario ya está en uso. Por favor, elija otro.");
        } else {
          setErrorResponse(json.body.error);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorResponse("Error de red al intentar crear usuario.");
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/info" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="formEdit">
        <Typography variant="h4" className="login">Crear cuenta</Typography>
        <Typography variant="h6">
          {errorResponse && <div className="errorMessage">{errorResponse}</div>}
        </Typography>

        <TextField
          name="email"
          label="Email"
          type="email" // Asegúrate de que sea tipo "email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Campo requerido
        />
        <TextField
          name="username"
          label="Usuario"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Campo requerido
        />
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Campo requerido
        />

        <Button type="submit" className="formEdit">Crear cuenta</Button>

        <Typography className="formEdit">
          ¿Ya tienes cuenta? <Link to="/"><Button>Iniciar sesión</Button></Link>
        </Typography>
      </form>
    </DefaultLayout>
  );
}
