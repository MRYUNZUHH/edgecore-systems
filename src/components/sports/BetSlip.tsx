"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store/game-store";

type SlipBet = { id: string; matchId: string; match: string; selection: string; price: number; stake: number };

const STORAGE_KEY = 'edgecore-bets';

export default function BetSlip() {
  const [bets, setBets] = useState<SlipBet[]>([]);
  const [open, setOpen] = useState(false);
  const placeBet = useStore((s) => s.placeBet);

  useEffect(() => {
    const handler = (e: any) => {
      const detail = e.detail as any;
      const item: SlipBet = { id: detail.id, matchId: detail.matchId, match: detail.match, selection: detail.selection, price: detail.price, stake: 5 };
      setBets((b) => {
        const next = [item, ...b.filter(x => x.id !== item.id)].slice(0, 30);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
        return next;
      });
      setOpen(true);
    };
    window.addEventListener('edgecore:add-bet', handler as EventListener);

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setBets(JSON.parse(raw));
    } catch {}

    return () => window.removeEventListener('edgecore:add-bet', handler as EventListener);
  }, []);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(bets)); } catch {} }, [bets]);

  const remove = (id: string) => setBets((b) => b.filter((x) => x.id !== id));
  const updateStake = (id: string, stake: number) => setBets((b) => b.map(x => x.id === id ? { ...x, stake } : x));

  const totalStake = bets.reduce((s, b) => s + b.stake, 0);
  const estimatedPayout = bets.reduce((s, b) => s + b.stake * b.price, 0);
  const balance = useStore((s) => s.getBalance());

  const presets = [1, 5, 10, 25, 50];

  const applyPreset = (amt: number) => setBets((b) => b.map(x => ({ ...x, stake: amt })));

  const insufficient = totalStake > balance;

  const placeAll = () => {
    bets.forEach((b) => {
      placeBet(b.match, b.stake);
    });
    setBets([]);
    setOpen(false);
  };

  // Desktop / large screens: show full slip in right panel
  const desktop = (
    <div className="hidden xl:flex flex-col w-72 rounded-lg border border-white/5 bg-[#071017] overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white">Bet Slip</div>
          <div className="text-xs text-[#9da7bb]">{bets.length} selections</div>
        </div>
      </div>
      <div className="p-3 flex-1 overflow-y-auto hide-scrollbar space-y-2">
        {bets.length === 0 ? (
          <div className="text-xs text-[#9da7bb]">Click odds to add selections</div>
        ) : bets.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-lg bg-[#0d131f] p-3">
            <div className="text-xs w-36">
              <div className="font-semibold text-white truncate">{b.match}</div>
              <div className="text-[#9da7bb]">{b.selection} · {b.price}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <input aria-label="stake" value={b.stake} onChange={(e) => updateStake(b.id, Math.max(1, Number(e.target.value || 0)))} className="w-20 bg-[#071017] text-white text-right rounded px-2 py-1 border border-white/6" />
              <button onClick={() => remove(b.id)} className="text-xs text-[#ef4444]">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center justify-between text-sm text-[#9da7bb]">
          <div>Total stake</div>
          <div className="font-semibold text-white">${totalStake.toFixed(2)}</div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-[#9da7bb]">
          <div>Est. payout</div>
          <div className="font-semibold text-[#f0b429]">${estimatedPayout.toFixed(2)}</div>
        </div>
        <div className="mt-3 flex gap-2">
          {presets.map(p => (
            <button key={p} onClick={() => applyPreset(p)} className="text-sm px-3 py-1 rounded bg-white/6 text-white">${p}</button>
          ))}
        </div>
        {insufficient && <div className="mt-2 text-xs text-[#ef4444]">Insufficient balance (${balance.toFixed(2)})</div>}
        <button disabled={bets.length===0 || insufficient} onClick={placeAll} className="mt-3 w-full py-2 bg-[#f0b429] text-black font-bold rounded disabled:opacity-60">Place Bets</button>
      </div>
    </div>
  );

  // Mobile: show compact sticky button + modal drawer
  const mobile = (
    <>
      <div className="xl:hidden fixed left-4 right-4 bottom-4 z-50">
        <div className="flex items-center justify-between gap-3 bg-[#071017]/95 border border-white/6 rounded-xl p-3">
          <div className="text-sm">
            <div className="font-semibold">Bet Slip</div>
            <div className="text-xs text-[#9da7bb]">{bets.length} sel • ${totalStake.toFixed(0)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="px-4 py-2 bg-[#f0b429] text-black font-bold rounded">View</button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="ml-auto w-full max-w-md bg-[#071017] p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Bet Slip</div>
              <button onClick={() => setOpen(false)} className="text-sm text-[#9da7bb]">Close</button>
            </div>
            <div className="mt-4 space-y-3 h-[60vh] overflow-y-auto">
              {bets.length === 0 ? (
                <div className="text-sm text-[#9da7bb]">No selections</div>
              ) : bets.map((b) => (
                <div key={b.id} className="flex items-center justify-between bg-[#0d131f] rounded p-3">
                  <div className="text-sm w-2/3">
                    <div className="font-semibold truncate">{b.match}</div>
                    <div className="text-xs text-[#9da7bb]">{b.selection} · {b.price}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-1/3">
                    <input value={b.stake} onChange={(e) => updateStake(b.id, Math.max(1, Number(e.target.value || 0)))} className="w-full bg-[#071017] text-white text-right rounded px-2 py-1 border border-white/6" />
                    <button onClick={() => remove(b.id)} className="text-xs text-[#ef4444]">Remove</button>
                  </div>
                </div>
              ))}
            </div>
              <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-[#9da7bb]">
                <div>Total stake</div>
                <div className="font-semibold text-white">${totalStake.toFixed(2)}</div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-[#9da7bb]">
                <div>Est. payout</div>
                <div className="font-semibold text-[#f0b429]">${estimatedPayout.toFixed(2)}</div>
              </div>
              <div className="mt-3 flex gap-2">
                {presets.map(p => (
                  <button key={p} onClick={() => applyPreset(p)} className="text-sm px-3 py-1 rounded bg-white/6 text-white">${p}</button>
                ))}
              </div>
              {insufficient && <div className="mt-2 text-xs text-[#ef4444]">Insufficient balance (${balance.toFixed(2)})</div>}
              <button disabled={bets.length===0 || insufficient} onClick={placeAll} className="mt-3 w-full py-2 bg-[#f0b429] text-black font-bold rounded disabled:opacity-60">Place Bets</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {desktop}
      {mobile}
    </>
  );
}
