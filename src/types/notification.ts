export interface Notification {
  id: string;
  type: 'ticket_update' | 'ticket_resolved' | 'ticket_created' | 'article_published' | 
        'poster_created' | 'poster_shared' | 'plan_upgraded' | 'plan_expired' | 
        'api_key_created' | 'api_key_expired';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  ticketId?: string;
  articleId?: string;
  posterId?: string;
  apiKeyId?: string;
  forUser?: string;
  forAdmin?: boolean;
}