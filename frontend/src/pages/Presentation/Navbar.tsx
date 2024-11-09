import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavbarContainer from '../../components/Navbar';
import LogoutBtn from '../../components/LogoutBtn';
import { useTheme } from '@mui/material';

type NavbarProps = {
  onDeletePresentation: React.MouseEventHandler<HTMLButtonElement>;
};

const Navbar = ({ onDeletePresentation }: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

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

  return (
    <NavbarContainer
      brandElement={BackLink}
      theme="dark"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Button
        color="error"
        variant="contained"
        onClick={onDeletePresentation}
        sx={{ textTransform: 'none' }}
      >
        Delete Presentation
      </Button>
      <LogoutBtn sx={{ ml: 2 }} />
    </NavbarContainer>
  );
};

export default Navbar;
