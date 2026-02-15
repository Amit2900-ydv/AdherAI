import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export function NotificationPermissionModal({ isOpen, onAllow, onDeny }: NotificationPermissionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-sm mx-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl text-white mb-2" style={{ fontWeight: 700 }}>
                  Never Miss Your Medicine
                </h2>
                <p className="text-white/90 text-sm">
                  Enable notifications to get reminders even when the app is closed
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontWeight: 600 }}>Timely Reminders</p>
                      <p className="text-xs text-gray-600">Get alerts 15 minutes before each dose</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontWeight: 600 }}>Background Alerts</p>
                      <p className="text-xs text-gray-600">Receive notifications even when app is closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontWeight: 600 }}>Better Adherence</p>
                      <p className="text-xs text-gray-600">Never forget to take your medication</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={onAllow}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                  >
                    Allow Notifications
                  </Button>
                  <Button
                    onClick={onDeny}
                    variant="ghost"
                    className="w-full h-12 text-gray-600 hover:bg-gray-100"
                  >
                    Not Now
                  </Button>
                </div>

                {/* Info */}
                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-900">
                    <span style={{ fontWeight: 600 }}>Privacy:</span> Notifications are sent locally from your device. We never share your health data.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for managing notification permissions
export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const showPermissionModal = () => {
    if (permission === 'default') {
      setShowModal(true);
    }
  };

  const handleAllow = async () => {
    setShowModal(false);
    await requestPermission();
  };

  const handleDeny = () => {
    setShowModal(false);
  };

  return {
    permission,
    showModal,
    showPermissionModal,
    handleAllow,
    handleDeny,
    requestPermission
  };
}

// Function to schedule a local notification
export function scheduleLocalNotification(
  title: string,
  body: string,
  scheduledTime: Date,
  tag: string
) {
  // Check if running in supported environment
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.log('Notifications not supported in this environment');
    return;
  }

  if (Notification.permission !== 'granted') {
    console.log('Notifications not permitted');
    return;
  }

  const now = new Date();
  const delay = scheduledTime.getTime() - now.getTime();

  if (delay > 0) {
    setTimeout(() => {
      // Show notification
      try {
        const notification = new Notification(title, {
          body: body,
          tag: tag,
          requireInteraction: true,
          data: {
            dateOfArrival: Date.now(),
            primaryKey: tag
          }
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      } catch (error) {
        console.log('Failed to show notification:', error);
      }
    }, delay);
  }
}

// Function to show immediate notification
export function showImmediateNotification(
  title: string,
  body: string,
  tag: string = 'immediate'
) {
  // Check if running in supported environment
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.log('Notifications not supported in this environment');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.log('Notifications not permitted');
    return null;
  }

  try {
    const notification = new Notification(title, {
      body: body,
      tag: tag,
      requireInteraction: true,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: tag
      }
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  } catch (error) {
    console.log('Failed to show notification:', error);
    return null;
  }
}