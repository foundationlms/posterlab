import { Notification } from '../types/notification';

export const saveNotification = (notification: Notification): void => {
  try {
    const storedNotifications = localStorage.getItem('notifications');
    const notifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : [];
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Failed to save notification:', error);
  }
};

export const getNotifications = (): Notification[] => {
  try {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('Failed to get notifications:', error);
    return [];
  }
};

export const markNotificationAsRead = (notificationId: string): void => {
  try {
    const storedNotifications = localStorage.getItem('notifications');
    const notifications: Notification[] = storedNotifications ? JSON.parse(storedNotifications) : [];
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Failed to update notification:', error);
  }
};

export const clearNotifications = (): void => {
  try {
    localStorage.setItem('notifications', JSON.stringify([]));
  } catch (error) {
    console.error('Failed to clear notifications:', error);
  }
};