import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let mermaidInitialized = false
let idCounter = 0

export default function MermaidDiagram({ chart }) {
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)
  const idRef = useRef(`mermaid-${Date.now()}-${idCounter++}`)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#6366f1',
          primaryTextColor: '#e8e8f0',
          primaryBorderColor: '#818cf8',
          lineColor: '#6366f1',
          secondaryColor: '#1a1a2e',
          tertiaryColor: '#16161f',
          background: '#12121a',
          mainBkg: '#1a1a2e',
          nodeBorder: '#6366f1',
          clusterBkg: '#16161f',
          titleColor: '#e8e8f0',
          edgeLabelBackground: '#16161f',
        },
        fontFamily: "'Inter', sans-serif",
        flowchart: { curve: 'basis', padding: 15 },
        er: { layoutDirection: 'TB' },
      })
      mermaidInitialized = true
    }
  }, [])

  useEffect(() => {
    if (!chart) return

    const renderChart = async () => {
      try {
        const cleanChart = chart
          .replace(/```mermaid/g, '')
          .replace(/```/g, '')
          .trim()

        if (!cleanChart) {
          setError(true)
          return
        }

        const { svg: renderedSvg } = await mermaid.render(idRef.current, cleanChart)
        setSvg(renderedSvg)
        setError(false)
      } catch (err) {
        console.warn('Mermaid render failed:', err)
        setError(true)
      }
    }

    renderChart()
  }, [chart])

  if (!chart) return null

  if (error) {
    return (
      <div className="mermaid-fallback">
        <pre className="mermaid-code">{chart}</pre>
      </div>
    )
  }

  return (
    <div className="mermaid-container" ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  )
}
