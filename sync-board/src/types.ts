// SyncBoard — Shared Types

export type StickyColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple'
export type ShapeType = 'rect' | 'circle' | 'diamond'
export type TaskStatus = 'todo' | 'doing' | 'done'
export type ElementType = 'sticky' | 'shape' | 'connector' | 'text'

export interface Position { x: number; y: number }
export interface Size { width: number; height: number }

export interface BaseElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  locked?: boolean
}

export interface StickyNote extends BaseElement {
  type: 'sticky'
  text: string
  color: StickyColor
  isTask: boolean
  taskStatus?: TaskStatus
  assignee?: string
  dueDate?: string
  fontSize: number
}

export interface ShapeElement extends BaseElement {
  type: 'shape'
  shape: ShapeType
  fill: string
  stroke: string
  label?: string
}

export interface TextElement extends BaseElement {
  type: 'text'
  text: string
  fontSize: number
  bold: boolean
  color: string
}

export interface ConnectorElement {
  id: string
  type: 'connector'
  fromId: string
  toId: string
  label?: string
  zIndex: number
}

export type CanvasElement = StickyNote | ShapeElement | TextElement

export interface LiveCursor {
  userId: string
  name: string
  color: string
  x: number
  y: number
}

export interface BoardUser {
  id: string
  name: string
  avatar: string
  color: string
  online: boolean
}

export type Tool = 'select' | 'sticky' | 'rect' | 'circle' | 'diamond' | 'text' | 'pan' | 'connector'
