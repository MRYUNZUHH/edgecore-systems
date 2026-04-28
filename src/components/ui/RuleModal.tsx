'use client';
import { motion } from 'framer-motion';

interface RuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function RuleModal({ isOpen, onClose, title, children }: RuleModalProps) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale:0.8 }}
        animate={{ scale:1 }}
        onClick={e => e.stopPropagation()}
        className="glass-panel p-6 max-w-md w-full mx-4"
      >
        <h3 className="text-2xl font-bold gold-text mb-4">{title}</h3>
        <div className="text-white/80">{children}</div>
        <button onClick={onClose} className="btn-primary mt-4 w-full">Got it!</button>
      </motion.div>
    </motion.div>
  );
}
