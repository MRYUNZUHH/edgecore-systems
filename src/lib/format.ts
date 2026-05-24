export function formatMoney(amount: number, currency?: string): string {
  const num = amount || 0;
  return '$' + num.toFixed(2);
}