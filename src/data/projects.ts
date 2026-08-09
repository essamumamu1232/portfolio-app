export interface Project {
  id: 'code-stream' | 'ledger-line' | 'sync-board'
  name: string
  tagline: string
  description: string
  role: string
  stack: string[]
  highlights: string[]
  localUrl: string
}

export const projects: Project[] = [
  {
    id: 'code-stream',
    name: 'CodeStream',
    tagline: 'Real-Time Collaborative Code Review',
    description: 'Developer workspace for live code reviews and snippet sharing with inline commenting.',
    role: 'Lead Frontend Engineer',
    stack: ['React 19', 'TypeScript', 'Vite', 'Monaco Editor', 'Zustand', 'Framer Motion'],
    highlights: [
      'Monaco code editor with syntax highlighting & Git diff viewer',
      'Line-by-line inline commenting threads with replies',
      'Simulated live cursor positions & participant status'
    ],
    localUrl: 'http://localhost:5173',
  },
  {
    id: 'ledger-line',
    name: 'LedgerLine',
    tagline: 'Multi-Tenant Financial Dashboard',
    description: 'Enterprise double-entry accounting platform for SaaS and multi-organization financial management.',
    role: 'Full Stack Engineer',
    stack: ['React 19', 'TypeScript', 'Vite', 'Recharts', 'PapaParse', 'Zustand'],
    highlights: [
      'Dynamic chart of accounts with interactive Recharts visualizations',
      'PapaParse CSV transaction importing & auto-categorization',
      'Role-based tenant switching with complete audit trail'
    ],
    localUrl: 'http://localhost:3002',
  },
  {
    id: 'sync-board',
    name: 'SyncBoard',
    tagline: 'Interactive Canvas Whiteboard',
    description: 'Visual canvas for team brainstorming with draggable elements and live cursor tracking.',
    role: 'Lead Frontend Engineer',
    stack: ['React 19', 'TypeScript', 'Vite', 'React Konva', 'Socket.io', 'Zustand'],
    highlights: [
      'High-performance HTML5 Canvas powered by React Konva',
      'Draggable sticky notes, shapes, text & element connectors',
      'Live multi-user cursor tracking with zoom/pan'
    ],
    localUrl: 'http://localhost:5174',
  },
]
