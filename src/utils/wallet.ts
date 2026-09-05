export type WalletRecord = { id: number; type: string; amount: number; time: string; balanceType?: 'cash' | 'fare' | 'external' }

export type WalletState = {
  withdrawable: number
  fare: number
  records: WalletRecord[]
}

export type PaymentAllocation = {
  fare: number
  cash: number
  external: number
}

export const readWallet = (): WalletState => {
  const stored = uni.getStorageSync('wallet-state') as Partial<WalletState> | null | undefined
  return {
    withdrawable: Math.max(0, Number(stored?.withdrawable) || 0),
    fare: Math.max(0, Number(stored?.fare) || 0),
    records: Array.isArray(stored?.records) ? stored.records : []
  }
}

export const allocatePayment = (total: number, wallet: Pick<WalletState, 'fare' | 'withdrawable'>): PaymentAllocation => {
  const amount = Math.max(0, Number(total) || 0)
  const fare = Math.min(Math.max(0, wallet.fare), amount)
  const remainingAfterFare = amount - fare
  const cash = Math.min(Math.max(0, wallet.withdrawable), remainingAfterFare)
  return { fare, cash, external: remainingAfterFare - cash }
}

export const persistWallet = (wallet: WalletState) => {
  uni.setStorageSync('wallet-state', { ...wallet, records: [...wallet.records] })
}
