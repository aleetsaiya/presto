import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AppContainer = () => {
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
      />
      <Outlet />
    </>
  );
};

export default AppContainer;
