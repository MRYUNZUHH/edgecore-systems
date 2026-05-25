"use client";
import { useState, useEffect, useCallback } from "react";
const BK="ec_balance",RB="ec_real_balance",UN="ec_username",WG="ec_wager_total",TX="ec_transactions",MD="ec_mode",AV="ec_avatar";
const AVATARS=["🦊","🐼","🐨","🦄","😎","🤠","👾","🐸","🤑","👑"];
export function useBalance(){
  const[b,setB]=useState(10000);const[rb,setRb]=useState(0);const[u,setU]=useState("");const[w,setW]=useState(0);
  const[tx,setTx]=useState<any[]>([]);const[mode,setMode]=useState<"demo"|"real">("demo");const[av,setAv]=useState("😎");
  const[mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true)},[]);
  useEffect(()=>{if(!mounted)return;try{setB(+localStorage.getItem(BK)!||10000);setRb(+localStorage.getItem(RB)!||0);setU(localStorage.getItem(UN)||"");setW(+localStorage.getItem(WG)!||0);setTx(JSON.parse(localStorage.getItem(TX)||"[]"));setMode((localStorage.getItem(MD)||"demo")as"demo"|"real");setAv(localStorage.getItem(AV)||"😎")}catch{};const h=()=>{setB(+localStorage.getItem(BK)!||10000);setRb(+localStorage.getItem(RB)!||0);setU(localStorage.getItem(UN)||"");setW(+localStorage.getItem(WG)!||0);setTx(JSON.parse(localStorage.getItem(TX)||"[]"));setMode((localStorage.getItem(MD)||"demo")as"demo"|"real");setAv(localStorage.getItem(AV)||"😎")};window.addEventListener("storage",h);return()=>window.removeEventListener("storage",h)},[mounted]);
  const activeBalance=useCallback(()=>mode==="demo"?b:rb,[mode,b,rb]);
  const placeBet=useCallback((amt:number):boolean=>{const bal=mode==="demo"?+localStorage.getItem(BK)!||10000:+localStorage.getItem(RB)!||0;if(amt>bal)return false;const nb=bal-amt;if(mode==="demo"){localStorage.setItem(BK,nb.toString());setB(nb)}else{localStorage.setItem(RB,nb.toString());setRb(nb)};const nw=w+amt;localStorage.setItem(WG,nw.toString());setW(nw);const t=[{date:new Date().toISOString(),type:"bet",amount:amt,status:"completed"},...tx].slice(0,100);localStorage.setItem(TX,JSON.stringify(t));setTx(t);return true},[mode,w,tx]);
  const addWinnings=useCallback((amt:number)=>{if(mode==="demo"){const nb=b+amt;localStorage.setItem(BK,nb.toString());setB(nb)}else{const nb=rb+amt;localStorage.setItem(RB,nb.toString());setRb(nb)};const t=[{date:new Date().toISOString(),type:"win",amount:amt,status:"completed"},...tx].slice(0,100);localStorage.setItem(TX,JSON.stringify(t));setTx(t)},[mode,b,rb,tx]);
  const login=useCallback((name:string)=>{const a=AVATARS[Math.floor(Math.random()*10)];localStorage.setItem(UN,name);localStorage.setItem(BK,"10000");localStorage.setItem(RB,"0");localStorage.setItem(WG,"0");localStorage.setItem(TX,"[]");localStorage.setItem(MD,"demo");localStorage.setItem(AV,a);setU(name);setB(10000);setRb(0);setW(0);setTx([]);setMode("demo");setAv(a)},[]);
  const logout=useCallback(()=>{localStorage.removeItem(UN);localStorage.removeItem(BK);localStorage.removeItem(RB);localStorage.removeItem(WG);localStorage.removeItem(TX);localStorage.removeItem(MD);setU("");setB(10000);setRb(0);setW(0);setTx([]);setMode("demo")},[]);
  const switchMode=useCallback((m:"demo"|"real")=>{localStorage.setItem(MD,m);setMode(m)},[]);
  const resetDemo=useCallback(()=>{localStorage.setItem(BK,"10000");setB(10000)},[]);
  const deposit=useCallback((amt:number,mthd:string)=>{if(mode==="real"){const nb=rb+amt;localStorage.setItem(RB,nb.toString());setRb(nb)}else{const nb=b+amt;localStorage.setItem(BK,nb.toString());setB(nb)};const t=[{date:new Date().toISOString(),type:"deposit",amount:amt,method:mthd,status:"completed"},...tx].slice(0,100);localStorage.setItem(TX,JSON.stringify(t));setTx(t)},[mode,b,rb,tx]);
  const isLoggedIn=mounted&&!!u;
  return{balance:activeBalance(),demoBalance:b,realBalance:rb,username:u,totalWagered:w,transactions:tx,accountMode:mode,avatar:av,isLoggedIn,placeBet,addWinnings,login,logout,switchMode,resetDemo,deposit,updateAvatar:(a:string)=>{localStorage.setItem(AV,a);setAv(a)},DEFAULT_AVATARS:AVATARS,mounted};
}