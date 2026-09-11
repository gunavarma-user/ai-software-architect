export default function ModulesSection({ data }) {
  const modules = data || []

  if (modules.length === 0) {
    return (
      <div>
        <h2 className="section-title">Module Breakdown</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No modules generated.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">Module Breakdown</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {modules.length} modules identified
      </p>

      <div className="modules-grid">
        {modules.map((mod, i) => (
          <div key={i} className="module-card">
            <h4>{mod.name}</h4>
            <p>{mod.purpose}</p>

            {mod.responsibilities?.length > 0 && (
              <>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                  Responsibilities
                </div>
                <ul>
                  {mod.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {mod.dependencies?.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  Dependencies
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {mod.dependencies.map((d, j) => (
                    <span key={j} className="badge badge-default">{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
