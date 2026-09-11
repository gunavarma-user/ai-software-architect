export default function ApiSection({ data }) {
  const apis = data || []

  if (apis.length === 0) {
    return (
      <div>
        <h2 className="section-title">API Endpoints</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No API endpoints generated.</p>
      </div>
    )
  }

  // Group by module
  const grouped = {}
  apis.forEach((api) => {
    const mod = api.module || 'General'
    if (!grouped[mod]) grouped[mod] = []
    grouped[mod].push(api)
  })

  return (
    <div>
      <h2 className="section-title">API Endpoints</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {apis.length} endpoints across {Object.keys(grouped).length} modules
      </p>

      {Object.entries(grouped).map(([module, endpoints]) => (
        <div key={module} style={{ marginBottom: '2rem' }}>
          <h3 className="section-subtitle">{module}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Endpoint</th>
                  <th>Purpose</th>
                  <th>Auth</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((api, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`method-badge method-${api.method}`}>{api.method}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{api.endpoint}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{api.purpose}</td>
                    <td>
                      <span className={`badge ${api.auth_required ? 'badge-warning' : 'badge-success'}`}>
                        {api.auth_required ? 'Required' : 'Public'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
