import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";

const GradientAppBar = styled(AppBar)(() => ({
  background:
    "linear-gradient(180deg, rgba(162, 205, 250, 0.7) 0%, rgba(162, 205, 250, 0) 100%)",
  boxShadow: "none",
}));

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <GradientAppBar position="static">
        <Toolbar>
          <Avatar
            src="/BCR-LOGO-DARK.png"
            alt="Logo"
            sx={{ marginRight: 2, borderRadius: 0, minWidth: "91px" }}
          />
          <Typography variant="h5" color="black">
            Horizonte
          </Typography>
        </Toolbar>
      </GradientAppBar>
      <Container component="main" sx={{ height: "87vh" }}>
        <Box alignItems="flex-start">
          <Typography variant="h6">Team Discovery</Typography>
        </Box>
        <CssBaseline />
        {children}
      </Container>
      <footer>
        <Typography variant="body2" align="center">
          Made with ❤️ by BCR Horizonte Dev Team
        </Typography>
      </footer>
    </>
  );
};

export default Layout;
