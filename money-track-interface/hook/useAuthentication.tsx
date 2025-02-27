'use client';
import React, { createContext, useContext, useState } from 'react';

export type Authentication = {
  id?: number;
  email?: string;
  username?: string;
  image?: string;
  qr?: string;
  balance?: number;
  password?: string;
  role?: string;
};

export type AuthContextValue = {
  authentication?: Authentication;
  setAuthentication: (e?: Authentication) => void;
  setToken: (token: string) => void;
  getToken: () => void;
  removeToken: () => void;
};

const AuthenticationState = createContext<AuthContextValue>({
  authentication: undefined,
  setAuthentication: () => {},
  setToken: () => {},
  getToken: () => {},
  removeToken: () => {},
});

export const useAuthentication = () => {
  return useContext(AuthenticationState);
};

const AuthenticationProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [authentication, setAuthentication] = useState<Authentication | undefined>({
    role: 'MEMBER',
  });
  const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
  };
  const getToken = () => {
    return sessionStorage.getItem('token');
  };
  const removeToken = () => {
    sessionStorage.removeItem('token');
  };
  return (
    <AuthenticationState.Provider
      value={{ authentication, setAuthentication, setToken, removeToken, getToken }}
    >
      {children}
    </AuthenticationState.Provider>
  );
};
export default AuthenticationProvider;
