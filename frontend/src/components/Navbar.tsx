import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  /** Render this navbar when user haven't logged in */
  const renderBeforeLoginNavbar = () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'inherit', boxShadow: 'none' }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" component={RouterLink} sx={{ textDecoration: 'none' }}>
              Presto
            </Link>
          </Typography>
          <Button onClick={() => navigate('login')}>Login</Button>
          <Button sx={{ ml: 2 }} onClick={() => navigate('signup')}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );

  /** Render this navbar when user have logged in */
  const renderAfterLoginNavbar = () => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={auth.isLogin() ? 'dashboard' : '/'}
              component={RouterLink}
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Presto
            </Link>
          </Typography>
          <Button color="inherit" onClick={() => navigate('dashboard')}>
            Home
          </Button>
          <Button
            color="info"
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );

  return auth.isLogin() ? renderAfterLoginNavbar() : renderBeforeLoginNavbar();
};

export default NavBar;
