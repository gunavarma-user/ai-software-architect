export default function RoadmapSection({ data }) {
  const phases = data || []

  if (phases.length === 0) {
    return (
      <div>
        <h2 className="section-title">Development Roadmap</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>No roadmap data available.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="section-title">Development Roadmap</h2>

      <div className="timeline">
        {phases.map((phase, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-phase">{phase.phase}</div>
            <div className="timeline-title">{phase.title}</div>
            <div className="timeline-duration">{phase.duration}</div>
            {phase.tasks?.length > 0 && (
              <ul className="timeline-tasks">
                {phase.tasks.map((task, j) => (
                  <li key={j}>
                    {task.task}
                    {task.duration && <span style={{ color: 'var(--text-tertiary)', marginLeft: '0.4rem' }}>({task.duration})</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
