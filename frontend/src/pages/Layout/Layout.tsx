import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '@mui/material';

const Layout = () => {
  const theme = useTheme();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        stacked
        theme="light"
        toastStyle={{
          backgroundColor: theme.palette.nord.white[0],
        }}
      />
      <Outlet />
    </>
  );
};

export default Layout;
