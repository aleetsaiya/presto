import Button from '@mui/material/Button';
import NavbarContainer from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <NavbarContainer theme="dark">
      <Button color="inherit" onClick={() => navigate('/dashboard')}>
        Home
      </Button>
      <Button
        color="info"
        variant="contained"
        sx={{ ml: 2 }}
        onClick={() => auth.logout()}
      >
        Logout
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
