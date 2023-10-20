import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const GradientAppBar = styled(AppBar)(() => ({
  background:
    "linear-gradient(180deg, rgba(162, 205, 250, 0.7) 0%, rgba(162, 205, 250, 0) 100%)",
  boxShadow: "none",
}));

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <GradientAppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            style={{ borderRadius: 0 }}
            disableRipple
          >
            <Avatar
              src="/BCR-LOGO-DARK.png"
              alt="Logo"
              sx={{ marginRight: 2, borderRadius: 0, minWidth: "91px" }}
            />
          </IconButton>
        </Toolbar>
      </GradientAppBar>
      <Container
        component="main"
        sx={{
          flex: 1,
          maxWidth: "800px",
          position: "relative",
          flexDirection: "column",
          display: "flex",
        }}
        maxWidth="800px"
      >
        <CssBaseline />
        {children}
      </Container>
      <footer
        style={{
          minHeight: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" align="center">
          Made with ❤️ by BCR Horizonte Dev Team
        </Typography>
      </footer>
    </Container>
  );
};

export default Layout;
