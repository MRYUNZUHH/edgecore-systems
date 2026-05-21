"use client";
import { useState, useEffect } from "react";

export function useLiveJackpot() {
  const [jackpot, setJackpot] = useState(34200);
  useEffect(() => {
    const interval = setInterval(() => setJackpot(prev => prev + Math.floor(Math.random() * 50)), 2000);
    return () => clearInterval(interval);
  }, []);
  return jackpot;
}

export function useLivePlayers() {
  const [players, setPlayers] = useState(2458);
  useEffect(() => {
    const interval = setInterval(() => setPlayers(prev => prev + Math.floor(Math.random() * 3 - 1)), 5000);
    return () => clearInterval(interval);
  }, []);
  return players;
}

export function useLiveFeed() {
  const [feed, setFeed] = useState<{player:string; game:string; amount:number; win:boolean; multiplier:number}[]>([]);
  useEffect(() => {
    const names = ["CryptoKing","LuckySpin","DiamondHands","NeonNinja","JackpotJack","AceHigh","SlotSiren","CrashQueen"];
    const gen = () => ({
      player: names[Math.floor(Math.random()*names.length)],
      game: ["Dice","Crash","Roulette","Plinko","Blackjack","Aviator"][Math.floor(Math.random()*6)],
      amount: Math.floor(Math.random()*500)+10,
      win: Math.random()>0.8,
      multiplier: parseFloat((Math.random()*5+1).toFixed(2)),
    });
    setFeed(Array.from({length:6}, gen));
    const interval = setInterval(() => setFeed(prev => [gen(), ...prev].slice(0,10)), 2500);
    return () => clearInterval(interval);
  }, []);
  return feed;
}

export function useBiggestWins() {
  const [wins, setWins] = useState([
    { player: "CryptoKing", game: "Aviator", amount: 12450 },
    { player: "LuckySpin", game: "Crash", amount: 8900 },
    { player: "DiamondHands", game: "Roulette", amount: 7200 },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setWins(prev => {
        const newWin = {
          player: ["CryptoKing","LuckySpin","DiamondHands","NeonNinja"][Math.floor(Math.random()*4)],
          game: ["Aviator","Crash","Roulette","Plinko"][Math.floor(Math.random()*4)],
          amount: Math.floor(Math.random()*15000)+1000,
        };
        return [newWin, ...prev].slice(0,5);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  return wins;
}