import ScoreGauge from '../common/ScoreGauge'
import { AlertTriangle } from 'lucide-react'

export default function QualityScoreSection({ data }) {
  if (!data) {
    return (
      <div>
        <h2 className="section-title">Architecture Quality Score</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No quality score data available.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">Architecture Quality Score</h2>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <ScoreGauge score={data.overall || 0} label="Overall Score" color="var(--accent-primary)" size={140} />
      </div>

      <div className="scores-grid">
        <ScoreGauge score={data.scalability || 0} label="Scalability" color="var(--accent-blue)" />
        <ScoreGauge score={data.security || 0} label="Security" color="var(--accent-green)" />
        <ScoreGauge score={data.maintainability || 0} label="Maintainability" color="var(--accent-purple)" />
        <ScoreGauge score={data.performance || 0} label="Performance" color="var(--accent-orange)" />
      </div>

      {data.explanation && (
        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="info-label">Score Explanation</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '0.35rem' }}>
            {data.explanation}
          </p>
        </div>
      )}

      {data.improvements?.length > 0 && (
        <div className="info-card" style={{ marginBottom: '1.5rem' }}>
          <div className="info-label">Recommended Improvements</div>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
            {data.improvements.map((item, i) => (
              <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 'var(--radius-sm)' }}>
        <AlertTriangle size={16} style={{ color: 'var(--accent-yellow)', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          These scores are AI-generated assessments and not certified benchmarks. They provide a relative evaluation to guide architectural decisions.
        </p>
      </div>
    </div>
  )
}
