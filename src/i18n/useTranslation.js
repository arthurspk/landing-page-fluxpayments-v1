import { useContext } from 'react'
import { LanguageContext } from './context'

export function useTranslation() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useTranslation deve ser usado dentro de um LanguageProvider')
  }
  return ctx
}
