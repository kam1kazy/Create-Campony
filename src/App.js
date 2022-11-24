import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import Navigations from "./components/Navigations";

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          sx={{ textTransform: "uppercase", marginTop: "40px" }}
        >
          Мои компании
        </Typography>

        <Navigations />
      </Container>
    </>
  );
}

export default App;
