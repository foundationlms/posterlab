export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  plan: 'free' | 'standard' | 'pro';
  postersCreated: number;
  isSubscribed: boolean;
  status?: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
  organization?: string;
}