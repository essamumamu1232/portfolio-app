import { useStore } from '../store'
import { Monitor, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react'
import CodeStreamPreview from './CodeStreamPreview'
import LedgerLinePreview from './LedgerLinePreview'
import SyncBoardPreview from './SyncBoardPreview'

export default function ProjectViewport() {
  const { activeProject, viewportMode, setViewportMode } = useStore()

  const renderPreview = () => {
    switch (activeProject) {
      case 'code-stream':
        return <CodeStreamPreview />
      case 'ledger-line':
        return <LedgerLinePreview />
      case 'sync-board':
        return <SyncBoardPreview />
      default:
        return <LedgerLinePreview />
    }
  }

  const liveUrlMap: Record<string, string> = {
    'ledger-line': './ledger-line/',
    'code-stream': './code-stream/',
    'sync-board': './sync-board/'
  }

  const liveDemoUrl = liveUrlMap[activeProject] || `./${activeProject}/`

  return (
    <div className="viewport-container" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-hover)', background: 'var(--bg-surface)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
      {/* Viewport Toolbar */}
      <div className="viewport-toolbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: '#090d16', borderBottom: '1px solid var(--border-default)', flexWrap: 'wrap', gap: '10px' }}>
        <div className="traffic-lights" style={{ display: 'flex', gap: '6px' }}>
          <span className="tl-red" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
          <span className="tl-yellow" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
          <span className="tl-green" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
        </div>

        {/* Clean URL Display */}
        <div className="viewport-url-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border-default)', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <ShieldCheck size={14} style={{ color: '#10b981' }} />
          <span>https://portfolio.app/{activeProject}</span>
        </div>

        {/* Viewport Controls */}
        <div className="viewport-controls" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-elevated)', padding: '3px', borderRadius: '8px' }}>
            <button
              className={viewportMode === 'desktop' ? 'active' : ''}
              onClick={() => setViewportMode('desktop')}
              style={{ padding: '6px', borderRadius: '6px', border: 'none', background: viewportMode === 'desktop' ? 'var(--accent-primary)' : 'transparent', color: viewportMode === 'desktop' ? 'var(--bg-base)' : 'var(--text-muted)', cursor: 'pointer' }}
              title="Desktop View"
            >
              <Monitor size={15} />
            </button>
            <button
              className={viewportMode === 'mobile' ? 'active' : ''}
              onClick={() => setViewportMode('mobile')}
              style={{ padding: '6px', borderRadius: '6px', border: 'none', background: viewportMode === 'mobile' ? 'var(--accent-primary)' : 'transparent', color: viewportMode === 'mobile' ? 'var(--bg-base)' : 'var(--text-muted)', cursor: 'pointer' }}
              title="Mobile View"
            >
              <Smartphone size={15} />
            </button>
          </div>

          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'var(--accent-primary)',
              color: 'var(--bg-base)',
              fontWeight: 600,
              fontSize: '12px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}
          >
            Open Live Demo <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Viewport Preview Body */}
      <div className={`viewport-frame ${viewportMode}`} style={{ minHeight: '420px', padding: '0', position: 'relative' }}>
        {renderPreview()}
      </div>
    </div>
  )
}
