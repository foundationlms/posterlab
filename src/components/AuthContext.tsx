import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate admin check based on email
    const isAdmin = email.includes('admin');
    
    setUser({
      id: '1',
      name: 'Demo User',
      email: email,
      role: isAdmin ? 'admin' : 'user',
      isSubscribed: false
    });
  };

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}