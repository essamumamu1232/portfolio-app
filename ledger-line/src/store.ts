import { create } from 'zustand'
import { Account, Transaction, AuditLog, User, Tenant, CashFlowPoint, ExpenseCategory } from './types'

const TENANT: Tenant = {
  id: 't1',
  name: 'Meridian Digital LLC',
  industry: 'Software & Technology',
  currency: 'USD',
  createdAt: '2024-01-15',
}

const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Carter',
  email: 'alex@meridian.io',
  role: 'admin',
  tenantId: 't1',
  avatar: 'AC',
}

const ACCOUNTS: Account[] = [
  { id: 'a1', code: '1000', name: 'Cash & Cash Equivalents', type: 'asset', balance: 284750.00, tenantId: 't1' },
  { id: 'a2', code: '1100', name: 'Accounts Receivable', type: 'asset', balance: 98420.50, tenantId: 't1' },
  { id: 'a3', code: '1200', name: 'Prepaid Expenses', type: 'asset', balance: 12800.00, tenantId: 't1' },
  { id: 'a4', code: '2000', name: 'Accounts Payable', type: 'liability', balance: -45320.00, tenantId: 't1' },
  { id: 'a5', code: '2100', name: 'Accrued Liabilities', type: 'liability', balance: -18900.00, tenantId: 't1' },
  { id: 'a6', code: '3000', name: "Owner's Equity", type: 'equity', balance: 331750.50, tenantId: 't1' },
  { id: 'a7', code: '4000', name: 'Software Revenue', type: 'revenue', balance: 520000.00, tenantId: 't1' },
  { id: 'a8', code: '4100', name: 'Consulting Revenue', type: 'revenue', balance: 86500.00, tenantId: 't1' },
  { id: 'a9', code: '5000', name: 'Payroll Expense', type: 'expense', balance: -218400.00, tenantId: 't1' },
  { id: 'a10', code: '5100', name: 'Infrastructure & Cloud', type: 'expense', balance: -42600.00, tenantId: 't1' },
  { id: 'a11', code: '5200', name: 'Marketing & Ads', type: 'expense', balance: -28900.00, tenantId: 't1' },
  { id: 'a12', code: '5300', name: 'Office & Facilities', type: 'expense', balance: -11200.00, tenantId: 't1' },
]

const TRANSACTIONS: Transaction[] = [
  { id: 'tx1', date: '2026-08-01', description: 'Monthly SaaS subscriptions — Q3 batch', category: 'Software Revenue', amount: 48500, type: 'credit', accountId: 'a7', accountName: 'Software Revenue', status: 'cleared', tenantId: 't1', reference: 'INV-2026-0801' },
  { id: 'tx2', date: '2026-08-01', description: 'AWS infrastructure — July invoice', category: 'Infrastructure & Cloud', amount: 8420, type: 'debit', accountId: 'a10', accountName: 'Infrastructure & Cloud', status: 'cleared', tenantId: 't1', reference: 'AWS-JUL26' },
  { id: 'tx3', date: '2026-07-28', description: 'Payroll disbursement — July 2026', category: 'Payroll Expense', amount: 72800, type: 'debit', accountId: 'a9', accountName: 'Payroll Expense', status: 'reconciled', tenantId: 't1', reference: 'PAYROLL-0726' },
  { id: 'tx4', date: '2026-07-25', description: 'Google Ads campaign — July', category: 'Marketing & Ads', amount: 5200, type: 'debit', accountId: 'a11', accountName: 'Marketing & Ads', status: 'cleared', tenantId: 't1' },
  { id: 'tx5', date: '2026-07-22', description: 'Consulting retainer — Apex Corp', category: 'Consulting Revenue', amount: 18500, type: 'credit', accountId: 'a8', accountName: 'Consulting Revenue', status: 'cleared', tenantId: 't1', reference: 'INV-C-0722' },
  { id: 'tx6', date: '2026-07-20', description: 'Office lease payment — Q3', category: 'Office & Facilities', amount: 5600, type: 'debit', accountId: 'a12', accountName: 'Office & Facilities', status: 'cleared', tenantId: 't1' },
  { id: 'tx7', date: '2026-07-18', description: 'Enterprise license — TechMate Inc', category: 'Software Revenue', amount: 24000, type: 'credit', accountId: 'a7', accountName: 'Software Revenue', status: 'pending', tenantId: 't1', reference: 'INV-2026-0718' },
  { id: 'tx8', date: '2026-07-15', description: 'Vendor payment — Stripe processing fees', category: 'Infrastructure & Cloud', amount: 1840, type: 'debit', accountId: 'a10', accountName: 'Infrastructure & Cloud', status: 'cleared', tenantId: 't1' },
  { id: 'tx9', date: '2026-07-12', description: 'Refund issued — Client downgrade', category: 'Software Revenue', amount: 2400, type: 'debit', accountId: 'a7', accountName: 'Software Revenue', status: 'cleared', tenantId: 't1' },
  { id: 'tx10', date: '2026-07-05', description: 'New enterprise onboarding — Vector AI', category: 'Software Revenue', amount: 36000, type: 'credit', accountId: 'a7', accountName: 'Software Revenue', status: 'cleared', tenantId: 't1', reference: 'INV-2026-0705' },
]

const CASH_FLOW: CashFlowPoint[] = [
  { month: 'Feb', income: 82400, expenses: 74200, net: 8200 },
  { month: 'Mar', income: 91500, expenses: 79800, net: 11700 },
  { month: 'Apr', income: 88200, expenses: 76400, net: 11800 },
  { month: 'May', income: 105600, expenses: 84200, net: 21400 },
  { month: 'Jun', income: 112400, expenses: 88900, net: 23500 },
  { month: 'Jul', income: 128900, expenses: 92800, net: 36100 },
  { month: 'Aug', income: 134500, expenses: 95200, net: 39300 },
]

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: 'Payroll', amount: 72800, percentage: 56, color: '#2563eb' },
  { name: 'Infrastructure', amount: 8420, percentage: 18, color: '#7c3aed' },
  { name: 'Marketing', amount: 5200, percentage: 14, color: '#ea580c' },
  { name: 'Office', amount: 5600, percentage: 9, color: '#059669' },
  { name: 'Other', amount: 3180, percentage: 3, color: '#94a3b8' },
]

const AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', action: 'CREATE', entity: 'Transaction', entityId: 'tx1', userId: 'u1', userName: 'Alex Carter', timestamp: '2026-08-01 09:14:32', changes: { amount: 48500, type: 'credit' } },
  { id: 'al2', action: 'UPDATE', entity: 'Account', entityId: 'a7', userId: 'u1', userName: 'Alex Carter', timestamp: '2026-08-01 09:14:33', changes: { balance: { from: 471500, to: 520000 } } },
  { id: 'al3', action: 'CREATE', entity: 'Transaction', entityId: 'tx2', userId: 'u2', userName: 'Jordan Kim', timestamp: '2026-08-01 10:22:08', changes: { amount: 8420, type: 'debit' } },
  { id: 'al4', action: 'RECONCILE', entity: 'Transaction', entityId: 'tx3', userId: 'u1', userName: 'Alex Carter', timestamp: '2026-07-28 18:05:11', changes: { status: { from: 'cleared', to: 'reconciled' } } },
]

export type ActivePage = 'dashboard' | 'accounts' | 'transactions' | 'reports' | 'audit' | 'import'

interface LedgerState {
  tenant: Tenant
  currentUser: User
  accounts: Account[]
  transactions: Transaction[]
  auditLogs: AuditLog[]
  cashFlow: CashFlowPoint[]
  expenseCategories: ExpenseCategory[]
  activePage: ActivePage
  importModalOpen: boolean
  importedRows: Transaction[]

  // KPIs
  totalRevenue: number
  totalExpenses: number
  netIncome: number
  cashBalance: number

  // Actions
  setActivePage: (page: ActivePage) => void
  addTransaction: (tx: Omit<Transaction, 'id' | 'tenantId'>) => void
  deleteTransaction: (id: string) => void
  reconcileTransaction: (id: string) => void
  openImport: () => void
  closeImport: () => void
  setImportedRows: (rows: Transaction[]) => void
  confirmImport: () => void
}

export const useLedgerStore = create<LedgerState>((set, get) => ({
  tenant: TENANT,
  currentUser: CURRENT_USER,
  accounts: ACCOUNTS,
  transactions: TRANSACTIONS,
  auditLogs: AUDIT_LOGS,
  cashFlow: CASH_FLOW,
  expenseCategories: EXPENSE_CATEGORIES,
  activePage: 'dashboard',
  importModalOpen: false,
  importedRows: [],

  totalRevenue: 606500,
  totalExpenses: 301100,
  netIncome: 305400,
  cashBalance: 284750,

  setActivePage: (page) => set({ activePage: page }),

  addTransaction: (tx) => {
    const newTx: Transaction = { ...tx, id: `tx${Date.now()}`, tenantId: get().tenant.id }
    const log: AuditLog = {
      id: `al${Date.now()}`,
      action: 'CREATE',
      entity: 'Transaction',
      entityId: newTx.id,
      userId: get().currentUser.id,
      userName: get().currentUser.name,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      changes: { amount: tx.amount, type: tx.type },
    }
    set(state => ({ transactions: [newTx, ...state.transactions], auditLogs: [log, ...state.auditLogs] }))
  },

  deleteTransaction: (id) => set(state => ({ transactions: state.transactions.filter(t => t.id !== id) })),

  reconcileTransaction: (id) => set(state => ({
    transactions: state.transactions.map(t => t.id === id ? { ...t, status: 'reconciled' as const } : t)
  })),

  openImport: () => set({ importModalOpen: true }),
  closeImport: () => set({ importModalOpen: false, importedRows: [] }),
  setImportedRows: (rows) => set({ importedRows: rows }),

  confirmImport: () => {
    const { importedRows } = get()
    set(state => ({
      transactions: [...importedRows, ...state.transactions],
      importModalOpen: false,
      importedRows: [],
    }))
  },
}))
