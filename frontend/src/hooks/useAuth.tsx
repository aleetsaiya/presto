import { useContext, createContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { req } from '../api';

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  isLogin: () => boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null);

  /** Return true if user have logged in */
  const isLogin = () => {
    return token !== null;
  };

  const logout = useCallback(() => {
    setToken(null);
  }, [setToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      return req
        .post('/admin/auth/login', {
          email,
          password,
        })
        .then((res) => {
          const token = res.data.token;
          setToken(token);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    [setToken, token]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      return req
        .post('/admin/auth/register', {
          name,
          email,
          password,
        })
        .then((res) => {
          const token = res.data.token;
          setToken(token);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    []
  );

  const value = useMemo(
    () => ({
      token,
      setToken,
      isLogin,
      signup,
      login,
      logout,
    }),
    [token, setToken, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
