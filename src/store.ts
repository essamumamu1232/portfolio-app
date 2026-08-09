import { create } from 'zustand'

type ProjectId = 'code-stream' | 'ledger-line' | 'sync-board'
type ViewportMode = 'desktop' | 'mobile'

interface UIState {
  activeProject: ProjectId
  viewportMode: ViewportMode
  menuOpen: boolean
  setProject: (id: ProjectId) => void
  setViewportMode: (mode: ViewportMode) => void
  toggleMenu: () => void
}

export const useStore = create<UIState>((set) => ({
  activeProject: 'code-stream',
  viewportMode: 'desktop',
  menuOpen: false,
  setProject: (id) => set({ activeProject: id }),
  setViewportMode: (mode) => set({ viewportMode: mode }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
}))
