const DEMO_KEY = "ec_balance";
const REAL_KEY = "ec_real_balance";
const MODE_KEY = "ec_mode";
const WAGER_KEY = "ec_wager_total";

function isBrowser(): boolean { return typeof window !== "undefined"; }

export function getActiveBalance(): number {
  if (!isBrowser()) return 10000;
  try {
    const mode = localStorage.getItem(MODE_KEY) || "demo";
    const key = mode === "real" ? REAL_KEY : DEMO_KEY;
    return parseFloat(localStorage.getItem(key) || (mode === "real" ? "0" : "10000"));
  } catch { return 10000; }
}

export function placeBet(amount: number): boolean {
  if (!isBrowser()) return false;
  try {
    const mode = localStorage.getItem(MODE_KEY) || "demo";
    const key = mode === "real" ? REAL_KEY : DEMO_KEY;
    const bal = parseFloat(localStorage.getItem(key) || "0");
    if (amount > bal) return false;
    localStorage.setItem(key, (bal - amount).toString());
    const wager = parseFloat(localStorage.getItem(WAGER_KEY) || "0") + amount;
    localStorage.setItem(WAGER_KEY, wager.toString());
    if (isBrowser()) window.dispatchEvent(new Event("storage"));
    return true;
  } catch { return false; }
}

export function addWinnings(amount: number): void {
  if (!isBrowser()) return;
  try {
    const mode = localStorage.getItem(MODE_KEY) || "demo";
    const key = mode === "real" ? REAL_KEY : DEMO_KEY;
    const bal = parseFloat(localStorage.getItem(key) || "0");
    localStorage.setItem(key, (bal + amount).toString());
    if (isBrowser()) window.dispatchEvent(new Event("storage"));
  } catch {}
}