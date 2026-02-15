import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Brain, FileText, Users, Settings, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export function MenuDrawer({ isOpen, onClose, onNavigate }: MenuDrawerProps) {
  const { t } = useLanguage();

  const menuItems = [
    {
      id: 'logs',
      label: t('menu.logs.label'),
      description: t('menu.logs.desc'),
      icon: FileText,
      color: 'indigo'
    },
    {
      id: 'knowledge',
      label: t('menu.knowledge.label'),
      description: t('menu.knowledge.desc'),
      icon: BookOpen,
      color: 'blue'
    },
    {
      id: 'ai-dashboard',
      label: t('menu.ai.label'),
      description: t('menu.ai.desc'),
      icon: Brain,
      color: 'purple'
    },
    {
      id: 'reports',
      label: t('menu.reports.label'),
      description: t('menu.reports.desc'),
      icon: FileText,
      color: 'green'
    },
    {
      id: 'caregiver',
      label: t('menu.caregiver.label'),
      description: t('menu.caregiver.desc'),
      icon: Users,
      color: 'amber'
    },
    {
      id: 'settings',
      label: t('menu.settings.label'),
      description: t('menu.settings.desc'),
      icon: Settings,
      color: 'gray'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      indigo: 'bg-indigo-100 text-indigo-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      amber: 'bg-amber-100 text-amber-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const handleNavigate = (screenId: string) => {
    onNavigate(screenId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl" style={{ fontWeight: 700 }}>{t('menu.title')}</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm opacity-90">{t('menu.subtitle')}</p>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(item.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm mb-1" style={{ fontWeight: 600 }}>{item.label}</p>
                        <p className="text-xs text-gray-600">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-4 mt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-500">{t('app.name')} v2.1.0</p>
                <p className="text-xs text-gray-400 mt-1">{t('app.tagline')}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}