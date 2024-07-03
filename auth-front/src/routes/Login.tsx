import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { API_URL } from "../auth/authConstants";  
import '../styles/Login.css'
import { Button, TextField, Typography } from "@mui/material";
import FooterLayout from "../layout/FooterLayout";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        // console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);

      }
    } catch (error) {
      // console.log(error);
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/profile" />;
  }
  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="formEdit">
        <Typography className="login" variant="h4">Iniciar sesion</Typography>
        <Typography>  {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}</Typography>

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
      <Button type="submit" color="primary" className="formEdit" >Iniciar sesion</Button>
        <Typography  className="formEdit">¿No tienes cuenta? <Link to="/signup"><Button>Crear cuenta</Button></Link></Typography> 
      </form>
    <FooterLayout/>  
    </DefaultLayout>
  );
}