export const crashPoint=()=>Math.max(1.00,parseFloat((Math.floor(99/((1-Math.random())*100))/100).toFixed(2)));
export const shuffle=<T>(arr:T[]):T[]=>[...arr].sort(()=>Math.random()-0.5);
export const rollFloat=()=>parseFloat((Math.random()*100).toFixed(2));
export const plinkoPath=(rows:number)=>Array.from({length:rows},()=>Math.random()<0.5?"L":"R");
export const kenoDraws=()=>{const d:number[]=[];while(d.length<20){const n=Math.ceil(Math.random()*80);if(!d.includes(n))d.push(n)}return d.sort((a,b)=>a-b)};
export const deck=()=>{const s=["♠","♥","♦","♣"],r=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];return shuffle(s.flatMap(x=>r.map(y=>({suit:x,rank:y,value:y==="A"?11:["J","Q","K"].includes(y)?10:parseInt(y)}))))};
export const handTotal=(h:any[])=>{let t=h.reduce((s,c)=>s+c.value,0);let a=h.filter((c:any)=>c.rank==="A").length;while(t>21&&a>0){t-=10;a--}return t};
export const generateMines=(count:number):number[]=>{const p:number[]=[];while(p.length<count){const n=Math.floor(Math.random()*25);if(!p.includes(n))p.push(n)}return p};
export const spinWheel=(risk:"low"|"med"|"high"):number=>{const segs:Record<string,number[]>={low:[1.2,1.2,1.2,1.5,1.5,1.5,2,2,2,3],med:[1.5,1.5,2,2,2,3,3,5,5,10],high:[2,2,3,3,3,5,5,10,10,50]};return segs[risk][Math.floor(Math.random()*10)]};