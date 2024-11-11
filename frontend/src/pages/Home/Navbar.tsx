import { Button, useTheme } from '@mui/material';
import NavbarContainer from '../../components/Navbar';
import LogoutBtn from '../../components/LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';


const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const theme = useTheme();

  return (
    <NavbarContainer>
      {auth.isLogin() ? (
        <>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <LogoutBtn sx={{ ml: 2, color: theme.palette.nord.black[2] }} />
        </>
      ) : (
        <>
          <Button
            sx={{ textTransform: 'none' }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            sx={{ ml: 2, textTransform: 'none' }}
            onClick={() => navigate('/signup')}
          >
            Signup
          </Button>
        </>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
