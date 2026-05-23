const NAMES = ['Kwame K.','Amina S.','João P.','Fatou D.','Carlos M.','Priya R.','Liu W.','Ayesha B.']
const GAMES = ['Aviator','Crash','Mines','Blackjack','Roulette','Baccarat','Plinko','Slots']
export function randomWin() {
  return {
    id: Math.random().toString(36).slice(2),
    name: NAMES[Math.floor(Math.random()*NAMES.length)],
    game: GAMES[Math.floor(Math.random()*GAMES.length)],
    amount: (Math.random() * 4900 + 100).toFixed(2),
    multiplier: (Math.random() * 18 + 1.2).toFixed(2),
    time: new Date(),
  }
}