import { createContext, ReactNode, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '@/services/apiClient';

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  loginUser: (credentials: LoginProps) => Promise<void>;
  logoutUser: () => void;
};

type UserProps = {
  id: string;
  username: string;
  email: string;
};

type LoginProps = {
  username: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export function logoutUser() {
  try {
    destroyCookie(undefined, '@installationmanagement.token');
    Router.push('/');
  } catch (err) {
    console.log(err);
  }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function loginUser({ username, password }: LoginProps) {
    try {
      const res = await api.post('/login', {
        username,
        password,
      });

      const { id, email, token } = res.data;

      setCookie(undefined, '@installationmanagement.token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      setUser({
        id,
        username,
        email,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>{children}</AuthContext.Provider>
  );
}
