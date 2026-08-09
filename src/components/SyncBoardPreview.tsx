export default function SyncBoardPreview() {
  return (
    <div className="sb-preview">
      <div className="sb-toolbar">
        <div className="sb-tool" style={{ borderColor: '#ef4444' }} />
        <div className="sb-tool" style={{ borderColor: '#3b82f6' }} />
        <div className="sb-tool" style={{ borderColor: '#10b981' }} />
        <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />
        <div className="sb-tool">T</div>
        <div className="sb-tool">□</div>
        <div className="sb-tool">○</div>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#6b7280' }}>Zoom: 100%</div>
      </div>
      <div className="sb-canvas">
        <div className="sb-sticky" style={{ top: '24px', left: '24px', background: '#fef3c7' }}>
          <strong>Backend</strong>
          <p>Refactor auth middleware</p>
        </div>
        <div className="sb-sticky" style={{ top: '160px', left: '200px', background: '#dbeafe' }}>
          <strong>Design</strong>
          <p>Update wireframes v2</p>
        </div>
        <div className="sb-sticky" style={{ top: '80px', left: '380px', background: '#d1fae5' }}>
          <strong>QA</strong>
          <p>Test CSV import edge cases</p>
        </div>
        <div className="sb-shape sb-circle" style={{ top: '220px', left: '60px' }} />
        <div className="sb-shape sb-rect" style={{ top: '280px', left: '280px' }} />
        <svg className="sb-connector">
          <line x1="140" y1="70" x2="200" y2="180" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="340" y1="140" x2="380" y2="110" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
        <div className="sb-cursor" style={{ top: '120px', left: '320px' }}>
          <div className="sb-cursor-icon" />
          <span style={{ color: '#ef4444' }}>Sarah</span>
        </div>
        <div className="sb-cursor" style={{ top: '260px', left: '160px' }}>
          <div className="sb-cursor-icon" style={{ borderLeftColor: '#3b82f6' }} />
          <span style={{ color: '#3b82f6' }}>Mike</span>
        </div>
      </div>
    </div>
  )
}
