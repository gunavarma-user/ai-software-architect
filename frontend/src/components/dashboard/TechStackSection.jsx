const CATEGORY_COLORS = {
  frontend: 'var(--accent-blue)',
  backend: 'var(--accent-green)',
  database: 'var(--accent-purple)',
  authentication: 'var(--accent-orange)',
  deployment: 'var(--accent-red)',
  other: 'var(--text-secondary)',
}

export default function TechStackSection({ data }) {
  if (!data) return <p style={{ color: 'var(--text-tertiary)' }}>No tech stack data available.</p>

  const categories = ['frontend', 'backend', 'database', 'authentication', 'deployment', 'other']

  return (
    <div>
      <h2 className="section-title">Technology Stack</h2>

      {categories.map((cat) => {
        const items = data[cat]
        if (!items?.length) return null
        return (
          <div key={cat} className="stack-category">
            <h3 style={{ borderLeft: `3px solid ${CATEGORY_COLORS[cat] || 'var(--accent-primary)'}`, paddingLeft: '0.75rem' }}>
              {cat}
            </h3>
            <div className="stack-items">
              {items.map((item, i) => (
                <div key={i} className="stack-item">
                  <span style={{ color: CATEGORY_COLORS[cat] || 'var(--text-primary)' }}>●</span>
                  {item.name}
                  {item.reason && <div className="stack-tooltip">{item.reason}</div>}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
