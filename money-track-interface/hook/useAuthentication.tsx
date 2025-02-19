'use client';
import React, { createContext, useContext, useState } from 'react';

export type Authentication = {
  email?: string;
  username?: string;
  image?: string;
  qr?: string;
  balance?: number;
  password?: string;
};

export type AuthContextValue = {
  authentication?: Authentication;
  setAuthentication: (e?: Authentication) => void;
};

const AuthenticationState = createContext<AuthContextValue>({
  authentication: undefined,
  setAuthentication: () => {},
});

export const useAuthentication = () => {
  return useContext(AuthenticationState);
};

const AuthenticationProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [authentication, setAuthentication] = useState<Authentication | undefined>();

  return (
    <AuthenticationState.Provider value={{ authentication, setAuthentication }}>
      {children}
    </AuthenticationState.Provider>
  );
};
export default AuthenticationProvider;
