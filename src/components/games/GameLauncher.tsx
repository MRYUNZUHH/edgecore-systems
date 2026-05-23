"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface GameLauncherProps {
  isOpen: boolean;
  game: { id: string; title: string; provider: string } | null;
  onClose: () => void;
}

// Pragmatic Play demo URLs (free play)
const providerUrls: Record<string, string> = {
  pragmatic: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20olympgate&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&jurisdiction=99&lang=en&cur=USD",
  evolution: "https://evolution.com/demo",
  spribe: "https://spribe.co/games/aviator/demo",
};

export default function GameLauncher({ isOpen, game, onClose }: GameLauncherProps) {
  if (!game) return null;
  
  const demoUrl = providerUrls[game.provider] || null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
            className="w-full max-w-5xl h-[80vh] bg-[#0D0F1A] border border-[#E6B84F]/20 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-white font-bold text-lg">{game.title}</h2>
              <button onClick={onClose} className="text-white/40 hover:text-white"><FiX className="w-6 h-6" /></button>
            </div>
            
            {/* Content */}
            {demoUrl ? (
              <iframe src={demoUrl} className="w-full h-full" allowFullScreen />
            ) : (
              <div className="flex items-center justify-center h-full text-white/40 text-center p-8">
                <div>
                  <span className="text-6xl block mb-4">🎮</span>
                  <p className="text-xl font-bold text-white mb-2">Demo Play: {game.title}</p>
                  <p>Real provider integration coming soon.</p>
                  <button className="mt-4 px-6 py-2 bg-[#E6B84F] text-black font-bold rounded-xl">
                    Play Demo Version
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}