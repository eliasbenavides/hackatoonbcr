import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import { styled } from '@mui/system';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(180deg, rgba(162, 205, 250, 0.7) 0%, rgba(162, 205, 250, 0) 100%)',
}));

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
      
  return (
    <>
      <GradientAppBar position="static">
        <Toolbar>
          <Typography variant="h6">Team Discovery</Typography>
        </Toolbar>
      </GradientAppBar>
      <Box textAlign="center">
        <Typography variant="h4">Team Discovery</Typography>
      </Box>
      <Container component="main">
        <CssBaseline />
        {children}
      </Container>
      <footer>
        <Typography variant="body2" align="center">
          Made with ❤️ by BCR Horizonte
        </Typography>
      </footer>
    </>
  );
};

export default Layout;
