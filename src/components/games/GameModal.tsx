"use client";
import { AnimatePresence, motion } from "framer-motion";
import AviatorGame from "./AviatorGame";
import MinesGame from "./MinesGame";

const GAME_COMPONENTS: Record<string, React.FC<{onClose: () => void}>> = {
  aviator: AviatorGame,
  crash: AviatorGame, // same engine
  mines: MinesGame,
}

export default function GameModal({ gameId, onClose }: { gameId: string | null; onClose: () => void }) {
  if (!gameId) return null
  const Component = GAME_COMPONENTS[gameId]
  if (!Component) return null
  
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Component onClose={onClose} />
      </motion.div>
    </AnimatePresence>
  );
}