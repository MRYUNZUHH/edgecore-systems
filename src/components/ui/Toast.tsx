"use client";
import { useState, useEffect, useCallback } from "react";
let toastFn: any = null;
export function toast(msg: string, type: 'success'|'warning'|'error'='success') { if (toastFn) toastFn(msg, type); }
export function ToastContainer() {
  const [toasts, setToasts] = useState<{id:number;msg:string;type:string}[]>([]);
  const add = useCallback((msg:string,type:string)=>{const id=Date.now();setToasts(p=>[...p,{id,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000);},[]);
  useEffect(()=>{toastFn=add;return()=>{toastFn=null};},[add]);
  return (
    <div className="fixed bottom-20 right-4 z-[999] space-y-2">
      {toasts.map(t=><div key={t.id} className={`animate-slide-in px-4 py-2.5 rounded-lg text-sm font-bold shadow-xl ${t.type==='success'?'bg-green-500/90 text-white':t.type==='warning'?'bg-gold/90 text-black':'bg-red-500/90 text-white'}`}>{t.msg}</div>)}
    </div>
  );
}