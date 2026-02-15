import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Bell, X, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface ScheduledNotification {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  scheduledFor: Date;
  status: 'pending' | 'sent' | 'dismissed';
}

interface NotificationSchedulerProps {
  onScheduleNotification: (notification: Omit<ScheduledNotification, 'id' | 'status'>) => void;
}

export function NotificationScheduler({ onScheduleNotification }: NotificationSchedulerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState<ScheduledNotification[]>([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [minutes, setMinutes] = useState(1);

  const handleSchedule = () => {
    if (!medicineName || !dosage) {
      alert('Please fill all fields');
      return;
    }

    const scheduledTime = new Date(Date.now() + minutes * 60 * 1000);
    const notification: ScheduledNotification = {
      id: Date.now().toString(),
      medicineName,
      dosage,
      time: scheduledTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      scheduledFor: scheduledTime,
      status: 'pending'
    };

    setScheduledNotifications(prev => [...prev, notification]);

    // Schedule the actual notification
    onScheduleNotification({
      medicineName: notification.medicineName,
      dosage: notification.dosage,
      time: notification.time,
      scheduledFor: notification.scheduledFor
    });

    // Mark as sent after scheduled time
    setTimeout(() => {
      setScheduledNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, status: 'sent' } : n)
      );
    }, minutes * 60 * 1000);

    // Reset form
    setMedicineName('');
    setDosage('');
    setMinutes(1);
  };

  const handleDelete = (id: string) => {
    setScheduledNotifications(prev => prev.filter(n => n.id !== id));
  };

  const pendingCount = scheduledNotifications.filter(n => n.status === 'pending').length;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <Clock className="w-6 h-6 text-white" />
          {pendingCount > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs" style={{ fontWeight: 700 }}>
                {pendingCount}
              </span>
            </div>
          )}
        </div>
      </motion.button>

      {/* Scheduler Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg" style={{ fontWeight: 700 }}>
                        Schedule Notifications
                      </h3>
                      <p className="text-sm text-white/80">
                        Test background reminders
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {/* Schedule Form */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm mb-4" style={{ fontWeight: 600 }}>
                    Schedule New Reminder
                  </p>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Medicine name (e.g., Aspirin)"
                      value={medicineName}
                      onChange={(e) => setMedicineName(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <input
                      type="text"
                      placeholder="Dosage (e.g., 1 tablet)"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <div className="flex items-center gap-3">
                      <select
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="flex-1 px-4 py-3 bg-white rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={1}>In 1 minute</option>
                        <option value={2}>In 2 minutes</option>
                        <option value={5}>In 5 minutes</option>
                        <option value={10}>In 10 minutes</option>
                        <option value={15}>In 15 minutes</option>
                        <option value={30}>In 30 minutes</option>
                      </select>

                      <Button
                        onClick={handleSchedule}
                        className="px-6 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-lg"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-blue-900 mb-2" style={{ fontWeight: 600 }}>
                    💡 How it works:
                  </p>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Schedule notifications for future times</li>
                    <li>• Keep browser tab open (can be minimized)</li>
                    <li>• Browser notifications will appear at scheduled time</li>
                    <li>• Works even if you're on another tab</li>
                    <li>• For true background (app closed), use production with HTTPS</li>
                  </ul>
                </div>

                {/* Scheduled List */}
                <div>
                  <p className="text-sm mb-3" style={{ fontWeight: 600 }}>
                    Scheduled Reminders ({scheduledNotifications.length})
                  </p>

                  {scheduledNotifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No scheduled notifications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {scheduledNotifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border-2 ${notif.status === 'pending'
                              ? 'bg-purple-50 border-purple-200'
                              : 'bg-green-50 border-green-200'
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm mb-1" style={{ fontWeight: 600 }}>
                                {notif.medicineName}
                              </p>
                              <p className="text-xs text-gray-600 mb-2">
                                {notif.dosage} • {notif.time}
                              </p>
                              <div className="flex items-center gap-2">
                                {notif.status === 'pending' ? (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                                    <Clock className="w-3 h-3" />
                                    Pending
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                    <CheckCircle className="w-3 h-3" />
                                    Sent
                                  </span>
                                )}
                              </div>
                            </div>
                            {notif.status === 'pending' && (
                              <button
                                onClick={() => handleDelete(notif.id)}
                                className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
