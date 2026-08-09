import React from 'react'
import { useLedgerStore, ActivePage } from '../store'
import styles from './Sidebar.module.css'
import {
  LayoutDashboard, BookOpen, ArrowLeftRight, BarChart3,
  Shield, Upload, ChevronRight, Settings, LogOut, Building2
} from 'lucide-react'

const NAV_ITEMS: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { id: 'accounts', label: 'Chart of Accounts', icon: <BookOpen size={16} /> },
  { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={16} /> },
  { id: 'import', label: 'Import CSV', icon: <Upload size={16} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={16} /> },
  { id: 'audit', label: 'Audit Log', icon: <Shield size={16} /> },
]

const ROLE_COLOR: Record<string, string> = {
  admin: '#f59e0b',
  accountant: '#2563eb',
  viewer: '#6b7280',
}

export default function Sidebar() {
  const { activePage, setActivePage, currentUser, tenant } = useLedgerStore()

  return (
    <aside className={styles.sidebar}>
      {/* Org */}
      <div className={styles.org}>
        <div className={styles.orgIcon}>
          <Building2 size={16} />
        </div>
        <div className={styles.orgInfo}>
          <span className={styles.orgName}>{tenant.name}</span>
          <span className={styles.orgIndustry}>{tenant.industry}</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Nav */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`${styles.navItem} ${activePage === item.id ? styles.navActive : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
            {activePage === item.id && <ChevronRight size={12} className={styles.navChevron} />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.userCard}>
          <div className={styles.userAvatar}>{currentUser.avatar}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{currentUser.name}</span>
            <span className={styles.userRole} style={{ color: ROLE_COLOR[currentUser.role] }}>
              {currentUser.role}
            </span>
          </div>
        </div>
        <div className={styles.footerActions}>
          <button className={styles.footerBtn} data-tooltip="Settings"><Settings size={14} /></button>
          <button className={styles.footerBtn} data-tooltip="Sign out"><LogOut size={14} /></button>
        </div>
      </div>
    </aside>
  )
}
