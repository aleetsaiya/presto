import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material';

type NavbarProps = {
  children?: React.ReactNode;
  theme?: 'light' | 'dark';
  sx?: SxProps<Theme>;
};

const NavBar = ({ theme = 'light', sx, children }: NavbarProps) => {
  const auth = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          backgroundColor: theme === 'light' ? 'inherit' : undefined,
          ...sx,
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to={auth.isLogin() ? '/dashboard' : '/'}
              component={RouterLink}
              sx={{
                textDecoration: 'none',
                color: theme === 'light' ? undefined : 'inherit',
              }}
            >
              Presto
            </Link>
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
      {/* Add toolbar again to make fixed navbar impact the document flow */}
      <Toolbar /> 
    </Box>
  );
};

export default NavBar;
