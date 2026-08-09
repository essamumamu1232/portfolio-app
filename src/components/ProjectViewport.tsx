import { useStore } from '../store'
import { Monitor, Smartphone, Maximize2 } from 'lucide-react'
import { projects } from '../data/projects'
import CodeStreamPreview from './CodeStreamPreview'
import LedgerLinePreview from './LedgerLinePreview'
import SyncBoardPreview from './SyncBoardPreview'

const previews = {
  'code-stream': <CodeStreamPreview />,
  'ledger-line': <LedgerLinePreview />,
  'sync-board': <SyncBoardPreview />,
}

export default function ProjectViewport() {
  const { activeProject, viewportMode, setViewportMode } = useStore()
  const project = projects.find((p) => p.id === activeProject)!

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
            title="Open local app"
            onClick={() => window.open(project.localUrl, '_blank')}
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      <div className={`viewport-frame ${viewportMode}`}>
        {previews[activeProject]}
      </div>
    </div>
  )
}
