import { Button, SxProps, Theme } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { useStore } from '../hooks/useStore';

type LogoutBtnProps = {
  sx?: SxProps<Theme>;
};

const LogoutBtn = ({ sx }: LogoutBtnProps) => {
  const auth = useAuth();
  const store = useStore();

  const handleLogout = async () => {
    try {
      await auth.logout();
      store.clearLocalStore();
      toast.success('You have successfully log out');
    } catch (err) {
      toast.error('Failed to logout');
    }
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{ ml: 2, textTransform: 'none', ...sx }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
