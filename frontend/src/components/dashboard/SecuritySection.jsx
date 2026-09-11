import { ShieldCheck } from 'lucide-react'

export default function SecuritySection({ data }) {
  const items = data || []

  if (items.length === 0) {
    return (
      <div>
        <h2 className="section-title">Security Recommendations</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No security recommendations generated.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">
        <ShieldCheck size={22} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom', color: 'var(--accent-green)' }} />
        Security Recommendations
      </h2>

      {items.map((item, i) => (
        <div key={i} className="security-card">
          <h4>{item.concern}</h4>
          <p>{item.recommendation}</p>
          <div className="card-badges">
            <span className={`badge priority-${item.priority}`}>{item.priority}</span>
            {item.category && <span className="badge badge-default">{item.category}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
