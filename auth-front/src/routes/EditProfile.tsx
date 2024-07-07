// 
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL, FACTORES, PROVINCIAS, ROL } from "../auth/authConstants";
import { AuthResponse } from "../types/types";


interface UserData {
  factor: string;
  nombre: string;
  apellido: string;
  ciudad: string;
  provincia: string;
  rol: string;
  telefono: number,
  cp: number,
}

const EditProfile: React.FC = () => {
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

  const [editMode, setEditMode] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name as string]: name === "telefono" || name === "cp" ? Number(value) : value
    });
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditMode(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(false);

    try {
      const accessToken = auth.getAccessToken();

      const response = await fetch(`${API_URL}/editprofile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const json = await response.json() as AuthResponse;
        console.log('Perfil actualizado:', json);
      } else {
        const error = await response.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <PortalLayout>
      <Container maxWidth="md">
        <div className="wrapper2"> 

        <form onSubmit={handleSave} className="formData">
          <Typography variant="h4" textAlign={"center"}>MIS DATOS</Typography>

          <TextField
            name="nombre"
            label="Nombre completo"
            fullWidth
            margin="normal"
            value={userData.nombre}
            onChange={handleChange}
            disabled={!editMode}
          />

          <TextField
            name="apellido"
            label="Apellido"
            fullWidth
            margin="normal"
            value={userData.apellido}
            onChange={handleChange}
            disabled={!editMode}
          />

          <TextField
            name="telefono"
            label="Telefono"
            fullWidth
            margin="normal"
            value={userData.telefono}
            onChange={handleChange}
            disabled={!editMode}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="factor-label">Factor Sanguíneo</InputLabel>
            <Select
              labelId="factor-label"
              id="factor"
              name="factor"
              value={userData.factor}
              onChange={handleChange}
              disabled={!editMode}
            >
              {FACTORES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="provincia-label">Provincia</InputLabel>
            <Select
              labelId="provincia-label"
              id="provincia"
              name="provincia"
              value={userData.provincia}
              onChange={handleChange}
              disabled={!editMode}
            >
              {PROVINCIAS.map((provincia) => (
                <MenuItem key={provincia} value={provincia}>
                  {provincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            name="ciudad"
            label="Ciudad"
            fullWidth
            margin="normal"
            value={userData.ciudad}
            onChange={handleChange}
            disabled={!editMode}
          />
          <TextField
            name="cp"
            label="Codigo postal"
            fullWidth
            margin="normal"
            value={userData.cp}
            onChange={handleChange}
            disabled={!editMode}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="rol"
              name="rol"
              value={userData.rol}
              onChange={handleChange}
              disabled={!editMode}
            >
              {ROL.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {!editMode ? (
            <button onClick={handleEdit} className="button">
              Editar
            </button>
          ) : (
            
            <button type="submit" className="button">
              Guardar
            </button>
          )}
        </form>
        </div>
      </Container>
    </PortalLayout>
  );
};

export default EditProfile;
