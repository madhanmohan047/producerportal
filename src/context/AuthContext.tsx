import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { transport } from "../api/utils/TransportService";
import type { AxiosResponse, AxiosRequestConfig } from "axios";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (screenHint?: 'login' | 'signup') => void;
  logout: () => void;
  authenticatedFetch: (url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse>;
  userRole: 'admin' | 'user' | 'guest';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    user, isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently 
  } = useAuth0();

  const AUTH_MODE = process.env.REACT_APP_AUTH_MODE || "JWT";
  const [userRole, setUserRole] = useState<'admin' | 'user' | 'guest'>('guest');

  useEffect(() => {
    if (AUTH_MODE === "JWT") {
      transport.setTokenProvider(async () => {
        try {
          return await getAccessTokenSilently();
        } catch (e) {
          return null;
        }
      });
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated && user) { 
      if (user.email?.includes("@admin.com") || user.email === "boss@company.com") {
        setUserRole('admin');
      } else {
        setUserRole('user');
      }
    } else {
      setUserRole('guest');
    }
  }, [isAuthenticated, user]);

  const login = (screenHint: 'login' | 'signup' = 'login') => {
    loginWithRedirect({ authorizationParams: { screen_hint: screenHint } });
  };

  const authenticatedFetch = async (url: string, options: AxiosRequestConfig = {}) => {
    return await transport.api({ url, ...options });
  };

  return (
    <AuthContext.Provider value={{ 
      user, isAuthenticated, isLoading, login,
      logout: () => logout({ logoutParams: { returnTo: window.location.origin } }), 
      authenticatedFetch, 
      userRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
