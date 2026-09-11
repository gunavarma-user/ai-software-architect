import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlueprint } from '../context/BlueprintContext'
import { exportToJSON, exportToMarkdown } from '../services/api'
import {
  LayoutDashboard, ClipboardList, Network, Layers, Database, Webhook,
  Boxes, Shield, Gauge, TrendingUp, Map, Award, GitCompare,
  RefreshCw, Download, Menu, X, ChevronDown
} from 'lucide-react'
import OverviewSection from '../components/dashboard/OverviewSection'
import RequirementsSection from '../components/dashboard/RequirementsSection'
import ArchitectureSection from '../components/dashboard/ArchitectureSection'
import TechStackSection from '../components/dashboard/TechStackSection'
import DatabaseSection from '../components/dashboard/DatabaseSection'
import ApiSection from '../components/dashboard/ApiSection'
import ModulesSection from '../components/dashboard/ModulesSection'
import SecuritySection from '../components/dashboard/SecuritySection'
import PerformanceSection from '../components/dashboard/PerformanceSection'
import ScalabilitySection from '../components/dashboard/ScalabilitySection'
import RoadmapSection from '../components/dashboard/RoadmapSection'
import QualityScoreSection from '../components/dashboard/QualityScoreSection'
import ComparisonSection from '../components/dashboard/ComparisonSection'
import '../styles/Dashboard.css'

const NAV_ITEMS = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'requirements', label: 'Requirements', icon: ClipboardList },
  { key: 'architecture', label: 'Architecture', icon: Network },
  { key: 'techstack', label: 'Tech Stack', icon: Layers },
  { key: 'database', label: 'Database', icon: Database },
  { key: 'apis', label: 'APIs', icon: Webhook },
  { key: 'modules', label: 'Modules', icon: Boxes },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'performance', label: 'Performance', icon: Gauge },
  { key: 'scalability', label: 'Scalability', icon: TrendingUp },
  { key: 'roadmap', label: 'Roadmap', icon: Map },
  { key: 'quality', label: 'Quality Score', icon: Award },
  { key: 'comparison', label: 'Comparison', icon: GitCompare },
]

export default function DashboardPage() {
  const { blueprint, mode, clearBlueprint } = useBlueprint()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  useEffect(() => {
    if (!blueprint) navigate('/')
  }, [blueprint, navigate])

  if (!blueprint) return null

  const projectName = blueprint.project?.name || 'Untitled Project'

  const handleExport = (format) => {
    if (format === 'json') exportToJSON(blueprint, projectName)
    if (format === 'md') exportToMarkdown(blueprint, projectName)
    setExportOpen(false)
  }

  const handleNewProject = () => {
    clearBlueprint()
    navigate('/')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview': return <OverviewSection data={blueprint} />
      case 'requirements': return <RequirementsSection data={blueprint.requirements} />
      case 'architecture': return <ArchitectureSection data={blueprint.architecture} />
      case 'techstack': return <TechStackSection data={blueprint.tech_stack} />
      case 'database': return <DatabaseSection data={blueprint.database} />
      case 'apis': return <ApiSection data={blueprint.apis} />
      case 'modules': return <ModulesSection data={blueprint.modules} />
      case 'security': return <SecuritySection data={blueprint.security} />
      case 'performance': return <PerformanceSection data={blueprint.performance} />
      case 'scalability': return <ScalabilitySection data={blueprint.scalability} />
      case 'roadmap': return <RoadmapSection data={blueprint.roadmap} />
      case 'quality': return <QualityScoreSection data={blueprint.quality_score} />
      case 'comparison': return <ComparisonSection data={blueprint.architecture_comparison} />
      default: return <OverviewSection data={blueprint} />
    }
  }

  return (
    <div className="dashboard">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav" role="navigation" aria-label="Dashboard sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => { setActiveSection(item.key); setSidebarOpen(false) }}
              aria-current={activeSection === item.key ? 'page' : undefined}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-info">
            <h1 className="project-name">{projectName}</h1>
            <div className="header-badges">
              <span className="badge badge-info">{blueprint.project?.type || 'Application'}</span>
              <span className="badge badge-purple">{blueprint.project?.complexity || 'Medium'}</span>
              <span className={`badge ${mode === 'ai' ? 'badge-success' : 'badge-warning'}`}>
                {mode === 'ai' ? 'AI Mode' : 'Demo Mode'}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={handleNewProject} aria-label="New Project">
              <RefreshCw size={16} />
              <span>New</span>
            </button>
            <div className="export-wrapper">
              <button className="action-btn" onClick={() => setExportOpen(!exportOpen)} aria-label="Export">
                <Download size={16} />
                <span>Export</span>
                <ChevronDown size={14} />
              </button>
              {exportOpen && (
                <div className="export-dropdown">
                  <button onClick={() => handleExport('json')}>Export JSON</button>
                  <button onClick={() => handleExport('md')}>Export Markdown</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
