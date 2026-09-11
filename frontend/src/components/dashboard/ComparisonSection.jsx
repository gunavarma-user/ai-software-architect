import { Check, X as XIcon, Award } from 'lucide-react'

export default function ComparisonSection({ data }) {
  if (!data || (!data.monolithic && !data.microservices)) {
    return (
      <div>
        <h2 className="section-title">Architecture Comparison</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No comparison data available.</p>
      </div>
    )
  }

  const mono = data.monolithic || {}
  const micro = data.microservices || {}

  return (
    <div>
      <h2 className="section-title">Architecture Comparison</h2>

      <div className="comparison-grid">
        <div className={`comparison-card ${data.recommended === 'Monolithic' ? 'recommended' : ''}`}>
          <h3>
            Monolithic
            {data.recommended === 'Monolithic' && (
              <span className="badge badge-success" style={{ marginLeft: '0.5rem' }}>
                <Award size={12} /> Recommended
              </span>
            )}
          </h3>

          {mono.advantages?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>Advantages</div>
              {mono.advantages.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} /> {a}
                </div>
              ))}
            </div>
          )}
          {mono.disadvantages?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>Disadvantages</div>
              {mono.disadvantages.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <XIcon size={14} style={{ color: 'var(--accent-red)', flexShrink: 0 }} /> {d}
                </div>
              ))}
            </div>
          )}
          {mono.best_for && <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Best for: {mono.best_for}</p>}
          {mono.complexity && <span className="badge badge-default" style={{ marginTop: '0.5rem' }}>Complexity: {mono.complexity}</span>}
        </div>

        <div className={`comparison-card ${data.recommended === 'Microservices' ? 'recommended' : ''}`}>
          <h3>
            Microservices
            {data.recommended === 'Microservices' && (
              <span className="badge badge-success" style={{ marginLeft: '0.5rem' }}>
                <Award size={12} /> Recommended
              </span>
            )}
          </h3>

          {micro.advantages?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>Advantages</div>
              {micro.advantages.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} /> {a}
                </div>
              ))}
            </div>
          )}
          {micro.disadvantages?.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase' }}>Disadvantages</div>
              {micro.disadvantages.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <XIcon size={14} style={{ color: 'var(--accent-red)', flexShrink: 0 }} /> {d}
                </div>
              ))}
            </div>
          )}
          {micro.best_for && <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>Best for: {micro.best_for}</p>}
          {micro.complexity && <span className="badge badge-default" style={{ marginTop: '0.5rem' }}>Complexity: {micro.complexity}</span>}
        </div>
      </div>

      {data.reason && (
        <div className="info-card">
          <div className="info-label">Recommendation Reasoning</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.35rem' }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>{data.recommended}</strong> — {data.reason}
          </p>
        </div>
      )}
    </div>
  )
}
