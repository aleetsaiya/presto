import backendConfig from '../backend.config.json';
import { Store } from './hooks/useStore';
import axios from 'axios';

const getToken = () => JSON.parse(localStorage.getItem('token') || '');

export const req = axios.create({
  baseURL: `http://localhost:${backendConfig['BACKEND_PORT']}`,
});

export const login = (email: string, password: string) =>
  req.post('/admin/auth/login', {
    email,
    password,
  });

export const logout = () =>
  req.post('/admin/auth/logout', null, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const signup = (name: string, email: string, password: string) =>
  req.post('/admin/auth/register', {
    name,
    email,
    password,
  });

export const getStore = () =>
  req.get('/store', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const setStore = (store: Store) => {
  console.log('put store', store);
  return req.put(
    '/store',
    {
      store,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
