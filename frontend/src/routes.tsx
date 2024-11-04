import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './pages/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

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
