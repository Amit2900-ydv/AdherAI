import { motion } from 'motion/react';
import { Bell } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface NotificationBellProps {
  count: number;
  onClick: () => void;
}

export function NotificationBell({ count, onClick }: NotificationBellProps) {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed top-4 right-4 z-40"
    >
      <Button
        onClick={onClick}
        size="icon"
        className="relative w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
      >
        <Bell className="w-6 h-6" />
        
        {/* Badge */}
        {count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-md"
          >
            <span className="text-white text-xs" style={{ fontWeight: 700 }}>
              {count > 9 ? '9+' : count}
            </span>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}
