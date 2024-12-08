export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  category: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  assignedTo?: {
    name: string;
    email: string;
    avatar?: string;
  };
  created: string;
  lastUpdated: string;
  messages: {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
  }[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  views: number;
  lastUpdated: string;
}