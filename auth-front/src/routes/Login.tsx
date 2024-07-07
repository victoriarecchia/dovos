import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { API_URL } from "../auth/authConstants";
import '../styles/Login.css'
import { TextField, Typography } from "@mui/material";
import FooterLayout from "../layout/FooterLayout";
import Swal from "sweetalert2";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);


        const errorR = errorResponse;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorR,
        })
      }
    } catch (error) {
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/info" />;
  }
  return (
    <DefaultLayout>
      <div className="headerPrinc">
      <div className="header1">
        {/* <h1>DOVOS</h1> */}
        {/* <img src="https://i.ibb.co/k6Ltspb/dovos.png" alt="dovos"/> */}
        <img src="https://i.ibb.co/TYdm67N/logo-removebg-preview-1.png" alt="logo-removebg-preview-1"/>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="formEdit">
          <Typography className="login" variant="h4">Iniciar sesion</Typography>
          <TextField
          
            name="fullName"
            label="Nombre de usuario"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            name="fullName"
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn pulse-effect"> Iniciar sesion</button>
          <Typography>¿No tienes cuenta? <Link to="/signup" className="createAccount">Crear cuenta</Link></Typography>
        </form>
      </div>
      </div>
      
      <FooterLayout />
    </DefaultLayout>
  );
}