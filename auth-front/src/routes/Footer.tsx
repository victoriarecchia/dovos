
import { Typography, Container } from "@mui/material";
import PortalLayout from "../layout/PortalLayout";

const Info = () => {
  return (
    <PortalLayout>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" gutterBottom color="black">
            DOVOS
          </Typography>

          <Typography  paragraph color="black">
            Politica de privacidad          </Typography>
        </Container>
    </PortalLayout>
  );
};

export default Info;
