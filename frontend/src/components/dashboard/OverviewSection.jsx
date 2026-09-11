import { Boxes, Info } from 'lucide-react'

export default function OverviewSection({ data }) {
  const project = data?.project || {}
  const modules = data?.modules || []
  const arch = data?.architecture || {}

  return (
    <div>
      <h2 className="section-title">Project Overview</h2>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-label">Project Name</div>
          <div className="info-value">{project.name || 'N/A'}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Project Type</div>
          <div className="info-value">{project.type || 'N/A'}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Complexity</div>
          <div className="info-value">{project.complexity || 'N/A'}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Target Users</div>
          <div className="info-value">{project.target_users?.join(', ') || 'N/A'}</div>
        </div>
      </div>

      {project.description && (
        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="info-label">Description</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {project.description}
          </p>
        </div>
      )}

      {modules.length > 0 && (
        <>
          <h3 className="section-subtitle">
            <Boxes size={18} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom' }} />
            Core Modules
          </h3>
          <div className="modules-grid" style={{ marginBottom: '1.5rem' }}>
            {modules.map((mod, i) => (
              <div key={i} className="module-card">
                <h4>{mod.name}</h4>
                <p>{mod.purpose}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {arch.reason && (
        <div className="info-card">
          <div className="info-label">
            <Info size={14} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'text-bottom' }} />
            Architecture Recommendation
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>{arch.pattern}</strong> — {arch.reason}
          </p>
        </div>
      )}
    </div>
  )
}
