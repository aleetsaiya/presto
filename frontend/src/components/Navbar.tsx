import { Link, Typography, Toolbar, AppBar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material';

type NavbarProps = {
  children?: React.ReactNode;
  brandElement?: React.ReactNode;
  theme?: 'light' | 'dark';
  sx?: SxProps<Theme>;
  normalFlow?: boolean;
};

const NavBar = ({
  theme = 'light',
  sx,
  brandElement,
  children,
  normalFlow = true,
}: NavbarProps) => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          backgroundColor: theme === 'light' ? 'inherit' : undefined,
          ...sx,
        }}
      >
        <Toolbar>
          {brandElement || (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                component={RouterLink}
                sx={{
                  textDecoration: 'none',
                  color: theme === 'light' ? undefined : 'inherit',
                }}
              >
                Presto
              </Link>
            </Typography>
          )}
          {children}
        </Toolbar>
      </AppBar>
      {/* Add toolbar again to make fixed navbar impact the document flow */}
      {normalFlow && <Toolbar />}
    </>
  );
};

export default NavBar;
