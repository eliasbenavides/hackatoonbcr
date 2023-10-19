import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import BcrLogo from "../assets/BCR-LOGO.png";
import "./../styles/home.css";
const Home = () => {
  return (
    <Box className="content">
      <Box sx={{ height: "100px" }}>
        <img src={BcrLogo} alt="img" width={"350px"} height={"auto"} />
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontSize: "22px",
            fontWeight: "600",
          }}
        >
          Hackatoon BCR
        </Typography>
      </Box>
      <Box>
        <Box className={"button-box"}>
          <Link to={"/create-user"}>
            <Button variant="contained" color="primary" size="large">
              Crear Usuario
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to={"search-users"}>
            <Button variant="contained" color="primary" size="large">
              Buscar Usuario
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
