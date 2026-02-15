import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface FloatingAIOrbProps {
  onClick: () => void;
}

export function FloatingAIOrb({ onClick }: FloatingAIOrbProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 10px 40px rgba(59, 130, 246, 0.3)',
          '0 10px 60px rgba(147, 51, 234, 0.4)',
          '0 10px 40px rgba(59, 130, 246, 0.3)',
        ],
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
        },
      }}
    >
      <div className="relative">
        <MessageCircle className="w-7 h-7 text-white" />
        
        {/* Pulsing notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-400"
        animate={{
          scale: [1, 1.5],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
    </motion.button>
  );
}
