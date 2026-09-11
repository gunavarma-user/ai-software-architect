import { Link, useLocation } from 'react-router-dom'
import { Code2, History, Home } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="AI Software Architect Home">
          <Code2 size={24} />
          <span className="navbar-title">AI Software Architect</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/history" className={`navbar-link ${location.pathname === '/history' ? 'active' : ''}`}>
            <History size={18} />
            <span>History</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
