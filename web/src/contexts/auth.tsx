import { AxiosInstance } from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import privateApi from '../services/privateApi';
import publicApi from '../services/publicApi';

export interface AuthContextData {
  signed: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
  api: AxiosInstance
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  const [signed, setSigned] = useState(false);

  const api = useCallback(privateApi(signOut), [])

  useEffect(() => {
    const storageUserId = localStorage.getItem('@ProffyAuth:user_id');
    const storageToken = localStorage.getItem('@ProffyAuth:token');

    if (storageToken && storageUserId) {
      setSigned(true)
    }
  }, [setSigned])

  async function signIn(email: string, password: string) {
    const response = await publicApi.post('/autenticate', { email, password });

    const { user, accessToken, refreshToken } = response.data;

    localStorage.setItem('@ProffyAuth:user_id', user.id);
    localStorage.setItem('@ProffyAuth:token', accessToken);
    localStorage.setItem('@ProffyAuth:refreshToken', refreshToken);

    setSigned(true)
  }

  function signOut() {
    setSigned(false)

    localStorage.removeItem('@ProffyAuth:user_id');
    localStorage.removeItem('@ProffyAuth:token');
    localStorage.removeItem('@ProffyAuth:refreshToken');
  }

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut, api }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

