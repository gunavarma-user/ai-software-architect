import { Gauge } from 'lucide-react'

export default function PerformanceSection({ data }) {
  const items = data || []

  if (items.length === 0) {
    return (
      <div>
        <h2 className="section-title">Performance Recommendations</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No performance recommendations generated.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">
        <Gauge size={22} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom', color: 'var(--accent-blue)' }} />
        Performance Recommendations
      </h2>

      {items.map((item, i) => (
        <div key={i} className="performance-card">
          <h4>{item.area}</h4>
          <p>{item.recommendation}</p>
          <div className="card-badges">
            <span className={`badge priority-${item.impact}`}>Impact: {item.impact}</span>
            <span className={`badge priority-${item.complexity}`}>Complexity: {item.complexity}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
