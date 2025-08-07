import React from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { Bell, Check, Trash2 } from 'lucide-react';

const Notifications: React.FC = () => {
  const { notifications, markAsRead, clearAll } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-8 w-8 text-indigo-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              {notifications.filter(n => !n.read).length} unread notifications
            </p>
          </div>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No notifications yet</p>
            <p className="text-gray-400">You'll see important updates here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                notification.read 
                  ? 'bg-white border-gray-200' 
                  : getNotificationColor(notification.type)
              } ${!notification.read ? 'shadow-sm' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{getNotificationIcon(notification.type)}</span>
                    <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="ml-2 w-2 h-2 bg-indigo-600 rounded-full"></span>
                    )}
                  </div>
                  <p className={`ml-11 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <p className="ml-11 text-xs text-gray-400 mt-2">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="flex items-center px-3 py-1 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Demo Notifications Button */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Demo Notifications</h3>
        <p className="text-gray-600 mb-4">Click the buttons below to see different types of notifications:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              const { addNotification } = require('../contexts/NotificationContext');
              // This would normally be handled by the notification context
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Info Notification
          </button>
          <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
            Success Notification
          </button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors">
            Warning Notification
          </button>
          <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors">
            Error Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;