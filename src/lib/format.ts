const CURRENCIES: Record<string, { locale: string; currency: string }> = {
  USD: { locale: 'en-US', currency: 'USD' },
  KES: { locale: 'sw-KE', currency: 'KES' },
  NGN: { locale: 'en-NG', currency: 'NGN' },
  GHS: { locale: 'en-GH', currency: 'GHS' },
  ZAR: { locale: 'en-ZA', currency: 'ZAR' },
  EUR: { locale: 'de-DE', currency: 'EUR' },
  GBP: { locale: 'en-GB', currency: 'GBP' },
}
export function formatMoney(amount: number, currency = 'USD') {
  const { locale, currency: cur } = CURRENCIES[currency] ?? CURRENCIES.USD
  return new Intl.NumberFormat(locale, { style: 'currency', currency: cur, maximumFractionDigits: 2 }).format(amount)
}