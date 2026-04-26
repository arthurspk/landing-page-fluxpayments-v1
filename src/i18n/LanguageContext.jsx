import { useEffect, useMemo, useState, useCallback } from 'react'
import { translations, availableLanguages, DEFAULT_LANGUAGE } from './translations'
import { LanguageContext } from './context'

const STORAGE_KEY = 'fluxpayments:lang'

function getInitialLanguage() {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && translations[stored]) return stored
  } catch {
    /* localStorage indisponível */
  }
  const browser = (window.navigator?.language || '').toLowerCase()
  if (browser.startsWith('en')) return 'en'
  if (browser.startsWith('es')) return 'es'
  if (browser.startsWith('pt')) return 'pt'
  return DEFAULT_LANGUAGE
}

function resolvePath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj)
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = useCallback((next) => {
    if (!translations[next]) return
    setLanguageState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* falha silenciosa */
    }
  }, [])

  useEffect(() => {
    const dict = translations[language]
    if (typeof document === 'undefined' || !dict) return
    document.documentElement.lang = dict.meta.htmlLang
    document.title = dict.meta.title
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', dict.meta.description)
  }, [language])

  const value = useMemo(() => {
    const dict = translations[language]
    const t = (path, fallback) => {
      const value = resolvePath(dict, path)
      if (value === undefined) return fallback ?? path
      return value
    }
    return { language, setLanguage, t, dict, languages: availableLanguages }
  }, [language, setLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
