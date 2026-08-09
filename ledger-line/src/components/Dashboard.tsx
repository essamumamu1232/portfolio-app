import React from 'react'
import { useLedgerStore } from '../store'
import styles from './Dashboard.module.css'
import {
  TrendingUp, TrendingDown, DollarSign, Wallet,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import {
  AreaChart, Area,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const KPI_CARDS = [
  {
    id: 'kpi-revenue',
    label: 'Total Revenue',
    key: 'totalRevenue' as const,
    icon: <TrendingUp size={18} />,
    color: 'var(--income)',
    bg: 'var(--income-bg)',
    change: '+12.4%',
    positive: true,
  },
  {
    id: 'kpi-expenses',
    label: 'Total Expenses',
    key: 'totalExpenses' as const,
    icon: <TrendingDown size={18} />,
    color: 'var(--expense)',
    bg: 'var(--expense-bg)',
    change: '+5.2%',
    positive: false,
  },
  {
    id: 'kpi-net',
    label: 'Net Income',
    key: 'netIncome' as const,
    icon: <DollarSign size={18} />,
    color: 'var(--asset)',
    bg: 'var(--asset-bg)',
    change: '+28.1%',
    positive: true,
  },
  {
    id: 'kpi-cash',
    label: 'Cash Balance',
    key: 'cashBalance' as const,
    icon: <Wallet size={18} />,
    color: 'var(--liability)',
    bg: 'var(--liability-bg)',
    change: '+8.6%',
    positive: true,
  },
]

const COLORS = ['#2563eb', '#7c3aed', '#ea580c', '#059669', '#94a3b8']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className={styles.tooltipRow}>
          {p.name}: <strong>{fmt(p.value)}</strong>
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { cashFlow, expenseCategories, transactions, totalRevenue, totalExpenses, netIncome, cashBalance } = useLedgerStore()
  const recentTx = transactions.slice(0, 6)
  const values = { totalRevenue, totalExpenses, netIncome, cashBalance }

  return (
    <div className={styles.dashboard}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {KPI_CARDS.map(card => (
          <div key={card.id} id={card.id} className={`${styles.kpiCard} card animate-slide-up`}>
            <div className={styles.kpiHeader}>
              <div className={styles.kpiIcon} style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <span className={`${styles.kpiChange} ${card.positive ? styles.pos : styles.neg}`}>
                {card.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.change}
              </span>
            </div>
            <div className={styles.kpiAmount} style={{ color: card.color }}>
              {fmt(values[card.key])}
            </div>
            <div className={styles.kpiLabel}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Cash Flow Area Chart */}
        <div className={`${styles.chartCard} card animate-fade-in`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Cash Flow</h3>
            <span className={styles.chartPeriod}>Last 7 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cashFlow} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#059669" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#dc2626" strokeWidth={2} fill="url(#expenseGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Donut */}
        <div className={`${styles.chartCard} ${styles.chartSmall} card animate-fade-in`}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Expense Breakdown</h3>
            <span className={styles.chartPeriod}>This month</span>
          </div>
          <div className={styles.donutWrapper}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={expenseCategories} cx="50%" cy="50%" innerRadius={50} outerRadius={70}
                  dataKey="amount" paddingAngle={2}>
                  {expenseCategories.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: unknown) => fmt(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.donutLegend}>
              {expenseCategories.map((cat, i) => (
                <div key={i} className={styles.donutLegendItem}>
                  <span className={styles.donutDot} style={{ background: cat.color }} />
                  <span className={styles.donutName}>{cat.name}</span>
                  <span className={styles.donutPct}>{cat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`card animate-slide-up`}>
        <div className={styles.tableHeader}>
          <h3 className={styles.chartTitle}>Recent Transactions</h3>
          <span className={styles.chartPeriod}>{transactions.length} total</span>
        </div>
        <div className={styles.tableWrapper}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTx.map(tx => (
                <tr key={tx.id} id={`tx-row-${tx.id}`}>
                  <td className="mono" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{tx.date}</td>
                  <td>
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{tx.description}</span>
                    {tx.reference && <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{tx.reference}</div>}
                  </td>
                  <td><span className={`badge ${tx.type === 'credit' ? 'badge-income' : 'badge-expense'}`}>{tx.category}</span></td>
                  <td>
                    <span className={`badge ${tx.status === 'reconciled' ? 'badge-income' : tx.status === 'pending' ? 'badge-liability' : 'badge-asset'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className={tx.type === 'credit' ? 'amount-pos' : 'amount-neg'}>
                    {tx.type === 'credit' ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
