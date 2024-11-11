import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AuthContext } from './useAuth';
import {
  login as loginApi,
  signup as signupApi,
  logout as logoutApi,
} from '../api';

type AuthProviderProps = {
  children?: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null);

  /** Return true if user have logged in */
  const isLogin = useCallback(() => {
    return token !== null;
  }, [token]);

  const logout = useCallback(async () => {
    return logoutApi()
      .then(() => {
        setToken(null);
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }, [setToken]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      return loginApi(email, password)
        .then((res) => {
          setToken(res.data.token);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    [setToken]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      return signupApi(name, email, password)
        .then((res) => {
          setToken(res.data.token);
          return Promise.resolve();
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    [setToken]
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
    [token, setToken, signup, login, logout, isLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
