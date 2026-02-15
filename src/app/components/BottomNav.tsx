import { motion } from 'motion/react';
import { Home, Scan, Calendar, FileText, Bell, Menu } from 'lucide-react';

import { useLanguage } from '@/app/context/LanguageContext';

interface BottomNavProps {
  activeScreen: 'home' | 'scan' | 'schedule' | 'logs' | 'notifications';
  onNavigate: (screen: 'home' | 'scan' | 'schedule' | 'logs' | 'notifications') => void;
  onMenuClick: () => void;
  notificationCount?: number;
}

export function BottomNav({ activeScreen, onNavigate, onMenuClick, notificationCount = 0 }: BottomNavProps) {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home' as const, label: t('nav.home'), icon: Home },
    { id: 'scan' as const, label: t('nav.scan'), icon: Scan },
    { id: 'notifications' as const, label: t('nav.alerts'), icon: Bell, badge: notificationCount },
    { id: 'schedule' as const, label: t('nav.schedule'), icon: Calendar }
  ];

  return (
    <div className="bg-white border-t border-gray-200 safe-area-inset-bottom z-50">
      <div className="px-1 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center justify-center px-2 py-2 rounded-xl transition-all"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 mb-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}
                    />
                    {item.badge && item.badge > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px]" style={{ fontWeight: 700 }}>
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600'
                      }`}
                    style={{ fontWeight: isActive ? 600 : 400 }}
                  >
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}


        </div>
      </div>
    </div>
  );
}