
import { useState } from "react"
import DefaultLayout from "../layout/DefaultLayout"
import { useAuth } from "../auth/AuthProvider"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { API_URL } from "../auth/authConstants"
import { Button, TextField, Typography } from "@mui/material"
import { AuthResponseError } from "../types/types"
import FooterLayout from "../layout/FooterLayout"
import Swal from "sweetalert2"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errorResponse, setErrorResponse] = useState("")

    const auth = useAuth()
    const goTo = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, email }),
            })

            if (response.ok) {
                // const json = await response.json() as AuthResponse;
                setUsername("")
                setPassword("")
                setEmail("")
                setErrorResponse("")
                goTo("/")
            } else {
                const json = (await response.json()) as AuthResponseError
                if (response.status === 409 && json.body.error === "El nombre de usuario ya existe") {
                    setErrorResponse("El nombre de usuario ya está en uso. Por favor, elija otro.")

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "El nombre de usuario ya está en uso. Por favor, elija otro.",
                    })
                } else {
                    setErrorResponse(json.body.error)
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error)
            setErrorResponse("Error de red al intentar crear usuario.")
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <DefaultLayout>
            <div className="headerPrinc">
            <div className="header1">
                <img src="https://i.ibb.co/TYdm67N/logo-removebg-preview-1.png" alt="logo-removebg-preview-1"/>
            </div>
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="formEdit">
                    <Typography variant="h4" className="login">
                        Crear cuenta
                    </Typography>
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        name="username"
                        label="Usuario"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        name="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Typography>Al registrarte, confirmas que estas de acuerdo con nuestra  <Link to = "/politica">politica de privacidad.</Link></Typography>
                    <button type="submit" className="btn pulse-effect">
                        Crear cuenta
                    </button>
                    <Typography>
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/" className="createAccount">
                            Iniciar sesión
                        </Link>
                    </Typography>
                </form>
            </div>
            </div>
            <FooterLayout />
        </DefaultLayout>
    )
}
