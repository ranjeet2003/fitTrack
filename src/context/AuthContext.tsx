import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string; username: string } | null;
  login: (userId: string, username: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ id: string; email: string; username: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('Error logging out:', error);
    }
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await API.get('/auth/status');
      setIsAuthenticated(true);
      setUser(data);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = (userId: string, username: string) => {
    setIsAuthenticated(true);
    setUser({ id: userId, username, email: '' }); // Email is not available from login response
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
