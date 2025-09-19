import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { API_ENDPOINTS, apiCall } from '../config/api';

interface User {
 id: string;
 email: string;
 name: string;
 avatar?: string;
 provider: 'google' | 'github' | 'email';
 linkedProviders?: {
  google?: {
   providerId: string;
   linkedAt: string;
  };
  github?: {
   providerId: string;
   linkedAt: string;
  };
 };
 wallets?: {
  ethereum?: {
   address: string;
   balance: string;
  };
  solana?: {
   address: string;
   balance: string;
  };
 };
 networkSettings?: {
  ethereum: string;
  solana: string;
 };
 createdAt: string;
}

interface AuthContextType {
 user: User | null;
 token: string | null;
 isAuthenticated: boolean;
 isLoading: boolean;
 login: (token: string, userData?: User) => void;
 logout: () => void;
 updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
 const context = useContext(AuthContext);
 if (context === undefined) {
  throw new Error('useAuth must be used within an AuthProvider');
 }
 return context;
};

interface AuthProviderProps {
 children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 // Check for existing token on mount
 useEffect(() => {
  const savedToken = localStorage.getItem('authToken');
  if (savedToken) {
   setToken(savedToken);
   fetchUserProfile(savedToken);
  } else {
   setIsLoading(false);
  }
 }, []);

 const fetchUserProfile = async (authToken: string) => {
  try {
   console.log('Fetching user profile with token:', authToken.substring(0, 20) + '...');
   const response = await apiCall(API_ENDPOINTS.PROFILE, {}, authToken);

   if (response.ok) {
    const userData = await response.json();
    console.log('User profile fetched successfully:', userData);
    setUser(userData);
   } else {
    console.error('Profile fetch failed with status:', response.status);
    // Token is invalid, clear it
    localStorage.removeItem('authToken');
    setToken(null);
   }
  } catch (error) {
   console.error('Error fetching user profile:', error);
   localStorage.removeItem('authToken');
   setToken(null);
  } finally {
   setIsLoading(false);
  }
 };

 const login = (authToken: string, userData?: User) => {
  console.log('AuthContext - Login called with token:', authToken.substring(0, 20) + '...');
  console.log('AuthContext - User data provided:', userData ? 'Yes' : 'No');
  console.log('AuthContext - User data:', userData);
  
  setToken(authToken);
  localStorage.setItem('authToken', authToken);
  
  if (userData) {
   console.log('AuthContext - Setting user data directly');
   setUser(userData);
  } else {
   console.log('AuthContext - Fetching user profile from API');
   fetchUserProfile(authToken);
  }
 };

 const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem('authToken');
 };

 const updateUser = (userData: User) => {
  setUser(userData);
 };

 const value: AuthContextType = {
  user,
  token,
  isAuthenticated: !!user && !!token,
  isLoading,
  login,
  logout,
  updateUser,
 };

 return (
  <AuthContext.Provider value={value}>
   {children}
  </AuthContext.Provider>
 );
}; 