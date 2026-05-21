// WALLET MANAGEMENT SYSTEM
// Handles demo balances, transactions, and wagering requirements

export interface WalletState {
  cashBalance: number;
  bonusBalance: number;
  wageringRequirement: number;
  lockedFunds: number;
  totalDeposited: number;
  totalWithdrawn: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'bet' | 'win' | 'bonus' | 'refund';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  metadata?: Record<string, any>;
}

const transactions: Transaction[] = [];

export function createWallet(initialBalance: number = 10000): WalletState {
  return {
    cashBalance: initialBalance,
    bonusBalance: 0,
    wageringRequirement: 0,
    lockedFunds: 0,
    totalDeposited: initialBalance,
    totalWithdrawn: 0,
  };
}

export function addFunds(wallet: WalletState, amount: number): WalletState {
  return {
    ...wallet,
    cashBalance: wallet.cashBalance + amount,
    totalDeposited: wallet.totalDeposited + amount,
  };
}

export function placeBet(wallet: WalletState, amount: number): WalletState {
  if (amount > wallet.cashBalance) throw new Error('Insufficient funds');
  return {
    ...wallet,
    cashBalance: wallet.cashBalance - amount,
  };
}

export function processWin(wallet: WalletState, winAmount: number): WalletState {
  return {
    ...wallet,
    cashBalance: wallet.cashBalance + winAmount,
  };
}

export function recordTransaction(tx: Omit<Transaction, 'id' | 'timestamp'>): Transaction {
  const newTx: Transaction = {
    ...tx,
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  transactions.unshift(newTx);
  return newTx;
}

export function getTransactionHistory(): Transaction[] {
  return transactions;
}