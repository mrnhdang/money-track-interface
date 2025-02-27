'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();
  const router = useRouter();
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
    sessionStorage.removeItem('id');
  };

  useEffect(() => {
    const token = getToken();
    if (!token && pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    } else router.push(pathname);
  }, [authentication?.id, pathname, router]);

  return (
    <AuthenticationState.Provider
      value={{ authentication, setAuthentication, setToken, removeToken, getToken }}
    >
      {children}
    </AuthenticationState.Provider>
  );
};
export default AuthenticationProvider;
