import React from 'react'
import { useLedgerStore } from '../store'
import styles from './Accounts.module.css'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { AccountType } from '../types'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(Math.abs(n))

const TYPE_CONFIG: Record<AccountType, { label: string; color: string; bg: string; badge: string; icon: React.ReactNode }> = {
  asset:     { label: 'Assets',       color: 'var(--asset)',     bg: 'var(--asset-bg)',     badge: 'badge-asset',     icon: <TrendingUp size={14} /> },
  liability: { label: 'Liabilities',  color: 'var(--liability)', bg: 'var(--liability-bg)', badge: 'badge-liability', icon: <TrendingDown size={14} /> },
  equity:    { label: 'Equity',       color: '#0891b2',          bg: '#ecfeff',             badge: 'badge-asset',     icon: <Minus size={14} /> },
  revenue:   { label: 'Revenue',      color: 'var(--income)',    bg: 'var(--income-bg)',    badge: 'badge-income',    icon: <TrendingUp size={14} /> },
  expense:   { label: 'Expenses',     color: 'var(--expense)',   bg: 'var(--expense-bg)',   badge: 'badge-expense',   icon: <TrendingDown size={14} /> },
}

const ACCOUNT_TYPES: AccountType[] = ['asset', 'liability', 'equity', 'revenue', 'expense']

export default function Accounts() {
  const { accounts } = useLedgerStore()

  const byType = ACCOUNT_TYPES.reduce((acc, type) => {
    acc[type] = accounts.filter(a => a.type === type)
    return acc
  }, {} as Record<AccountType, typeof accounts>)

  const totalAssets = accounts.filter(a => a.type === 'asset').reduce((s, a) => s + a.balance, 0)
  const totalLiabilities = Math.abs(accounts.filter(a => a.type === 'liability').reduce((s, a) => s + a.balance, 0))
  const totalEquity = totalAssets - totalLiabilities

  return (
    <div className={styles.page}>
      <div className={styles.summaryRow}>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div className={styles.summaryLabel}>Total Assets</div>
          <div className={styles.summaryAmount} style={{ color: 'var(--asset)' }}>{fmt(totalAssets)}</div>
        </div>
        <div className={styles.equation}>＝</div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div className={styles.summaryLabel}>Total Liabilities</div>
          <div className={styles.summaryAmount} style={{ color: 'var(--liability)' }}>{fmt(totalLiabilities)}</div>
        </div>
        <div className={styles.equation}>＋</div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div className={styles.summaryLabel}>Total Equity</div>
          <div className={styles.summaryAmount} style={{ color: 'var(--income)' }}>{fmt(totalEquity)}</div>
        </div>
      </div>

      <div className={styles.accountsGrid}>
        {ACCOUNT_TYPES.map(type => {
          const cfg = TYPE_CONFIG[type]
          const typeAccounts = byType[type]
          const total = typeAccounts.reduce((s, a) => s + Math.abs(a.balance), 0)
          return (
            <div key={type} className={`card ${styles.accountGroup}`} id={`accounts-${type}`}>
              <div className={styles.groupHeader}>
                <div className={styles.groupIcon} style={{ background: cfg.bg, color: cfg.color }}>{cfg.icon}</div>
                <div>
                  <div className={styles.groupTitle} style={{ color: cfg.color }}>{cfg.label}</div>
                  <div className={styles.groupCount}>{typeAccounts.length} accounts</div>
                </div>
                <div className={styles.groupTotal} style={{ color: cfg.color }}>{fmt(total)}</div>
              </div>
              <div className="divider" style={{ margin: '10px 0' }} />
              <table className="table" style={{ fontSize: 12 }}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Account Name</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {typeAccounts.map(account => (
                    <tr key={account.id} id={`account-${account.id}`}>
                      <td className="mono" style={{ color: 'var(--text-muted)', fontSize: 11 }}>{account.code}</td>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{account.name}</td>
                      <td className={account.balance >= 0 ? 'amount-pos' : 'amount-neutral'}>
                        {fmt(account.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}
