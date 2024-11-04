import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
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
        theme='light'
      />
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
