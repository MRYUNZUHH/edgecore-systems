// Shared balance functions used by all games
const DEMO_KEY = "ec_balance";
const REAL_KEY = "ec_real_balance";
const MODE_KEY = "ec_mode";
const WAGER_KEY = "ec_wager_total";

export function getActiveBalance(): number {
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  return parseFloat(localStorage.getItem(key) || (mode === "real" ? "0" : "10000"));
}

export function placeBet(amount: number): boolean {
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  const bal = parseFloat(localStorage.getItem(key) || "0");
  if (amount > bal) return false;
  localStorage.setItem(key, (bal - amount).toString());
  // Update wager
  const wager = parseFloat(localStorage.getItem(WAGER_KEY) || "0") + amount;
  localStorage.setItem(WAGER_KEY, wager.toString());
  // Dispatch storage event so all components update
  window.dispatchEvent(new Event("storage"));
  return true;
}

export function addWinnings(amount: number): void {
  const mode = localStorage.getItem(MODE_KEY) || "demo";
  const key = mode === "real" ? REAL_KEY : DEMO_KEY;
  const bal = parseFloat(localStorage.getItem(key) || "0");
  localStorage.setItem(key, (bal + amount).toString());
  window.dispatchEvent(new Event("storage"));
}