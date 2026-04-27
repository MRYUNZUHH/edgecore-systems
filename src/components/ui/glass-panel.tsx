// src/components/ui/glass-panel.tsx
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
}

export function GlassPanel({ children, className, glowing }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-glass-medium backdrop-blur-xl border border-white/10 rounded-xl',
        'shadow-inner-glass p-6',
        glowing && 'shadow-glow-green animate-pulse-glow',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
