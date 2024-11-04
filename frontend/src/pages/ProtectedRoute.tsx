import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isLogin } = useAuth();

  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
