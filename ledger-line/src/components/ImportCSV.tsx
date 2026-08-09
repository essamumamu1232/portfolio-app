import React, { useState, useCallback } from 'react'
import { useLedgerStore } from '../store'
import styles from './ImportCSV.module.css'
import Papa from 'papaparse'
import { Upload, X, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react'
import { Transaction } from '../types'

const REQUIRED_COLUMNS = ['date', 'description', 'amount', 'type']

export default function ImportCSV() {
  const { importedRows, setImportedRows, confirmImport } = useLedgerStore()
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [rawHeaders, setRawHeaders] = useState<string[]>([])
  const [rawRows, setRawRows] = useState<string[][]>([])
  const [step, setStep] = useState<'upload' | 'map' | 'preview'>('upload')

  const handleFile = (file: File) => {
    setFileName(file.name)
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (result) => {
        const rows = result.data as string[][]
        const headers = rows[0].map(h => h.trim().toLowerCase())
        setRawHeaders(headers)
        setRawRows(rows.slice(1))
        // Auto-map obvious columns
        const autoMap: Record<string, string> = {}
        REQUIRED_COLUMNS.forEach(col => {
          const match = headers.find(h => h.includes(col))
          if (match) autoMap[col] = match
        })
        setMapping(autoMap)
        setStep('map')
      }
    })
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.name.endsWith('.csv')) handleFile(file)
  }, [])

  const applyMapping = () => {
    const errs: string[] = []
    REQUIRED_COLUMNS.forEach(col => { if (!mapping[col]) errs.push(`Missing mapping for: ${col}`) })
    if (errs.length) { setErrors(errs); return }
    setErrors([])

    const headerIdx = rawHeaders
    const mapped = rawRows.slice(0, 20).map((row, i) => {
      const get = (col: string) => row[headerIdx.indexOf(mapping[col])] ?? ''
      const amount = parseFloat(get('amount').replace(/[^0-9.-]/g, '')) || 0
      return {
        id: `import-${Date.now()}-${i}`,
        date: get('date'),
        description: get('description') || get('desc') || 'Imported',
        category: get('category') || 'Imported',
        amount: Math.abs(amount),
        type: (get('type')?.toLowerCase().includes('credit') ? 'credit' : 'debit') as 'credit' | 'debit',
        accountId: 'a1',
        accountName: 'Cash & Cash Equivalents',
        status: 'pending' as const,
        tenantId: 't1',
      } as Transaction
    })
    setImportedRows(mapped)
    setStep('preview')
  }

  const reset = () => {
    setStep('upload')
    setFileName(null)
    setRawHeaders([])
    setRawRows([])
    setMapping({})
    setErrors([])
    setImportedRows([])
  }

  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>Import Transactions</h2>
        <p className={styles.subtitle}>Upload a CSV file, map columns, preview rows, then confirm import.</p>
      </div>

      {/* Step indicator */}
      <div className={styles.steps}>
        {['Upload', 'Map Columns', 'Preview & Confirm'].map((s, i) => {
          const stepMap = ['upload', 'map', 'preview']
          const active = stepMap[i] === step
          const done = stepMap.indexOf(step) > i
          return (
            <React.Fragment key={s}>
              <div className={`${styles.step} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}>
                <div className={styles.stepNum}>{done ? <CheckCircle size={14} /> : i + 1}</div>
                <span>{s}</span>
              </div>
              {i < 2 && <div className={`${styles.stepLine} ${done ? styles.stepLineDone : ''}`} />}
            </React.Fragment>
          )
        })}
      </div>

      {step === 'upload' && (
        <div
          id="drop-zone"
          className={`${styles.dropZone} ${dragging ? styles.dragging : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <Upload size={36} className={styles.uploadIcon} />
          <p className={styles.dropTitle}>Drag & drop your CSV file here</p>
          <p className={styles.dropSub}>or</p>
          <label className="btn btn-primary" htmlFor="file-input" style={{ cursor: 'pointer' }}>
            Browse File
          </label>
          <input id="file-input" type="file" accept=".csv" style={{ display: 'none' }}
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <p className={styles.dropHint}>Expected columns: date, description, amount, type (credit/debit)</p>
        </div>
      )}

      {step === 'map' && (
        <div className={`card ${styles.mapCard} animate-slide-up`}>
          <div className={styles.mapHeader}>
            <FileText size={16} />
            <span>{fileName}</span>
            <span className={styles.mapSub}>{rawRows.length} rows detected</span>
            <button className="btn-icon" onClick={reset}><X size={14} /></button>
          </div>
          <div className={styles.mapGrid}>
            {REQUIRED_COLUMNS.map(col => (
              <div key={col} className={styles.mapRow}>
                <span className={styles.mapCol}>{col}</span>
                <ArrowRight size={14} className={styles.mapArrow} />
                <select className="select" value={mapping[col] ?? ''} onChange={e => setMapping(m => ({ ...m, [col]: e.target.value }))}>
                  <option value="">— select column —</option>
                  {rawHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
          </div>
          {errors.length > 0 && (
            <div className={styles.errors}>
              {errors.map(e => <div key={e} className={styles.error}><AlertCircle size={12} />{e}</div>)}
            </div>
          )}
          <div className={styles.mapActions}>
            <button className="btn btn-outline" onClick={reset}>Back</button>
            <button id="apply-mapping" className="btn btn-primary" onClick={applyMapping}>Preview Rows</button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className={`card ${styles.previewHeader}`}>
            <CheckCircle size={16} style={{ color: 'var(--income)' }} />
            <span style={{ fontWeight: 600 }}>{importedRows.length} rows ready to import</span>
            <button className="btn btn-outline" onClick={reset} style={{ marginLeft: 'auto' }}>Start Over</button>
            <button id="confirm-import" className="btn btn-primary" onClick={confirmImport}>
              Confirm Import
            </button>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {importedRows.map((row, i) => (
                  <tr key={i}>
                    <td className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.date}</td>
                    <td style={{ fontSize: 13 }}>{row.description}</td>
                    <td><span className={`badge ${row.type === 'credit' ? 'badge-income' : 'badge-expense'}`}>{row.category}</span></td>
                    <td><span className={`badge ${row.type === 'credit' ? 'badge-income' : 'badge-expense'}`}>{row.type}</span></td>
                    <td className={row.type === 'credit' ? 'amount-pos' : 'amount-neg'}>{fmt(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
