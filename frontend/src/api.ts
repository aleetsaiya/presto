import backendConfig from '../backend.config.json';
import axios from 'axios';

export const req = axios.create({
  baseURL: `http://localhost:${backendConfig['BACKEND_PORT']}`,
});
