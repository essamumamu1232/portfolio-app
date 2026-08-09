import { useStore } from '../store'
import { projects } from '../data/projects'

export default function ProjectSelector() {
  const { activeProject, setProject } = useStore()

  return (
    <div className="project-selector">
      {projects.map((p, idx) => (
        <button
          key={p.id}
          className={`project-tab ${activeProject === p.id ? 'active' : ''}`}
          onClick={() => setProject(p.id)}
        >
          <div className="tab-num">0{idx + 1}</div>
          <h3>{p.name}</h3>
          <p>{p.tagline}</p>
        </button>
      ))}
    </div>
  )
}
