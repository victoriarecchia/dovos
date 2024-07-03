
import { Typography, Container, Box } from "@mui/material";
import PortalLayout from "../layout/PortalLayout";
import FooterLayout from "../layout/FooterLayout";

const Info = () => {
  return (
    <PortalLayout>

      <Box  py={2}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom color="black">
            ¡Bienvenidos a DOVOS!
            Donantes Voluntarios de Sangre
          </Typography>


          <Typography variant="body1" paragraph color="textPrimary">
            En DOVOS, nos dedicamos a facilitar la donación de sangre a través de un sistema en línea innovador. Nuestro objetivo es conectar a donantes voluntarios con receptores de sangre de una manera rápida y eficiente. 
          </Typography>

          <Typography variant="body1" paragraph color="black">
      Queremos facilitar el proceso de búsqueda y emparejamiento entre donantes voluntarios y personas necesitadas de sangre, reduciendo así el tiempo necesario para encontrar potenciales donantes y aumentando las posibilidades de salvar vidas.
          </Typography>
        </Container>
      </Box>
      <FooterLayout/>
    </PortalLayout>
  );
};

export default Info;
