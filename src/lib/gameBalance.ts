const DEMO_KEY = "ec_balance";
const REAL_KEY = "ec_real_balance";
const MODE_KEY = "ec_mode";
const WAGER_KEY = "ec_wager_total";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getActiveBalance(): number {
  if (!isClient()) return 10000;
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  return parseFloat(localStorage.getItem(key) || (mode === "real" ? "0" : "10000"));
}

export function placeBet(amount: number): boolean {
  if (!isClient()) return false;
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  const bal = parseFloat(localStorage.getItem(key) || "0");
  if (amount > bal) return false;
  localStorage.setItem(key, (bal - amount).toString());
  const wager = parseFloat(localStorage.getItem(WAGER_KEY) || "0") + amount;
  localStorage.setItem(WAGER_KEY, wager.toString());
  window.dispatchEvent(new Event("storage"));
  return true;
}

export function addWinnings(amount: number): void {
  if (!isClient()) return;
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  const bal = parseFloat(localStorage.getItem(key) || "0");
  localStorage.setItem(key, (bal + amount).toString());
  window.dispatchEvent(new Event("storage"));
}