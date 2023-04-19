import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { logoutUser } from '@/contexts/AuthContext';

export function apiConfiguration(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${cookies['@installationmanagement.token']}`,
    },
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (err: AxiosError) => {
      if (err.response.status === 401) {
        if (typeof window !== undefined) {
          logoutUser();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(err);
    }
  );

  return api;
}
