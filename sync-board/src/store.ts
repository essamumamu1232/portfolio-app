import { create } from 'zustand'
import { CanvasElement, StickyNote, ShapeElement, TextElement, ConnectorElement, Tool, LiveCursor, BoardUser, StickyColor, ShapeType, TaskStatus } from './types'

export const BOARD_USERS: BoardUser[] = [
  { id: 'u1', name: 'You', avatar: 'Y', color: '#f43f5e', online: true },
  { id: 'u2', name: 'Maya Patel', avatar: 'M', color: '#8b5cf6', online: true },
  { id: 'u3', name: 'Liam Torres', avatar: 'L', color: '#06b6d4', online: false },
  { id: 'u4', name: 'Priya Singh', avatar: 'P', color: '#f97316', online: true },
]

const INITIAL_ELEMENTS: CanvasElement[] = [
  {
    id: 'el1',
    type: 'sticky',
    x: 120, y: 100,
    width: 200, height: 180,
    zIndex: 1,
    text: '🚀 Sprint 12 Kickoff\n\nDefine MVP scope and assign tasks to team members.',
    color: 'yellow',
    isTask: false,
    fontSize: 14,
  },
  {
    id: 'el2',
    type: 'sticky',
    x: 360, y: 80,
    width: 200, height: 180,
    zIndex: 2,
    text: 'Set up WebSocket auth middleware',
    color: 'pink',
    isTask: true,
    taskStatus: 'doing',
    assignee: 'Maya Patel',
    dueDate: '2026-08-10',
    fontSize: 13,
  },
  {
    id: 'el3',
    type: 'sticky',
    x: 600, y: 100,
    width: 200, height: 180,
    zIndex: 3,
    text: 'Write E2E tests for canvas interactions',
    color: 'blue',
    isTask: true,
    taskStatus: 'todo',
    assignee: 'You',
    dueDate: '2026-08-15',
    fontSize: 13,
  },
  {
    id: 'el4',
    type: 'sticky',
    x: 840, y: 80,
    width: 200, height: 180,
    zIndex: 4,
    text: 'Design new onboarding flow ✓',
    color: 'green',
    isTask: true,
    taskStatus: 'done',
    assignee: 'Priya Singh',
    fontSize: 13,
  },
  {
    id: 'el5',
    type: 'sticky',
    x: 200, y: 330,
    width: 220, height: 150,
    zIndex: 5,
    text: '💡 Idea: Add voice annotations to sticky notes for async review',
    color: 'purple',
    isTask: false,
    fontSize: 13,
  },
  {
    id: 'el6',
    type: 'sticky',
    x: 500, y: 340,
    width: 200, height: 150,
    zIndex: 6,
    text: 'Implement undo/redo stack with 50-step history',
    color: 'yellow',
    isTask: true,
    taskStatus: 'todo',
    assignee: 'Liam Torres',
    fontSize: 13,
  },
  {
    id: 'el7',
    type: 'shape',
    x: 720, y: 320,
    width: 180, height: 100,
    zIndex: 7,
    shape: 'rect',
    fill: 'rgba(99,102,241,0.08)',
    stroke: '#6366f1',
    label: 'System Architecture',
  },
  {
    id: 'el8',
    type: 'text',
    x: 120, y: 530,
    width: 300, height: 40,
    zIndex: 8,
    text: '📌 Goal: Ship v2.0 by August 30th',
    fontSize: 16,
    bold: true,
    color: '#374151',
  },
]

const INITIAL_CURSORS: LiveCursor[] = [
  { userId: 'u2', name: 'Maya Patel', color: '#8b5cf6', x: 450, y: 250 },
  { userId: 'u4', name: 'Priya Singh', color: '#f97316', x: 710, y: 180 },
]

interface HistoryEntry {
  elements: CanvasElement[]
}

interface BoardState {
  currentUser: BoardUser
  users: BoardUser[]
  elements: CanvasElement[]
  connectors: ConnectorElement[]
  cursors: LiveCursor[]
  selectedId: string | null
  tool: Tool
  zoom: number
  pan: { x: number; y: number }
  history: HistoryEntry[]
  historyIndex: number
  boardName: string
  isPanning: boolean

  // Actions
  setTool: (tool: Tool) => void
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
  setSelected: (id: string | null) => void
  updateCursor: (x: number, y: number) => void
  addSticky: (x: number, y: number, color?: StickyColor) => void
  addShape: (x: number, y: number, shape: ShapeType) => void
  addText: (x: number, y: number) => void
  updateElement: (id: string, updates: Partial<CanvasElement>) => void
  deleteElement: (id: string) => void
  moveElement: (id: string, x: number, y: number) => void
  toggleTask: (id: string) => void
  setTaskStatus: (id: string, status: TaskStatus) => void
  undo: () => void
  redo: () => void
  exportPNG: () => void
  exportJSON: () => void
}

let nextZIndex = 10

export const useBoardStore = create<BoardState>((set, get) => ({
  currentUser: BOARD_USERS[0],
  users: BOARD_USERS,
  elements: INITIAL_ELEMENTS,
  connectors: [],
  cursors: INITIAL_CURSORS,
  selectedId: null,
  tool: 'select',
  zoom: 1,
  pan: { x: 0, y: 0 },
  history: [{ elements: INITIAL_ELEMENTS }],
  historyIndex: 0,
  boardName: 'Sprint 12 Planning',
  isPanning: false,

  setTool: (tool) => set({ tool }),
  setZoom: (zoom) => set({ zoom: Math.min(Math.max(zoom, 0.25), 3) }),
  setPan: (pan) => set({ pan }),
  setSelected: (id) => set({ selectedId: id }),
  updateCursor: (x, y) => {
    const { currentUser } = get()
    set(state => ({
      cursors: [
        ...state.cursors.filter(c => c.userId !== currentUser.id),
        { userId: currentUser.id, name: currentUser.name, color: currentUser.color, x, y },
      ]
    }))
  },

  addSticky: (x, y, color = 'yellow') => {
    const newEl: StickyNote = {
      id: `sticky-${Date.now()}`,
      type: 'sticky',
      x, y,
      width: 200, height: 170,
      zIndex: ++nextZIndex,
      text: 'New note…',
      color,
      isTask: false,
      fontSize: 13,
    }
    set(state => {
      const elements = [...state.elements, newEl]
      return { elements, selectedId: newEl.id, history: [...state.history.slice(0, state.historyIndex + 1), { elements }], historyIndex: state.historyIndex + 1 }
    })
  },

  addShape: (x, y, shape) => {
    const newEl: ShapeElement = {
      id: `shape-${Date.now()}`,
      type: 'shape',
      x, y,
      width: 160, height: 100,
      zIndex: ++nextZIndex,
      shape,
      fill: 'rgba(99,102,241,0.08)',
      stroke: '#6366f1',
      label: '',
    }
    set(state => {
      const elements = [...state.elements, newEl]
      return { elements, selectedId: newEl.id, history: [...state.history.slice(0, state.historyIndex + 1), { elements }], historyIndex: state.historyIndex + 1 }
    })
  },

  addText: (x, y) => {
    const newEl: TextElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      x, y,
      width: 200, height: 36,
      zIndex: ++nextZIndex,
      text: 'Double-click to edit',
      fontSize: 16,
      bold: false,
      color: '#374151',
    }
    set(state => {
      const elements = [...state.elements, newEl]
      return { elements, selectedId: newEl.id, history: [...state.history.slice(0, state.historyIndex + 1), { elements }], historyIndex: state.historyIndex + 1 }
    })
  },

  updateElement: (id, updates) => {
    set(state => {
      const elements = state.elements.map(el => el.id === id ? { ...el, ...updates } as CanvasElement : el)
      return { elements }
    })
  },

  deleteElement: (id) => {
    set(state => {
      const elements = state.elements.filter(el => el.id !== id)
      return { elements, selectedId: null }
    })
  },

  moveElement: (id, x, y) => {
    set(state => ({
      elements: state.elements.map(el => el.id === id ? { ...el, x, y, zIndex: ++nextZIndex } as CanvasElement : el)
    }))
  },

  toggleTask: (id) => {
    set(state => ({
      elements: state.elements.map(el => {
        if (el.id === id && el.type === 'sticky') {
          return { ...el, isTask: !(el as StickyNote).isTask, taskStatus: !(el as StickyNote).isTask ? 'todo' : undefined }
        }
        return el
      })
    }))
  },

  setTaskStatus: (id, status) => {
    set(state => ({
      elements: state.elements.map(el => el.id === id ? { ...el, taskStatus: status } as CanvasElement : el)
    }))
  },

  undo: () => {
    const { historyIndex, history } = get()
    if (historyIndex > 0) {
      set({ historyIndex: historyIndex - 1, elements: history[historyIndex - 1].elements })
    }
  },

  redo: () => {
    const { historyIndex, history } = get()
    if (historyIndex < history.length - 1) {
      set({ historyIndex: historyIndex + 1, elements: history[historyIndex + 1].elements })
    }
  },

  exportPNG: () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'syncboard-export.png'
    link.click()
  },

  exportJSON: () => {
    const { elements, connectors, boardName } = get()
    const data = JSON.stringify({ boardName, elements, connectors }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'syncboard.json'; a.click()
  },
}))
