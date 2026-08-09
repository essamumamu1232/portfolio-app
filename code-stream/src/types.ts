// Types shared across CodeStream

export interface User {
  id: string
  name: string
  avatar: string
  color: string
  email: string
}

export interface Snippet {
  id: string
  title: string
  language: string
  code: string
  createdAt: string
  updatedAt: string
  author: User
}

export interface Comment {
  id: string
  snippetId: string
  line: number
  text: string
  author: User
  createdAt: string
  resolved: boolean
  replies: CommentReply[]
}

export interface CommentReply {
  id: string
  text: string
  author: User
  createdAt: string
}

export interface CursorPosition {
  userId: string
  user: User
  line: number
  column: number
  selection?: { startLine: number; endLine: number; startCol: number; endCol: number }
}

export interface ReviewSession {
  id: string
  name: string
  snippet: Snippet
  participants: User[]
  comments: Comment[]
  cursors: CursorPosition[]
  createdAt: string
  status: 'active' | 'closed'
}

export interface DiffPair {
  before: string
  after: string
  language: string
}
