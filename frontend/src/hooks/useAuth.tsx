import { useContext, createContext } from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  isLogin: () => boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuth = () => useContext(AuthContext);
