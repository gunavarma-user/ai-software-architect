import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlueprint } from '../context/BlueprintContext'
import { getProjects, getProject, deleteProject } from '../services/api'
import { History, Trash2, ExternalLink, FolderOpen } from 'lucide-react'
import '../styles/HistoryPage.css'

export default function HistoryPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { loadBlueprint } = useBlueprint()
  const navigate = useNavigate()

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data.projects || [])
    } catch (err) {
      setError('Failed to load project history. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpen = async (id) => {
    try {
      const data = await getProject(id)
      loadBlueprint(data.blueprint, data.mode)
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to load project.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    try {
      await deleteProject(id)
      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      setError('Failed to delete project.')
    }
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>
          <History size={24} style={{ marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
          Project History
        </h1>
        <p>Previously generated architecture blueprints</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="empty-state"><p>Loading...</p></div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <FolderOpen size={48} />
          <h3>No projects yet</h3>
          <p>Generated blueprints will appear here.</p>
          <button className="action-btn" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
            Generate Your First Blueprint
          </button>
        </div>
      ) : (
        <div className="history-list">
          {projects.map((project) => (
            <div key={project.id} className="history-card card">
              <div className="history-card-info">
                <h3>{project.title}</h3>
                <p className="history-idea">{project.idea?.substring(0, 150)}{project.idea?.length > 150 ? '...' : ''}</p>
                <div className="history-meta">
                  <span className={`badge ${project.mode === 'ai' ? 'badge-success' : 'badge-warning'}`}>
                    {project.mode === 'ai' ? 'AI Mode' : 'Demo Mode'}
                  </span>
                  <span className="history-date">
                    {new Date(project.created_at).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              <div className="history-card-actions">
                <button className="action-btn" onClick={() => handleOpen(project.id)} aria-label={`Open ${project.title}`}>
                  <ExternalLink size={16} />
                  Open
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(project.id)} aria-label={`Delete ${project.title}`}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
