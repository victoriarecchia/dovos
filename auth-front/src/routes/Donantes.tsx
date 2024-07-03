
import React, { useState, useEffect } from "react";
import { Typography, Select, MenuItem, FormControl, InputLabel, Container } from "@mui/material";
import PortalLayout from "../layout/PortalLayout";
import { API_URL, FACTORES, PROVINCIAS } from "../auth/authConstants";
import { useAuth } from "../auth/AuthProvider";
import '../styles/Donantes.css';
import FooterLayout from "../layout/FooterLayout";

const Donantes = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedFactor, setSelectedFactor] = useState<string>("");
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = auth.getAccessToken();
        const response = await fetch(`${API_URL}/user/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          filterUsers(data, selectedFactor, selectedProvincia);
        } else {
          console.error("Error al obtener los usuarios:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, [auth]);

  const handleFactorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const factor = event.target.value as string;
    setSelectedFactor(factor);
    filterUsers(users, factor, selectedProvincia);
  };

  const handleProvinciaChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const provincia = event.target.value as string;
    setSelectedProvincia(provincia);
    filterUsers(users, selectedFactor, provincia);
  };

  const filterUsers = (users: any[], factor: string, provincia: string) => {
    const filtered = users.filter(user => 
      user.rol === 'Donante' && 
      (!factor || user.factor === factor) && 
      (!provincia || user.provincia === provincia)
    );
    setFilteredUsers(filtered);
  };

  return (
    <PortalLayout>
      <Container className="donantesContainer">
        <Typography variant="h4" textAlign="center">DONANTES VOLUNTARIOS</Typography>
        <div className="filters-container">
          <FormControl fullWidth margin="normal">
            <InputLabel id="factor-label">Filtrar por Factor Sanguíneo</InputLabel>
            <Select
              labelId="factor-label"
              id="factor"
              value={selectedFactor}  
              onChange={handleFactorChange}
              >
              <MenuItem value=""> 
                <em>Todos</em>
              </MenuItem>
              {FACTORES.map((factor) => (
                <MenuItem key={factor} value={factor}>
                  {factor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="provincia-label">Filtrar por provincia</InputLabel>
            <Select
              labelId="provincia-label"
              id="provincia"
              value={selectedProvincia}
              onChange={handleProvinciaChange}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {PROVINCIAS.map((provincia) => (
                <MenuItem key={provincia} value={provincia}>
                  {provincia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </div>

        {/* LISTA DE DONANTES */}
        <div className="donantes-container">
        <ul className="donantes-list">
          {filteredUsers.map((user, index) => (
            <li key={index} className="donantes-item">
              <div className="user-info">
                <strong className="nombre">{user.apellido} {user.nombre}</strong>
                <div className="ubicacion">
                  <p>Provincia: {user.provincia}</p>
                  <p>Ciudad: {user.ciudad}</p>
                  <p>CP: {user.cp}</p>
                  <p>Telefono: {user.telefono}</p>
                </div>
                <strong className="nombre">Factor: {user.factor}</strong>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </Container>
      <FooterLayout/>  
    </PortalLayout>
  );
};

export default Donantes;
