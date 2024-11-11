import { createBrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Presentation from './pages/Presentation';
import ProtectedRoute from './ProtectedRoute';

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
            <Presentation preview={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: '/preview-presentations/:id/:slideIdx',
        element: (
          <ProtectedRoute>
            <Presentation preview={true} />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
