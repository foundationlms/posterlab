import { APIKey } from '../types/api';
import { saveNotification } from './notificationStorage';

export const saveAPIKey = async (apiKey: APIKey): Promise<void> => {
  try {
    const storedKeys = localStorage.getItem('apiKeys');
    const keys: APIKey[] = storedKeys ? JSON.parse(storedKeys) : [];
    
    const existingIndex = keys.findIndex(k => k.id === apiKey.id);
    
    if (existingIndex >= 0) {
      keys[existingIndex] = apiKey;
    } else {
      keys.push(apiKey);
      
      // Notify admin of new API key creation
      saveNotification({
        id: Math.random().toString(36).substr(2, 9),
        type: 'api_key_created',
        title: 'New API Key Created',
        message: `New API key created for ${apiKey.service}`,
        timestamp: new Date().toISOString(),
        read: false,
        apiKeyId: apiKey.id,
        forAdmin: true
      });
    }
    
    localStorage.setItem('apiKeys', JSON.stringify(keys));
  } catch (error) {
    console.error('Failed to save API key:', error);
    throw new Error('Failed to save API key');
  }
};

// Check API key expiration periodically
export const checkAPIKeyExpiration = () => {
  const storedKeys = localStorage.getItem('apiKeys');
  if (!storedKeys) return;

  const keys: APIKey[] = JSON.parse(storedKeys);
  const now = new Date();

  keys.forEach(key => {
    if (key.lastUsed) {
      const lastUsed = new Date(key.lastUsed);
      const daysSinceLastUse = Math.floor((now.getTime() - lastUsed.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceLastUse >= 30 && key.status === 'active') {
        // Notify admin of API key expiration
        saveNotification({
          id: Math.random().toString(36).substr(2, 9),
          type: 'api_key_expired',
          title: 'API Key Expiring',
          message: `API key ${key.name} hasn't been used in 30 days`,
          timestamp: new Date().toISOString(),
          read: false,
          apiKeyId: key.id,
          forAdmin: true
        });
      }
    }
  });
};