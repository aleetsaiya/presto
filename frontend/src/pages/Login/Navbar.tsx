import Button from '@mui/material/Button';
import NavbarContainer from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarContainer>
      <Button sx={{ textTransform: 'none' }} onClick={() => navigate('/login')}>
        Login
      </Button>
      <Button
        sx={{ ml: 2, textTransform: 'none' }}
        onClick={() => navigate('/signup')}
      >
        Signup
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
