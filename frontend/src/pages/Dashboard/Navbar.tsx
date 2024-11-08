import { Button } from '@mui/material';
import NavbarContainer from '../../components/Navbar';
import LogoutBtn from '../../components/LogoutBtn';

type NavbarProps = {
  onClickNewPresentation: React.MouseEventHandler<HTMLButtonElement>;
};

const Navbar = ({ onClickNewPresentation }: NavbarProps) => {
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
        New Presentation
      </Button>
      <LogoutBtn sx={{ ml: 2 }} />
    </NavbarContainer>
  );
};

export default Navbar;
