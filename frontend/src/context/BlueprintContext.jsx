import { createContext, useContext, useState } from 'react'
import { generateArchitecture } from '../services/api'

const BlueprintContext = createContext(null)

export function BlueprintProvider({ children }) {
  const [blueprint, setBlueprint] = useState(null)
  const [mode, setMode] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingStage, setLoadingStage] = useState(0)

  const stages = [
    'Analyzing software idea...',
    'Extracting requirements...',
    'Identifying system modules...',
    'Selecting technology stack...',
    'Designing database schema...',
    'Generating API endpoints...',
    'Analyzing security requirements...',
    'Evaluating scalability...',
    'Building architecture diagram...',
    'Preparing blueprint...',
  ]

  const generateBlueprint = async (idea) => {
    setLoading(true)
    setError(null)
    setLoadingStage(0)

    // Animate through stages
    const interval = setInterval(() => {
      setLoadingStage((prev) => {
        if (prev < stages.length - 1) return prev + 1
        return prev
      })
    }, 1200)

    try {
      const data = await generateArchitecture(idea)
      clearInterval(interval)
      setLoadingStage(stages.length - 1)
      // Small delay for final stage to show
      await new Promise((r) => setTimeout(r, 500))
      setBlueprint(data.blueprint)
      setMode(data.mode)
      setLoading(false)
      return true
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Failed to generate architecture')
      setLoading(false)
      return false
    }
  }

  const loadBlueprint = (bp, m) => {
    setBlueprint(bp)
    setMode(m)
    setError(null)
  }

  const clearBlueprint = () => {
    setBlueprint(null)
    setMode(null)
    setError(null)
  }

  return (
    <BlueprintContext.Provider
      value={{
        blueprint,
        mode,
        loading,
        error,
        loadingStage,
        stages,
        generateBlueprint,
        loadBlueprint,
        clearBlueprint,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  )
}

export function useBlueprint() {
  const context = useContext(BlueprintContext)
  if (!context) throw new Error('useBlueprint must be used within BlueprintProvider')
  return context
}
