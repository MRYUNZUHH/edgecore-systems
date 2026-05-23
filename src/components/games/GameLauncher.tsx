"use client";
import CrashGame from "./CrashGame";
import MinesGame from "./MinesGame";
import BlackjackGame from "./BlackjackGame";
import SlotGame from "./SlotGame";
import RouletteGame from "./RouletteGame";

const GAMES: Record<string, React.FC<{onClose: () => void}>> = {
  crash: CrashGame, aviator: CrashGame,
  mines: MinesGame,
  'blackjack-pro': BlackjackGame, 'live-bj': BlackjackGame,
  starburst: SlotGame, 'book-of-dead': SlotGame,
  roulette: RouletteGame, 'live-roulette': RouletteGame,
}

export default function GameLauncher({ gameId, onClose }: { gameId: string | null; onClose: () => void }) {
  if (!gameId) return null
  const Component = GAMES[gameId]
  if (!Component) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-4xl mb-4">🎮</p>
          <p className="text-white text-xl font-bold mb-2">{gameId}</p>
          <p className="text-white/40 mb-4">Game coming soon!</p>
          <button onClick={onClose} className="px-6 py-2 bg-[#f0b429] text-black font-bold rounded-xl">Back to Casino</button>
        </div>
      </div>
    )
  }
  return <Component onClose={onClose} />
}