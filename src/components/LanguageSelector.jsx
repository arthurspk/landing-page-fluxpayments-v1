import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

export default function LanguageSelector({ variant = 'desktop' }) {
  const { language, setLanguage, languages, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const current = languages.find(l => l.code === language) || languages[0]

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleSelect = (code) => {
    setLanguage(code)
    setOpen(false)
  }

  return (
    <div className={`lang-selector lang-selector--${variant}`} ref={wrapperRef}>
      <button
        type="button"
        className="lang-selector__trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('navbar.languageLabel')}
      >
        <img src={current.flag} alt="" className="lang-selector__flag" aria-hidden="true" />
        <span className="lang-selector__code">{current.label}</span>
        <ChevronDown
          size={14}
          className={`lang-selector__chevron ${open ? 'lang-selector__chevron--open' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang-selector__menu"
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            {languages.map(lang => {
              const active = lang.code === language
              return (
                <li key={lang.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`lang-selector__option ${active ? 'lang-selector__option--active' : ''}`}
                    onClick={() => handleSelect(lang.code)}
                  >
                    <img src={lang.flag} alt="" className="lang-selector__option-flag" aria-hidden="true" />
                    <span className="lang-selector__option-name">{lang.name}</span>
                    {active && <Check size={14} className="lang-selector__option-check" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <style>{`
        .lang-selector {
          position: relative;
          display: inline-flex;
        }

        .lang-selector__trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 40px;
          padding: 0 14px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-family);
          backdrop-filter: blur(10px);
        }

        .lang-selector__trigger:hover {
          border-color: var(--border-hover);
          background: rgba(59, 130, 246, 0.08);
        }

        .lang-selector__flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
          display: block;
          flex-shrink: 0;
        }

        .lang-selector__code {
          letter-spacing: 0.4px;
        }

        .lang-selector__chevron {
          color: var(--text-secondary);
          transition: transform 0.2s ease;
        }

        .lang-selector__chevron--open {
          transform: rotate(180deg);
        }

        .lang-selector__menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 170px;
          padding: 6px;
          margin: 0;
          list-style: none;
          background: rgba(10, 15, 30, 0.98);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
          z-index: 1100;
        }

        .lang-selector__option {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          font-family: var(--font-family);
          transition: all 0.15s ease;
        }

        .lang-selector__option:hover {
          background: rgba(59, 130, 246, 0.1);
          color: var(--text-primary);
        }

        .lang-selector__option--active {
          background: rgba(59, 130, 246, 0.15);
          color: var(--text-primary);
        }

        .lang-selector__option-flag {
          width: 22px;
          height: 16px;
          object-fit: cover;
          border-radius: 2px;
          display: block;
          flex-shrink: 0;
        }

        .lang-selector__option-name {
          flex: 1;
        }

        .lang-selector__option-check {
          color: var(--blue-400);
        }

        .lang-selector--mobile {
          width: 100%;
          justify-content: center;
        }

        .lang-selector--mobile .lang-selector__trigger {
          height: 44px;
          padding: 0 22px;
          font-size: 14px;
        }

        .lang-selector--mobile .lang-selector__menu {
          right: 50%;
          transform: translateX(50%);
          min-width: 200px;
        }

        @media (max-width: 768px) {
          .lang-selector--desktop {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .lang-selector--mobile {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
