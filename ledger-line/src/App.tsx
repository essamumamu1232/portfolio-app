import React from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Accounts from './components/Accounts'
import Transactions from './components/Transactions'
import ImportCSV from './components/ImportCSV'
import Reports from './components/Reports'
import AuditLog from './components/AuditLog'
import { useLedgerStore } from './store'
import styles from './App.module.css'

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  accounts: 'Chart of Accounts',
  transactions: 'Transactions',
  import: 'Import CSV',
  reports: 'Reports',
  audit: 'Audit Log',
}

export default function App() {
  const { activePage, currentUser, tenant } = useLedgerStore()

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />
      case 'accounts':     return <Accounts />
      case 'transactions': return <Transactions />
      case 'import':       return <ImportCSV />
      case 'reports':      return <Reports />
      case 'audit':        return <AuditLog />
      default:             return <Dashboard />
    }
  }

  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>{PAGE_TITLES[activePage]}</h1>
            <span className={styles.tenantBadge}>{tenant.currency}</span>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.searchWrap}>
              <input className={styles.globalSearch} placeholder="Quick search…" id="global-search" />
            </div>
            <div className={styles.userChip}>
              <div className={styles.userAvatar}>{currentUser.avatar}</div>
              <span>{currentUser.name}</span>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          {renderPage()}
        </div>
      </div>
    </div>
  )
}
