// LedgerLine — Shared Types

export type Role = 'admin' | 'accountant' | 'viewer'
export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'
export type TxStatus = 'cleared' | 'pending' | 'reconciled'

export interface Tenant {
  id: string
  name: string
  industry: string
  currency: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  tenantId: string
  avatar: string
}

export interface Account {
  id: string
  code: string
  name: string
  type: AccountType
  balance: number
  description?: string
  tenantId: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: 'debit' | 'credit'
  accountId: string
  accountName: string
  status: TxStatus
  tenantId: string
  reference?: string
}

export interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId: string
  userName: string
  timestamp: string
  changes: Record<string, unknown>
}

export interface CashFlowPoint {
  month: string
  income: number
  expenses: number
  net: number
}

export interface ExpenseCategory {
  name: string
  amount: number
  percentage: number
  color: string
}
