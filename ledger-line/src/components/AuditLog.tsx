import React from 'react'
import { useLedgerStore } from '../store'
import styles from './AuditLog.module.css'
import { Shield, Clock, User, ArrowRight } from 'lucide-react'

const ACTION_COLOR: Record<string, string> = {
  CREATE: 'var(--income)',
  UPDATE: 'var(--asset)',
  DELETE: 'var(--expense)',
  RECONCILE: 'var(--liability)',
}

export default function AuditLog() {
  const { auditLogs } = useLedgerStore()

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <Shield size={20} className={styles.headerIcon} />
        <div>
          <h2 className={styles.title}>Audit Log</h2>
          <p className={styles.subtitle}>Immutable record of all data changes. Read-only.</p>
        </div>
        <span className={`badge badge-income`} style={{ marginLeft: 'auto' }}>Tamper-proof</span>
      </div>

      <div className={`card`} style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action</th>
              <th>Entity</th>
              <th>User</th>
              <th>Changes</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id} id={`audit-${log.id}`}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                    <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{log.timestamp}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.actionBadge} style={{ color: ACTION_COLOR[log.action] ?? 'var(--text-muted)', background: `${ACTION_COLOR[log.action]}18` }}>
                    {log.action}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-primary)' }}>{log.entity}</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: 6 }}>#{log.entityId}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className={styles.userDot} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{log.userName}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.changes}>
                    {Object.entries(log.changes).map(([k, v]) => (
                      <span key={k} className={styles.change}>
                        <span className={styles.changeKey}>{k}</span>
                        {typeof v === 'object' && v !== null && 'from' in (v as any) ? (
                          <>
                            <span className={styles.changeFrom}>{String((v as any).from)}</span>
                            <ArrowRight size={10} />
                            <span className={styles.changeTo}>{String((v as any).to)}</span>
                          </>
                        ) : (
                          <span className={styles.changeVal}>{JSON.stringify(v)}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.notice}>
        <Shield size={12} />
        This log is append-only. Records cannot be modified or deleted. All timestamps are UTC.
      </div>
    </div>
  )
}
