import { Check, X as XIcon } from 'lucide-react'
import MermaidDiagram from '../common/MermaidDiagram'

export default function ArchitectureSection({ data }) {
  if (!data) return <p style={{ color: 'var(--text-tertiary)' }}>No architecture data available.</p>

  return (
    <div>
      <h2 className="section-title">System Architecture</h2>

      {data.mermaid_diagram && (
        <MermaidDiagram chart={data.mermaid_diagram} />
      )}

      <div className="info-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="info-card">
          <div className="info-label">Architecture Pattern</div>
          <div className="info-value" style={{ color: 'var(--accent-secondary)' }}>{data.pattern || 'N/A'}</div>
        </div>
      </div>

      {data.reason && (
        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="info-label">Reasoning</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.35rem' }}>{data.reason}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {data.advantages?.length > 0 && (
          <div className="info-card">
            <div className="info-label" style={{ color: 'var(--accent-green)' }}>Advantages</div>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
              {data.advantages.map((a, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <Check size={16} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.disadvantages?.length > 0 && (
          <div className="info-card">
            <div className="info-label" style={{ color: 'var(--accent-red)' }}>Disadvantages</div>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
              {data.disadvantages.map((d, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <XIcon size={16} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '2px' }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {data.data_flow?.length > 0 && (
        <div className="info-card">
          <div className="info-label">Data Flow</div>
          <ol style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
            {data.data_flow.map((step, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
