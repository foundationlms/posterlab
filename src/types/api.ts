export interface APIKey {
  id: string;
  name: string;
  key: string;
  service: 'openai' | 'flux' | 'other';
  status: 'active' | 'inactive';
  lastUsed?: string;
}