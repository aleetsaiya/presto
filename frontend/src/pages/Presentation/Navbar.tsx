import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import NavbarContainer from '../../components/Navbar';
import LogoutBtn from '../../components/LogoutBtn';
import { useTheme } from '@mui/material';

type NavbarProps = {
  onDeletePresentation: React.MouseEventHandler<HTMLButtonElement>;
  handleShowSidebar: () => void;
};

const Navbar = ({ onDeletePresentation, handleShowSidebar }: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleClickControlsBtn = () => {
    handleShowSidebar();
    handleCloseMenu();
  };

  const BackLink = (
    <Box
      sx={{
        display: 'fex',
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        onClick={() => navigate('/dashboard')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 0.8,
          cursor: 'pointer',
          '&:hover': {
            color: theme.palette.nord.white[3],
          },
        }}
      >
        <ArrowBackIcon fontSize="small" color="inherit" />
        Back
      </Typography>
    </Box>
  );

  const controlButtons = (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={onDeletePresentation}
        sx={{
          textTransform: 'none',
          borderRadius: {
            xs: 0,
            md: 1,
          },
        }}
      >
        Delete Presentation
      </Button>
      <Button
        color="inherit"
        onClick={handleClickControlsBtn}
        sx={{
          textTransform: 'none',
          display: {
            xs: 'block',
            md: 'none',
          },
          ml: 0,
          mt: {
            xs: 1,
            md: 0,
          },
        }}
      >
        Controls
      </Button>
      <LogoutBtn
        sx={{
          ml: {
            xs: 0,
            md: 2,
          },
          mt: {
            xs: 1,
            md: 0,
          },
        }}
      />
    </>
  );

  return (
    <>
      <NavbarContainer
        brandElement={BackLink}
        theme="dark"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <IconButton
          onClick={handleShowMenu}
          color="inherit"
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {controlButtons}
        </Box>
        <Drawer anchor="right" open={showMenu} onClose={handleCloseMenu}>
          <Toolbar />
          {controlButtons}
        </Drawer>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
