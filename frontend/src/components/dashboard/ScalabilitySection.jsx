import { useState } from 'react'

export default function ScalabilitySection({ data }) {
  const recommendations = data?.recommendations || []
  const [activeTab, setActiveTab] = useState(0)

  if (recommendations.length === 0) {
    return (
      <div>
        <h2 className="section-title">Scalability Analysis</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No scalability data available.</p>
      </div>
    )
  }

  const active = recommendations[activeTab] || recommendations[0]

  return (
    <div>
      <h2 className="section-title">Scalability Analysis</h2>

      {data?.current_scale && (
        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="info-label">Current Estimated Scale</div>
          <div className="info-value">{data.current_scale}</div>
        </div>
      )}

      <div className="scale-tabs">
        {recommendations.map((rec, i) => (
          <button
            key={i}
            className={`scale-tab ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {rec.scale}
          </button>
        ))}
      </div>

      <div className="info-card">
        <div className="info-label">Architecture at {active.scale}</div>
        <div className="info-value" style={{ marginBottom: '1rem' }}>{active.architecture}</div>

        {active.components?.length > 0 && (
          <>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
              Components
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {active.components.map((c, i) => (
                <span key={i} className="badge badge-info">{c}</span>
              ))}
            </div>
          </>
        )}

        {active.considerations?.length > 0 && (
          <>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
              Key Considerations
            </div>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {active.considerations.map((c, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>{c}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
