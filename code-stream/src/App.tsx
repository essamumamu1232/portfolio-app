import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CodeEditor from './components/CodeEditor'
import DiffView from './components/DiffView'
import CommentsPanel from './components/CommentsPanel'
import { useAppStore } from './store'
import styles from './App.module.css'

export default function App() {
  const { activeView } = useAppStore()

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.workspace}>
        <Sidebar />
        <main className={styles.main}>
          {activeView === 'editor' ? <CodeEditor /> : <DiffView />}
        </main>
        <CommentsPanel />
      </div>
    </div>
  )
}
