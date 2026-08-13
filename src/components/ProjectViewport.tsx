import { lazy, Suspense } from 'react'
import { useStore } from '../store'
import { Monitor, Smartphone, Maximize2 } from 'lucide-react'
import { projects } from '../data/projects'

const CodeStreamPreview = lazy(() => import('./CodeStreamPreview'))
const LedgerLinePreview = lazy(() => import('./LedgerLinePreview'))
const SyncBoardPreview = lazy(() => import('./SyncBoardPreview'))

export default function ProjectViewport() {
  const { activeProject, viewportMode, setViewportMode } = useStore()
  const project = projects.find((p) => p.id === activeProject)!

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

  return (
    <div className="viewport-container">
      <div className="viewport-toolbar">
        <div className="traffic-lights">
          <span className="tl-red" />
          <span className="tl-yellow" />
          <span className="tl-green" />
        </div>
        <div className="viewport-url-bar">
          <span style={{ opacity: 0.6 }}>🔒</span>
          <span>{project.localUrl}</span>
        </div>
        <div className="viewport-controls">
          <button
            className={viewportMode === 'desktop' ? 'active' : ''}
            onClick={() => setViewportMode('desktop')}
            title="Desktop"
          >
            <Monitor size={16} />
          </button>
          <button
            className={viewportMode === 'mobile' ? 'active' : ''}
            onClick={() => setViewportMode('mobile')}
            title="Mobile"
          >
            <Smartphone size={16} />
          </button>
          <button
            title="Open demo app"
            onClick={() => window.open(project.localUrl, '_blank')}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <div className={`viewport-frame ${viewportMode}`}>
        <Suspense fallback={
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
            Loading preview interactive viewport...
          </div>
        }>
          {renderPreview()}
        </Suspense>
      </div>
    </div>
  )
}
