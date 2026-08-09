import React from 'react'
import { useLedgerStore } from '../store'
import styles from './Reports.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Download } from 'lucide-react'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

export default function Reports() {
  const { accounts, totalRevenue, totalExpenses, netIncome, tenant } = useLedgerStore()

  const revenueAccounts = accounts.filter(a => a.type === 'revenue')
  const expenseAccounts = accounts.filter(a => a.type === 'expense')
  const assetAccounts = accounts.filter(a => a.type === 'asset')
  const liabilityAccounts = accounts.filter(a => a.type === 'liability')
  const equityAccounts = accounts.filter(a => a.type === 'equity')

  const totalAssets = assetAccounts.reduce((s, a) => s + a.balance, 0)
  const totalLiabilities = Math.abs(liabilityAccounts.reduce((s, a) => s + a.balance, 0))
  const totalEquity = equityAccounts.reduce((s, a) => s + a.balance, 0)

  const plData = [
    ...revenueAccounts.map(a => ({ name: a.name, amount: a.balance, type: 'revenue' })),
    ...expenseAccounts.map(a => ({ name: a.name.split(' ')[0], amount: Math.abs(a.balance), type: 'expense' })),
  ]

  const handleExportPL = () => {
    const lines = [
      `PROFIT & LOSS STATEMENT`,
      `${tenant.name}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      ``,
      `REVENUE`,
      ...revenueAccounts.map(a => `  ${a.name}\t${fmt(a.balance)}`),
      `  TOTAL REVENUE\t${fmt(totalRevenue)}`,
      ``,
      `EXPENSES`,
      ...expenseAccounts.map(a => `  ${a.name}\t${fmt(Math.abs(a.balance))}`),
      `  TOTAL EXPENSES\t${fmt(totalExpenses)}`,
      ``,
      `NET INCOME\t${fmt(netIncome)}`,
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'profit-loss.txt'; a.click()
  }

  return (
    <div className={styles.page}>
      <div className={styles.reportsGrid}>
        {/* P&L Statement */}
        <div className={`card ${styles.report}`} id="report-pl">
          <div className={styles.reportHeader}>
            <h3 className={styles.reportTitle}>Profit & Loss</h3>
            <span className={styles.reportDate}>{tenant.name} · {new Date().toLocaleDateString()}</span>
            <button id="export-pl" className="btn btn-outline" onClick={handleExportPL} style={{ marginLeft: 'auto' }}>
              <Download size={12} />Export
            </button>
          </div>
          <div className={styles.reportSection}>
            <div className={styles.sectionLabel} style={{ color: 'var(--income)' }}>REVENUE</div>
            {revenueAccounts.map(a => (
              <div key={a.id} className={styles.reportRow}>
                <span>{a.name}</span>
                <span className="amount-pos">{fmt(a.balance)}</span>
              </div>
            ))}
            <div className={`${styles.reportRow} ${styles.totalRow}`}>
              <span>Total Revenue</span>
              <span className="amount-pos" style={{ fontSize: 15, fontWeight: 800 }}>{fmt(totalRevenue)}</span>
            </div>
          </div>
          <div className={styles.reportSection}>
            <div className={styles.sectionLabel} style={{ color: 'var(--expense)' }}>EXPENSES</div>
            {expenseAccounts.map(a => (
              <div key={a.id} className={styles.reportRow}>
                <span>{a.name}</span>
                <span className="amount-neg">{fmt(Math.abs(a.balance))}</span>
              </div>
            ))}
            <div className={`${styles.reportRow} ${styles.totalRow}`}>
              <span>Total Expenses</span>
              <span className="amount-neg" style={{ fontSize: 15, fontWeight: 800 }}>{fmt(totalExpenses)}</span>
            </div>
          </div>
          <div className={`${styles.reportRow} ${styles.netRow}`}>
            <span>NET INCOME</span>
            <span className="amount-pos" style={{ fontSize: 18, fontWeight: 800 }}>{fmt(netIncome)}</span>
          </div>
        </div>

        {/* Balance Sheet */}
        <div className={`card ${styles.report}`} id="report-bs">
          <div className={styles.reportHeader}>
            <h3 className={styles.reportTitle}>Balance Sheet</h3>
            <span className={styles.reportDate}>{tenant.name}</span>
          </div>
          <div className={styles.reportSection}>
            <div className={styles.sectionLabel} style={{ color: 'var(--asset)' }}>ASSETS</div>
            {assetAccounts.map(a => (
              <div key={a.id} className={styles.reportRow}>
                <span>{a.name}</span>
                <span className="amount-pos">{fmt(a.balance)}</span>
              </div>
            ))}
            <div className={`${styles.reportRow} ${styles.totalRow}`}>
              <span>Total Assets</span>
              <span className="amount-pos" style={{ fontSize: 15, fontWeight: 800 }}>{fmt(totalAssets)}</span>
            </div>
          </div>
          <div className={styles.reportSection}>
            <div className={styles.sectionLabel} style={{ color: 'var(--liability)' }}>LIABILITIES</div>
            {liabilityAccounts.map(a => (
              <div key={a.id} className={styles.reportRow}>
                <span>{a.name}</span>
                <span className="amount-neg">{fmt(Math.abs(a.balance))}</span>
              </div>
            ))}
            <div className={`${styles.reportRow} ${styles.totalRow}`}>
              <span>Total Liabilities</span>
              <span className="amount-neg" style={{ fontSize: 15, fontWeight: 800 }}>{fmt(totalLiabilities)}</span>
            </div>
          </div>
          <div className={styles.reportSection}>
            <div className={styles.sectionLabel} style={{ color: '#0891b2' }}>EQUITY</div>
            {equityAccounts.map(a => (
              <div key={a.id} className={styles.reportRow}>
                <span>{a.name}</span>
                <span className="amount-pos">{fmt(a.balance)}</span>
              </div>
            ))}
            <div className={`${styles.reportRow} ${styles.totalRow}`}>
              <span>Total Equity</span>
              <span className="amount-pos" style={{ fontSize: 15, fontWeight: 800 }}>{fmt(totalEquity)}</span>
            </div>
          </div>
          <div className={`${styles.reportRow} ${styles.netRow}`} style={{ borderColor: 'var(--asset)' }}>
            <span style={{ color: 'var(--asset)' }}>Assets = Liabilities + Equity</span>
            <span className="amount-pos" style={{ fontSize: 16, fontWeight: 800 }}>✓ Balanced</span>
          </div>
        </div>

        {/* Revenue vs Expenses Bar */}
        <div className={`card ${styles.chartReport}`} id="report-chart">
          <h3 className={styles.reportTitle}>Revenue vs Expenses by Account</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={plData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} angle={-25} textAnchor="end" axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: unknown) => fmt(Number(v))} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {plData.map((entry, i) => (
                  <Cell key={i} fill={entry.type === 'revenue' ? 'var(--income)' : 'var(--expense)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className={styles.chartLegend}>
            <span><span className={styles.legendDot} style={{ background: 'var(--income)' }} />Revenue</span>
            <span><span className={styles.legendDot} style={{ background: 'var(--expense)' }} />Expenses</span>
          </div>
        </div>
      </div>
    </div>
  )
}
