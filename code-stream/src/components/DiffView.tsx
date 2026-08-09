import React from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued'
import { useAppStore } from '../store'
import styles from './DiffView.module.css'
import { ArrowLeftRight, Check } from 'lucide-react'

const CUSTOM_STYLES = {
  variables: {
    dark: {
      diffViewerBackground: '#0f172a',
      diffViewerColor: '#e2e8f0',
      addedBackground: 'rgba(16, 185, 129, 0.08)',
      addedColor: '#e2e8f0',
      removedBackground: 'rgba(239, 68, 68, 0.08)',
      removedColor: '#e2e8f0',
      wordAddedBackground: 'rgba(16, 185, 129, 0.2)',
      wordRemovedBackground: 'rgba(239, 68, 68, 0.2)',
      addedGutterBackground: 'rgba(16, 185, 129, 0.12)',
      removedGutterBackground: 'rgba(239, 68, 68, 0.12)',
      gutterBackground: '#0f172a',
      gutterBackgroundDark: '#0f172a',
      highlightBackground: '#263148',
      highlightGutterBackground: '#263148',
      codeFoldGutterBackground: '#1e293b',
      codeFoldBackground: '#1e293b',
      emptyLineBackground: '#0f172a',
      gutterColor: '#475569',
      addedGutterColor: '#10b981',
      removedGutterColor: '#ef4444',
      codeFoldContentColor: '#64748b',
      diffViewerTitleBackground: '#1e293b',
      diffViewerTitleColor: '#94a3b8',
      diffViewerTitleBorderColor: '#1e293b',
    }
  }
}

export default function DiffView() {
  const { diffPair } = useAppStore()
  const [splitView, setSplitView] = React.useState(true)

  const additions = diffPair.after.split('\n').length - diffPair.before.split('\n').length
  const isAdded = additions >= 0

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <ArrowLeftRight size={14} />
          <span className={styles.toolbarTitle}>Diff View</span>
          <span className={styles.diffStats}>
            <span className={styles.additions}>+{Math.abs(additions > 0 ? additions : 0)} lines</span>
            <span className={styles.deletions}>-{Math.abs(additions < 0 ? additions : 0)} lines</span>
          </span>
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.viewSwitch}>
            <button
              id="diff-split"
              className={`${styles.switchBtn} ${splitView ? styles.switchActive : ''}`}
              onClick={() => setSplitView(true)}
            >
              Split
            </button>
            <button
              id="diff-unified"
              className={`${styles.switchBtn} ${!splitView ? styles.switchActive : ''}`}
              onClick={() => setSplitView(false)}
            >
              Unified
            </button>
          </div>
        </div>
      </div>

      <div className={styles.labels}>
        <div className={styles.labelBefore}>
          <span className={styles.labelDot} style={{ background: 'var(--danger)' }} />
          Before
        </div>
        <div className={styles.labelAfter}>
          <Check size={12} />
          After
        </div>
      </div>

      <div className={styles.diffWrapper}>
        <ReactDiffViewer
          oldValue={diffPair.before}
          newValue={diffPair.after}
          splitView={splitView}
          useDarkTheme
          compareMethod={DiffMethod.WORDS}
          styles={CUSTOM_STYLES}
          leftTitle="Before — JavaScript"
          rightTitle="After — TypeScript (strict)"
          hideLineNumbers={false}
          showDiffOnly={false}
          extraLinesSurroundingDiff={3}
        />
      </div>
    </div>
  )
}
