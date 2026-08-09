import React from 'react'
import BoardHeader from './components/BoardHeader'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <BoardHeader />
      <div className={styles.canvasArea}>
        <Canvas />
        <Toolbar />
      </div>
    </div>
  )
}
