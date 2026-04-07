import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logoPrincipal from '../assets/logos/logo-principal.png'

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Benefícios', href: '#features' },
  { label: 'Soluções', href: '#solutions' },
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <img src={logoPrincipal} alt="Flux Payments" className="navbar__logo-img" />
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          <button
            className="navbar__close-mobile"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
            </li>
          ))}
          <li className="navbar__mobile-cta">
            <a href="https://wa.me/16475755252" target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={() => setMobileOpen(false)}>
              Entrar em Contato
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <a href="https://wa.me/16475755252" target="_blank" rel="noopener noreferrer" className="btn-primary navbar__cta">Entrar em Contato</a>
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
          z-index: 10;
        }

        .navbar__logo-img {
          height: 36px;
          width: auto;
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

        .navbar__close-mobile {
          display: none;
        }

        .navbar__mobile-cta {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar__links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100vh;
            height: 100dvh;
            background: rgba(3, 7, 18, 0.99);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 9999;
            overflow: hidden;
          }

          .navbar__links--open {
            opacity: 1;
            pointer-events: all;
          }

          .navbar__close-mobile {
            display: flex;
            position: absolute;
            top: 20px;
            right: 24px;
            background: transparent;
            border: none;
            color: var(--text-primary);
            cursor: pointer;
            padding: 8px;
            z-index: 10000;
          }

          .navbar__links a {
            font-size: 22px;
            padding: 16px 32px;
            width: 100%;
            text-align: center;
          }

          .navbar__mobile-cta {
            display: block;
            margin-top: 24px;
          }

          .navbar__mobile-cta .btn-primary {
            padding: 14px 40px !important;
            font-size: 15px !important;
          }

          .navbar__toggle {
            display: flex;
            z-index: 1000;
          }

          .navbar__cta {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  )
}
