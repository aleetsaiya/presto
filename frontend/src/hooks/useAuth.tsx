import { useContext, createContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

type AuthContextType = {
  isLogin: () => boolean;
  getToken: () => string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null);

  /** Return true if user have logged in */
  const isLogin = () => token !== null;

  /** Return current user token */
  const getToken = useCallback(() => token, []);

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const login = useCallback((email: string, password: string) => {
    // TODO
    console.log('login', email, password);
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    // TODO
    console.log('signup', name, email, password);
  }, []);

  const value = useMemo(
    () => ({
      isLogin,
      getToken,
      signup,
      login,
      logout,
    }),
    [token, getToken, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
