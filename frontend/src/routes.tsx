import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Presentation from './pages/Presentation';
import { StoreProvider } from './hooks/useStore';
import { useAuth } from './hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLogin } = useAuth();

  return isLogin() ? (
    // Provide store context only after user login
    <StoreProvider>{children}</StoreProvider>
  ) : (
    <Navigate to="/" />
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContainer />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '*', element: <NotFound /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/presentations/:id/:slideIdx',
        element: (
          <ProtectedRoute>
            <Presentation />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// {path: '*', element: <NotFound /> },
