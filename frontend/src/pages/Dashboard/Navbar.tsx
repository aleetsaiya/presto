import Button from '@mui/material/Button';
import NavbarContainer from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

type NavbarProps = {
  onClickNewPresentation: React.MouseEventHandler<HTMLButtonElement>;
};

const Navbar = ({ onClickNewPresentation }: NavbarProps) => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    toast.success('You have successfully log out');
  };

  return (
    <NavbarContainer
      theme="dark"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Button
        color="info"
        variant="contained"
        onClick={onClickNewPresentation}
        sx={{ textTransform: 'none' }}
      >
        New presentation
      </Button>
      <Button
        color="inherit"
        onClick={handleLogout}
        sx={{ ml: 2, textTransform: 'none' }}
      >
        Logout
      </Button>
    </NavbarContainer>
  );
};

export default Navbar;
