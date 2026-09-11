import { HelpCircle } from 'lucide-react'

export default function RequirementsSection({ data }) {
  const functional = data?.functional || []
  const nonFunctional = data?.non_functional || []
  const clarifications = data?.clarifications || []

  return (
    <div>
      <h2 className="section-title">Requirements</h2>

      <h3 className="section-subtitle">Functional Requirements</h3>
      {functional.length > 0 ? (
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {functional.map((req, i) => (
                <tr key={i}>
                  <td><code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{req.id}</code></td>
                  <td style={{ fontWeight: 600 }}>{req.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.description}</td>
                  <td><span className={`badge priority-${req.priority}`}>{req.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>No functional requirements generated.</p>}

      <h3 className="section-subtitle">Non-Functional Requirements</h3>
      {nonFunctional.length > 0 ? (
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {nonFunctional.map((req, i) => (
                <tr key={i}>
                  <td><code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{req.id}</code></td>
                  <td style={{ fontWeight: 600 }}>{req.category}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.description}</td>
                  <td><span className={`badge priority-${req.priority}`}>{req.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>No non-functional requirements generated.</p>}

      {clarifications.length > 0 && (
        <>
          <h3 className="section-subtitle">
            <HelpCircle size={18} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'text-bottom', color: 'var(--accent-yellow)' }} />
            Requirements Needing Clarification
          </h3>
          {clarifications.map((c, i) => (
            <div key={i} className="clarification-card">
              <p className="question">{c.question}</p>
              {c.context && <p className="context">{c.context}</p>}
              {c.impact && <p className="context" style={{ marginTop: '0.2rem', fontStyle: 'italic' }}>Impact: {c.impact}</p>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
