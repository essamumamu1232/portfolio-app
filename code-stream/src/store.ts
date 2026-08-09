import { create } from 'zustand'
import { User, ReviewSession, Comment, CursorPosition, Snippet, DiffPair } from './types'

// Simulated users for demo
export const DEMO_USERS: User[] = [
  { id: 'u1', name: 'You', avatar: 'Y', color: 'var(--cursor-1)', email: 'you@codestream.dev' },
  { id: 'u2', name: 'Alice Chen', avatar: 'A', color: 'var(--cursor-2)', email: 'alice@codestream.dev' },
  { id: 'u3', name: 'Bob Kumar', avatar: 'B', color: 'var(--cursor-3)', email: 'bob@codestream.dev' },
  { id: 'u4', name: 'Sara Lim', avatar: 'S', color: 'var(--cursor-4)', email: 'sara@codestream.dev' },
]

const SAMPLE_CODE = `import { useState, useEffect, useCallback } from 'react'
import { WebSocketClient } from './ws-client'
import type { CursorPosition, User } from './types'

interface UseLiveCursorsOptions {
  roomId: string
  currentUser: User
}

export function useLiveCursors({ roomId, currentUser }: UseLiveCursorsOptions) {
  const [cursors, setCursors] = useState<Map<string, CursorPosition>>(new Map())
  const [ws, setWs] = useState<WebSocketClient | null>(null)

  useEffect(() => {
    const client = new WebSocketClient(\`wss://api.codestream.dev/rooms/\${roomId}\`)
    
    client.on('cursor_update', (data: CursorPosition) => {
      if (data.userId === currentUser.id) return
      setCursors(prev => new Map(prev).set(data.userId, data))
    })

    client.on('cursor_leave', (userId: string) => {
      setCursors(prev => {
        const next = new Map(prev)
        next.delete(userId)
        return next
      })
    })

    setWs(client)
    return () => client.disconnect()
  }, [roomId, currentUser.id])

  const updateCursor = useCallback((position: Omit<CursorPosition, 'userId' | 'user'>) => {
    ws?.send('cursor_update', { ...position, userId: currentUser.id, user: currentUser })
  }, [ws, currentUser])

  return { cursors: Array.from(cursors.values()), updateCursor }
}`

const SAMPLE_CODE_BEFORE = `function fetchUser(id) {
  return fetch('/api/users/' + id)
    .then(res => res.json())
    .catch(err => console.log(err))
}

function updateProfile(userId, data) {
  return fetch('/api/users/' + userId, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}`

const SAMPLE_CODE_AFTER = `async function fetchUser(id: string): Promise<User> {
  try {
    const res = await fetch(\`/api/users/\${id}\`)
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    return res.json() as Promise<User>
  } catch (error) {
    logger.error('fetchUser failed', { id, error })
    throw error
  }
}

async function updateProfile(userId: string, data: Partial<User>): Promise<User> {
  const res = await fetch(\`/api/users/\${userId}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json() as Promise<User>
}`

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    snippetId: 's1',
    line: 6,
    text: 'We should handle the case where the WebSocket drops mid-session. Consider adding exponential backoff reconnect logic here.',
    author: DEMO_USERS[1],
    createdAt: '2m ago',
    resolved: false,
    replies: [
      {
        id: 'r1',
        text: 'Good catch. I\'ll add a reconnect strategy with max 5 retries.',
        author: DEMO_USERS[0],
        createdAt: '1m ago',
      }
    ]
  },
  {
    id: 'c2',
    snippetId: 's1',
    line: 14,
    text: 'This event handler could cause a memory leak if cursors accumulate. Should we cap the Map size?',
    author: DEMO_USERS[2],
    createdAt: '5m ago',
    resolved: true,
    replies: []
  },
  {
    id: 'c3',
    snippetId: 's1',
    line: 32,
    text: 'The updateCursor dependency array is correct but could benefit from throttling — 60fps updates over WebSocket is overkill.',
    author: DEMO_USERS[3],
    createdAt: '8m ago',
    resolved: false,
    replies: []
  }
]

const INITIAL_SESSION: ReviewSession = {
  id: 'session-1',
  name: 'Review: useLiveCursors hook',
  snippet: {
    id: 's1',
    title: 'useLiveCursors.ts',
    language: 'typescript',
    code: SAMPLE_CODE,
    createdAt: '10m ago',
    updatedAt: '2m ago',
    author: DEMO_USERS[0],
  },
  participants: DEMO_USERS,
  comments: INITIAL_COMMENTS,
  cursors: [
    { userId: 'u2', user: DEMO_USERS[1], line: 6, column: 12 },
    { userId: 'u3', user: DEMO_USERS[2], line: 22, column: 5 },
    { userId: 'u4', user: DEMO_USERS[3], line: 38, column: 18 },
  ],
  createdAt: '10m ago',
  status: 'active',
}

interface AppState {
  currentUser: User
  session: ReviewSession
  activeView: 'editor' | 'diff'
  diffPair: DiffPair
  selectedLine: number | null
  commentDraft: { line: number; text: string } | null
  sidebarCollapsed: boolean
  commentsCollapsed: boolean

  // Actions
  setActiveView: (view: 'editor' | 'diff') => void
  setSelectedLine: (line: number | null) => void
  setCommentDraft: (draft: { line: number; text: string } | null) => void
  addComment: (line: number, text: string) => void
  addReply: (commentId: string, text: string) => void
  resolveComment: (commentId: string) => void
  updateCursor: (line: number, column: number) => void
  updateCode: (code: string) => void
  toggleSidebar: () => void
  toggleComments: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: DEMO_USERS[0],
  session: INITIAL_SESSION,
  activeView: 'editor',
  diffPair: { before: SAMPLE_CODE_BEFORE, after: SAMPLE_CODE_AFTER, language: 'typescript' },
  selectedLine: null,
  commentDraft: null,
  sidebarCollapsed: false,
  commentsCollapsed: false,

  setActiveView: (view) => set({ activeView: view }),
  setSelectedLine: (line) => set({ selectedLine: line }),
  setCommentDraft: (draft) => set({ commentDraft: draft }),

  addComment: (line, text) => {
    const { currentUser, session } = get()
    const newComment: Comment = {
      id: `c${Date.now()}`,
      snippetId: session.snippet.id,
      line,
      text,
      author: currentUser,
      createdAt: 'just now',
      resolved: false,
      replies: [],
    }
    set(state => ({
      session: { ...state.session, comments: [...state.session.comments, newComment] },
      commentDraft: null,
      selectedLine: null,
    }))
  },

  addReply: (commentId, text) => {
    const { currentUser } = get()
    const reply: import('./types').CommentReply = {
      id: `r${Date.now()}`,
      text,
      author: currentUser,
      createdAt: 'just now',
    }
    set(state => ({
      session: {
        ...state.session,
        comments: state.session.comments.map(c =>
          c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
        ),
      },
    }))
  },

  resolveComment: (commentId) => {
    set(state => ({
      session: {
        ...state.session,
        comments: state.session.comments.map(c =>
          c.id === commentId ? { ...c, resolved: !c.resolved } : c
        ),
      },
    }))
  },

  updateCursor: (line, column) => {
    const { currentUser } = get()
    set(state => ({
      session: {
        ...state.session,
        cursors: [
          ...state.session.cursors.filter(c => c.userId !== currentUser.id),
          { userId: currentUser.id, user: currentUser, line, column },
        ],
      },
    }))
  },

  updateCode: (code) => {
    set(state => ({
      session: {
        ...state.session,
        snippet: { ...state.session.snippet, code, updatedAt: 'just now' },
      },
    }))
  },

  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleComments: () => set(state => ({ commentsCollapsed: !state.commentsCollapsed })),
}))
