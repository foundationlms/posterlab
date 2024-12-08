import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/user';
import { saveNotification } from '../utils/notificationStorage';

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, plan?: string) => Promise<void>;
  signOut: () => void;
  updatePlan: (plan: 'free' | 'standard' | 'pro') => Promise<void>;
  updateProfile: (updatedUser: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const signIn = async (email: string, password: string, plan: string = 'free') => {
    const isAdmin = email.includes('admin');
    
    const newUser = {
      id: '1',
      name: 'Demo User',
      email: email,
      role: isAdmin ? 'admin' : 'user',
      plan: plan as 'free' | 'standard' | 'pro',
      isSubscribed: plan !== 'free',
      postersCreated: 0,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      organization: ''
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    // Notify admin of new user registration
    if (!isAdmin) {
      saveNotification({
        id: Math.random().toString(36).substr(2, 9),
        type: 'user_registered',
        title: 'New User Registration',
        message: `New user registered: ${email}`,
        timestamp: new Date().toISOString(),
        read: false,
        forAdmin: true
      });
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updatePlan = async (newPlan: 'free' | 'standard' | 'pro') => {
    if (!user) return;

    const updatedUser = {
      ...user,
      plan: newPlan,
      isSubscribed: newPlan !== 'free'
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Notify admin of plan upgrade
    if (newPlan !== 'free') {
      saveNotification({
        id: Math.random().toString(36).substr(2, 9),
        type: 'plan_upgraded',
        title: 'Plan Upgrade',
        message: `User ${user.email} upgraded to ${newPlan} plan`,
        timestamp: new Date().toISOString(),
        read: false,
        forAdmin: true
      });
    }

    // Notify user of successful upgrade
    saveNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: 'plan_upgraded',
      title: 'Plan Updated',
      message: `Your plan has been updated to ${newPlan}`,
      timestamp: new Date().toISOString(),
      read: false,
      forUser: user.email
    });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updates,
      lastModified: new Date().toISOString()
    };

    // Update in state and localStorage
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Create notification for profile update
    saveNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: 'profile_updated',
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully',
      timestamp: new Date().toISOString(),
      read: false,
      forUser: user.email
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updatePlan, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}