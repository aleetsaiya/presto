import { StoreProvider } from './hooks/useStore';
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

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

export default ProtectedRoute;
