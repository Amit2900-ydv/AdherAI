import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Calendar,
  Pill,
  X
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useLanguage } from '@/app/context/LanguageContext';

interface ScheduledNotification {
  id: string;
  medicineName: string;
  dosage: string;
  time: string;
  scheduledFor: Date;
  status: 'pending' | 'sent' | 'dismissed';
}

interface NotificationData {
  id: string;
  medicineName: string;
  dosage: string;
  scheduledTime: string;
  color: string;
  instructions?: string;
}

interface NotificationsScreenProps {
  currentNotifications: NotificationData[];
  onScheduleNotification: (notification: {
    medicineName: string;
    dosage: string;
    time: string;
    scheduledFor: Date;
  }) => void;
  onDismissNotification: (id: string) => void;
  onMarkTaken: (id: string) => void;
  onSnooze: (id: string) => void;
  onAddTestNotifications: () => void;
}

export function NotificationsScreen({
  currentNotifications,
  onScheduleNotification,
  onDismissNotification,
  onMarkTaken,
  onSnooze,
  onAddTestNotifications
}: NotificationsScreenProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled'>('active');
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduledNotifications, setScheduledNotifications] = useState<ScheduledNotification[]>([]);

  // Form state
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [minutes, setMinutes] = useState(1);

  const handleSchedule = () => {
    if (!medicineName || !dosage) {
      alert(t('notif.fill_fields'));
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

    // Call parent handler
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
    setShowScheduleForm(false);
  };

  const handleDelete = (id: string) => {
    setScheduledNotifications(prev => prev.filter(n => n.id !== id));
  };

  const pendingCount = scheduledNotifications.filter(n => n.status === 'pending').length;

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl mb-1" style={{ fontWeight: 700 }}>
              {t('notif.title')}
            </h1>
            <p className="text-white/80 text-sm">
              {t('notif.subtitle')}
            </p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${activeTab === 'active'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm" style={{ fontWeight: 600 }}>
                {t('notif.active')} ({currentNotifications.length})
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${activeTab === 'scheduled'
              ? 'bg-white text-purple-600 shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm" style={{ fontWeight: 600 }}>
                {t('notif.scheduled')} ({pendingCount})
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'active' ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Quick Actions */}
              <div className="mb-6">
                <p className="text-sm mb-3" style={{ fontWeight: 600 }}>
                  {t('notif.quick_actions')}
                </p>
                <button
                  onClick={onAddTestNotifications}
                  className="w-full p-4 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Bell className="w-5 h-5" />
                    <span style={{ fontWeight: 600 }}>{t('notif.add_test')}</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">
                    {t('notif.sample_notifs')}
                  </p>
                </button>
              </div>

              {/* Active Notifications */}
              <div>
                <p className="text-sm mb-3" style={{ fontWeight: 600 }}>
                  {t('notif.active_reminders')}
                </p>

                {currentNotifications.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2" style={{ fontWeight: 600 }}>
                      {t('notif.no_active')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t('notif.all_caught_up')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentNotifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-4 shadow-sm"
                      >
                        <div className="flex gap-3">
                          {/* Medicine Icon */}
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: notif.color }}
                          >
                            <Pill className="w-6 h-6 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm mb-1" style={{ fontWeight: 600 }}>
                              {notif.medicineName}
                            </p>
                            <p className="text-xs text-gray-600 mb-2">
                              {notif.dosage} • {notif.scheduledTime}
                            </p>
                            {notif.instructions && (
                              <p className="text-xs text-gray-500 mb-3">
                                {notif.instructions}
                              </p>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => onMarkTaken(notif.id)}
                                className="flex-1 py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs transition-colors"
                                style={{ fontWeight: 600 }}
                              >
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                {t('notif.mark_taken')}
                              </button>
                              <button
                                onClick={() => onSnooze(notif.id)}
                                className="flex-1 py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs transition-colors"
                                style={{ fontWeight: 600 }}
                              >
                                <Clock className="w-3 h-3 inline mr-1" />
                                {t('notif.snooze')}
                              </button>
                              <button
                                onClick={() => onDismissNotification(notif.id)}
                                className="py-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scheduled"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Schedule New Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowScheduleForm(!showScheduleForm)}
                  className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-lg transition-all"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Plus className="w-5 h-5" />
                    <span style={{ fontWeight: 600 }}>{t('notif.schedule_new')}</span>
                  </div>
                </button>
              </div>

              {/* Schedule Form */}
              <AnimatePresence>
                {showScheduleForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm" style={{ fontWeight: 600 }}>
                          {t('notif.new_reminder')}
                        </p>
                        <button
                          onClick={() => setShowScheduleForm(false)}
                          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">
                            {t('notif.med_name')}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Aspirin"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">
                            {t('kb.instructions')}
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., 1 tablet"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-gray-600 mb-1 block">
                            {t('notif.remind_in')}
                          </label>
                          <select
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                            className="w-full px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                          >
                            <option value={1}>{t('notif.min_1')}</option>
                            <option value={2}>{t('notif.min_2')}</option>
                            <option value={5}>{t('notif.min_5')}</option>
                            <option value={10}>{t('notif.min_10')}</option>
                            <option value={15}>{t('notif.min_15')}</option>
                            <option value={30}>{t('notif.min_30')}</option>
                            <option value={60}>{t('notif.hour_1')}</option>
                          </select>
                        </div>

                        <Button
                          onClick={handleSchedule}
                          className="w-full h-11 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl shadow-md"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {t('notif.schedule_new')}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 mb-1" style={{ fontWeight: 600 }}>
                      {t('notif.how_it_works')}
                    </p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• {t('notif.how_step1')}</li>
                      <li>• {t('notif.how_step2')}</li>
                      <li>• {t('notif.how_step3')}</li>
                      <li>• {t('notif.how_step4')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Scheduled List */}
              <div>
                <p className="text-sm mb-3" style={{ fontWeight: 600 }}>
                  {t('notif.upcoming')}
                </p>

                {scheduledNotifications.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2" style={{ fontWeight: 600 }}>
                      {t('notif.no_scheduled')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t('notif.schedule_first')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {scheduledNotifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${notif.status === 'pending'
                          ? 'border-purple-200'
                          : 'border-green-200'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-sm mb-1" style={{ fontWeight: 600 }}>
                              {notif.medicineName}
                            </p>
                            <p className="text-xs text-gray-600">
                              {notif.dosage} • {notif.time}
                            </p>
                          </div>
                          {notif.status === 'pending' && (
                            <button
                              onClick={() => handleDelete(notif.id)}
                              className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div>
                          {notif.status === 'pending' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                              <Clock className="w-3 h-3" />
                              {t('notif.pending')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs">
                              <CheckCircle className="w-3 h-3" />
                              {t('notif.sent')}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Padding for Navigation */}
      <div className="h-20" />
    </div>
  );
}
