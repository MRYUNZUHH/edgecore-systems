"use client";
import { useGameStore, Currency, Language } from "@/store/game-store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const currencies: { code: Currency; label: string; symbol: string }[] = [
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "KES", label: "Kenyan Shilling", symbol: "KSh" },
  { code: "NGN", label: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", label: "Ghanaian Cedi", symbol: "GH₵" },
  { code: "ZAR", label: "South African Rand", symbol: "R" },
  { code: "EUR", label: "Euro", symbol: "€" },
  { code: "GBP", label: "British Pound", symbol: "£" },
];

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function CurrencyLanguageSelector() {
  const { currency, setCurrency, language, setLanguage } = useGameStore();
  const [showCurrency, setShowCurrency] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat(language, { style: "currency", currency }).format(amount);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Currency */}
      <div className="relative">
        <button onClick={() => { setShowCurrency(!showCurrency); setShowLang(false); }}
          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition">
          {currencies.find(c => c.code === currency)?.symbol} {currency}
        </button>
        <AnimatePresence>
          {showCurrency && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-full mt-2 right-0 w-48 bg-[#0D0F1A] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              {currencies.map(c => (
                <button key={c.code} onClick={() => { setCurrency(c.code); setShowCurrency(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition ${currency === c.code ? "text-[#E6B84F]" : "text-white/70"}`}>
                  {c.symbol} {c.label} ({c.code})
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language */}
      <div className="relative">
        <button onClick={() => { setShowLang(!showLang); setShowCurrency(false); }}
          className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition">
          {languages.find(l => l.code === language)?.flag}
        </button>
        <AnimatePresence>
          {showLang && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-full mt-2 right-0 w-48 bg-[#0D0F1A] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
              {languages.map(l => (
                <button key={l.code} onClick={() => { setLanguage(l.code); setShowLang(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition ${language === l.code ? "text-[#E6B84F]" : "text-white/70"}`}>
                  {l.flag} {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}