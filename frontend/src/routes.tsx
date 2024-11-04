import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = () => {
  const { isLogin } = useAuth();

  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/dashboard',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
