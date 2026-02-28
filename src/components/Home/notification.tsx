'use client';

import { useStore } from '@/src/context/store_context';
import { useEffect } from 'react';

export default function Notification() {
  const { notification, setNotification } = useStore();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, (notification.duration || 3000));
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  if (!notification) return null;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`notification ${notification.type}`}>
      <span className="text-lg font-bold">{icons[notification.type]}</span>
      <p className="font-medium">{notification.message}</p>
    </div>
  );
}