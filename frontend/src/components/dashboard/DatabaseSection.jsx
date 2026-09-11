import MermaidDiagram from '../common/MermaidDiagram'

export default function DatabaseSection({ data }) {
  if (!data) return <p style={{ color: 'var(--text-tertiary)' }}>No database data available.</p>

  const entities = data.entities || []
  const relationships = data.relationships || []

  return (
    <div>
      <h2 className="section-title">Database Schema</h2>

      {data.mermaid_diagram && (
        <MermaidDiagram chart={data.mermaid_diagram} />
      )}

      <h3 className="section-subtitle">Entities</h3>
      {entities.map((entity, i) => (
        <div key={i} className="entity-card">
          <h4>{entity.name}</h4>
          {entity.description && <p className="entity-desc">{entity.description}</p>}
          {entity.fields?.length > 0 && (
            <table className="field-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Constraints</th>
                </tr>
              </thead>
              <tbody>
                {entity.fields.map((field, j) => (
                  <tr key={j}>
                    <td style={{ color: 'var(--text-primary)' }}>{field.name}</td>
                    <td style={{ color: 'var(--accent-secondary)' }}>{field.type}</td>
                    <td>
                      {field.constraints?.map((c, k) => (
                        <span key={k} className="constraint-badge">{c}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}

      {relationships.length > 0 && (
        <>
          <h3 className="section-subtitle" style={{ marginTop: '1.5rem' }}>Relationships</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {relationships.map((rel, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{rel.from_entity}</td>
                    <td style={{ fontWeight: 600 }}>{rel.to_entity}</td>
                    <td><span className="badge badge-info">{rel.type}</span></td>
                    <td style={{ color: 'var(--text-secondary)' }}>{rel.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
