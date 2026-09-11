import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlueprint } from '../context/BlueprintContext'
import {
  Sparkles, ArrowRight, ClipboardList, Network, Layers,
  Database, Webhook, Map, ChevronRight, Zap
} from 'lucide-react'
import '../styles/HomePage.css'

const EXAMPLE_IDEAS = [
  {
    title: 'Study Partner Finder',
    idea: 'Create a platform where college students can find other students to study with based on subjects, interests and availability. Students should be able to create profiles, search for study partners, form study groups, and communicate through the platform.',
  },
  {
    title: 'Food Delivery App',
    idea: 'Create an online food delivery application where users can browse nearby restaurants, view menus, place orders, track deliveries in real-time, and make payments. Restaurant owners should be able to manage their menus and orders.',
  },
  {
    title: 'Textbook Exchange',
    idea: 'Create a platform where college students can buy, sell, and exchange used textbooks. Students should be able to list books with photos and prices, search by course or ISBN, message sellers, and arrange exchanges.',
  },
  {
    title: 'Event Management',
    idea: 'Create a college event management platform where organizers can create events, manage registrations, send notifications, handle ticketing, and track attendance. Students can discover events, RSVP, and get reminders.',
  },
]

const FEATURES = [
  { icon: ClipboardList, title: 'Requirement Analysis', desc: 'Extract functional and non-functional requirements from your idea' },
  { icon: Network, title: 'Architecture Design', desc: 'Generate system architecture with visual diagrams' },
  { icon: Layers, title: 'Tech Stack', desc: 'Get technology recommendations based on project complexity' },
  { icon: Database, title: 'Database Designer', desc: 'Auto-generate database entities, schemas, and ER diagrams' },
  { icon: Webhook, title: 'API Generator', desc: 'Generate REST API endpoints grouped by modules' },
  { icon: Map, title: 'Development Roadmap', desc: 'Get a phased implementation plan with milestones' },
]

export default function HomePage() {
  const [idea, setIdea] = useState('')
  const { generateBlueprint, loading, error } = useBlueprint()
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!idea.trim() || idea.trim().length < 10) return
    const success = await generateBlueprint(idea)
    if (success) navigate('/dashboard')
  }

  const handleExample = (exampleIdea) => {
    setIdea(exampleIdea)
  }

  if (loading) {
    return <GeneratingView />
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>AI-Powered Software Architecture</span>
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">AI Software Architect</span>
        </h1>
        <p className="hero-tagline">Turn your software idea into a technical blueprint.</p>
        <p className="hero-description">
          Transform an unstructured software idea into requirements, architecture,
          technology recommendations, database design, APIs and a development roadmap.
        </p>

        <div className="pipeline">
          {['IDEA', 'REQUIREMENTS', 'ARCHITECTURE', 'BLUEPRINT'].map((step, i) => (
            <div key={step} className="pipeline-step">
              <span className="pipeline-label">{step}</span>
              {i < 3 && <ChevronRight size={16} className="pipeline-arrow" />}
            </div>
          ))}
        </div>
      </section>

      <section className="input-section">
        <div className="input-container">
          <label htmlFor="idea-input" className="sr-only">Describe your software idea</label>
          <textarea
            id="idea-input"
            className="idea-input"
            placeholder="Describe your software idea in detail..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={5}
            maxLength={5000}
            aria-label="Software idea description"
          />
          <div className="input-footer">
            <span className="char-count">{idea.length} / 5000</span>
          </div>
        </div>

        <div className="example-buttons">
          {EXAMPLE_IDEAS.map((ex) => (
            <button
              key={ex.title}
              className="example-btn"
              onClick={() => handleExample(ex.idea)}
              aria-label={`Try example: ${ex.title}`}
            >
              <Zap size={14} />
              {ex.title}
            </button>
          ))}
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={!idea.trim() || idea.trim().length < 10}
          aria-label="Generate Architecture"
        >
          <Sparkles size={20} />
          Generate Architecture
          <ArrowRight size={20} />
        </button>

        {error && <p className="error-message" role="alert">{error}</p>}
      </section>

      <section className="features-section">
        <h2 className="features-title">What Gets Generated</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card card">
              <div className="feature-icon">
                <f.icon size={24} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function GeneratingView() {
  const { loadingStage, stages } = useBlueprint()

  const progress = ((loadingStage + 1) / stages.length) * 100

  return (
    <div className="generating-page">
      <div className="generating-container">
        <div className="generating-spinner">
          <div className="spinner-ring" />
        </div>
        <h2 className="generating-title gradient-text">Generating Blueprint</h2>
        <p className="generating-stage">{stages[loadingStage]}</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="generating-hint">This may take a moment...</p>
      </div>
    </div>
  )
}
