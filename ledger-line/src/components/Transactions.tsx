import React, { useState } from 'react'
import { useLedgerStore } from '../store'
import styles from './Transactions.module.css'
import { Search, Filter, Plus, Trash2, CheckCircle, Download } from 'lucide-react'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n)

export default function Transactions() {
  const { transactions, deleteTransaction, reconcileTransaction, addTransaction } = useLedgerStore()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'credit' | 'debit'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'cleared' | 'pending' | 'reconciled'>('all')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ date: '', description: '', category: '', amount: '', type: 'credit' as 'credit' | 'debit', accountName: '' })

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || tx.type === typeFilter
    const matchStatus = statusFilter === 'all' || tx.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  const handleAdd = () => {
    if (!form.date || !form.description || !form.amount) return
    addTransaction({
      date: form.date,
      description: form.description,
      category: form.category || 'Uncategorized',
      amount: parseFloat(form.amount),
      type: form.type,
      accountId: 'a1',
      accountName: form.accountName || 'Cash',
      status: 'pending',
      reference: undefined,
    })
    setForm({ date: '', description: '', category: '', amount: '', type: 'credit', accountName: '' })
    setShowAdd(false)
  }

  const handleExport = () => {
    const headers = ['Date,Description,Category,Type,Amount,Status']
    const rows = filtered.map(tx => `${tx.date},"${tx.description}",${tx.category},${tx.type},${tx.amount},${tx.status}`)
    const csv = [...headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'transactions.csv'; a.click()
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchBox}>
            <Search size={14} className={styles.searchIcon} />
            <input
              id="tx-search"
              className={styles.searchInput}
              placeholder="Search transactions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select id="type-filter" className="select" style={{ width: 130 }} value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)}>
            <option value="all">All Types</option>
            <option value="credit">Income</option>
            <option value="debit">Expense</option>
          </select>
          <select id="status-filter" className="select" style={{ width: 130 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
            <option value="all">All Status</option>
            <option value="cleared">Cleared</option>
            <option value="pending">Pending</option>
            <option value="reconciled">Reconciled</option>
          </select>
        </div>
        <div className={styles.toolbarRight}>
          <span className={styles.count}>{filtered.length} transactions</span>
          <button id="export-tx" className="btn btn-outline" onClick={handleExport}><Download size={13} />Export CSV</button>
          <button id="add-tx-btn" className="btn btn-primary" onClick={() => setShowAdd(v => !v)}><Plus size={13} />Add Transaction</button>
        </div>
      </div>

      {showAdd && (
        <div className={`card ${styles.addForm} animate-slide-up`}>
          <h4 className={styles.addTitle}>New Transaction</h4>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.label}>Date</label>
              <input type="date" className="input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className={styles.formField} style={{ gridColumn: 'span 2' }}>
              <label className={styles.label}>Description</label>
              <input className="input" placeholder="Transaction description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Category</label>
              <input className="input" placeholder="e.g. Software Revenue" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Amount (USD)</label>
              <input type="number" className="input" placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Type</label>
              <select className="select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))}>
                <option value="credit">Income (Credit)</option>
                <option value="debit">Expense (Debit)</option>
              </select>
            </div>
          </div>
          <div className={styles.formActions}>
            <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
            <button id="submit-tx" className="btn btn-primary" onClick={handleAdd}>Add Transaction</button>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Account</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tx => (
              <tr key={tx.id} id={`tx-${tx.id}`}>
                <td className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tx.date}</td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 13 }}>{tx.description}</div>
                  {tx.reference && <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{tx.reference}</div>}
                </td>
                <td><span className={`badge ${tx.type === 'credit' ? 'badge-income' : 'badge-expense'}`}>{tx.category}</span></td>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{tx.accountName}</td>
                <td>
                  <span className={`badge ${tx.status === 'reconciled' ? 'badge-income' : tx.status === 'pending' ? 'badge-liability' : 'badge-asset'}`}>
                    {tx.status}
                  </span>
                </td>
                <td className={tx.type === 'credit' ? 'amount-pos' : 'amount-neg'} style={{ textAlign: 'right' }}>
                  {tx.type === 'credit' ? '+' : '-'}{fmt(tx.amount)}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                    {tx.status !== 'reconciled' && (
                      <button className="btn-icon" data-tooltip="Reconcile" onClick={() => reconcileTransaction(tx.id)} id={`reconcile-${tx.id}`}>
                        <CheckCircle size={14} style={{ color: 'var(--income)' }} />
                      </button>
                    )}
                    <button className="btn-icon" data-tooltip="Delete" onClick={() => deleteTransaction(tx.id)} id={`delete-${tx.id}`}>
                      <Trash2 size={14} style={{ color: 'var(--expense)' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>No transactions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
