import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Beneficios', href: '#features' },
  { label: 'Solucoes', href: '#solutions' },
  { label: 'Global', href: '#globe' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <div className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#nav-grad)" />
              <text x="16" y="22" fontFamily="Inter" fontWeight="800" fontSize="18" fill="white" textAnchor="middle">F</text>
              <defs>
                <linearGradient id="nav-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1E40AF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>Flux <span className="navbar__logo-accent">Payments</span></span>
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <a href="#cta" className="btn-primary navbar__cta">Entrar em Contato</a>
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: all 0.3s ease;
        }

        .navbar--scrolled {
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          padding: 10px 0;
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          z-index: 10;
        }

        .navbar__logo-accent {
          background: var(--gradient-blue);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar__links a {
          padding: 8px 18px;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .navbar__links a:hover {
          color: var(--text-primary);
          background: rgba(59, 130, 246, 0.08);
        }

        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
        }

        .navbar__cta {
          padding: 10px 24px !important;
          font-size: 13px !important;
        }

        .navbar__toggle {
          display: none;
          background: transparent;
          color: var(--text-primary);
          padding: 8px;
        }

        @media (max-width: 768px) {
          .navbar__links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(3, 7, 18, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            gap: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .navbar__links--open {
            opacity: 1;
            pointer-events: all;
          }

          .navbar__links a {
            font-size: 20px;
            padding: 16px 32px;
          }

          .navbar__toggle {
            display: flex;
          }

          .navbar__cta {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
