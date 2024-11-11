import Navbar from './Navbar';
import { useAuth } from '../../hooks/useAuth';
import { StoreProvider } from '../../hooks/useStore';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Container, Typography, Box } from '@mui/material';

const Home = () => {
  const auth = useAuth();

  const HomeComponents = (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 7,
        }}
      >
        <Typography variant="h4" textAlign="center">
          Welcome to Presto!
        </Typography>
        <Typography variant="h6" textAlign="center" mt={2}>
          {/* eslint-disable-next-line */}
          Haven't logged in?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Link
            to="/login"
            component={RouterLink}
            sx={{ textDecoration: 'none' }}
          >
            Login
          </Link>
          <Link
            to="signup"
            component={RouterLink}
            sx={{ textDecoration: 'none' }}
          >
            Signup
          </Link>
        </Box>
      </Container>
    </>
  );

  if (auth.isLogin()) {
    return <StoreProvider>{HomeComponents}</StoreProvider>;
  } else {
    return HomeComponents;
  }
};

export default Home;
