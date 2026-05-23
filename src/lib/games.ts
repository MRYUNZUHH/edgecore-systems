export const GAMES = [
  { id:'starburst', name:'Starburst', category:'slots', volatility:'low', rtp:96.1, badge:'HOT', color:'#7C3AED', emoji:'⭐' },
  { id:'book-of-dead', name:'Book of Dead', category:'slots', volatility:'high', rtp:94.2, badge:null, color:'#D97706', emoji:'📖' },
  { id:'blackjack-pro', name:'Blackjack Pro', category:'table', volatility:'low', rtp:99.5, badge:'NEW', color:'#059669', emoji:'🃏' },
  { id:'roulette', name:'European Roulette', category:'table', volatility:'medium', rtp:97.3, badge:null, color:'#DC2626', emoji:'🎡' },
  { id:'aviator', name:'Aviator', category:'crash', volatility:'high', rtp:97.0, badge:'HOT', color:'#2563EB', emoji:'✈️' },
  { id:'crash', name:'Crash', category:'crash', volatility:'high', rtp:97.0, badge:'HOT', color:'#E63946', emoji:'📈' },
  { id:'mines', name:'Mines', category:'crash', volatility:'medium', rtp:95.0, badge:null, color:'#6B7280', emoji:'💣' },
  { id:'plinko', name:'Plinko', category:'crash', volatility:'low', rtp:96.5, badge:null, color:'#8B5CF6', emoji:'🟡' },
  { id:'live-bj', name:'Live Blackjack', category:'live', volatility:'low', rtp:99.4, badge:null, color:'#0F766E', emoji:'🎥' },
  { id:'live-roulette', name:'Live Roulette', category:'live', volatility:'medium', rtp:97.3, badge:'NEW', color:'#B91C1C', emoji:'🎥' },
  { id:'dragon-tiger', name:'Dragon Tiger', category:'live', volatility:'medium', rtp:96.9, badge:null, color:'#C2410C', emoji:'🐉' },
  { id:'baccarat', name:'Baccarat', category:'table', volatility:'low', rtp:98.9, badge:null, color:'#0369A1', emoji:'🎴' },
]
export type Category = 'all'|'slots'|'table'|'crash'|'live'