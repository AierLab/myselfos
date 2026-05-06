import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { copy, type Language } from './content'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (typeof copy)[Language]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'myselfos_pages_new_lang'

function detectLanguage(): Language {
  const param = new URLSearchParams(window.location.search).get('lang')
  if (param === 'zh' || param === 'en' || param === 'ja' || param === 'ko') {
    return param
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'zh' || stored === 'en' || stored === 'ja' || stored === 'ko') {
    return stored
  }

  const browser = navigator.language.toLowerCase()
  if (browser.startsWith('zh')) {
    return 'zh'
  }
  if (browser.startsWith('ja')) {
    return 'ja'
  }
  if (browser.startsWith('ko')) {
    return 'ko'
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => detectLanguage())

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
  }

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(STORAGE_KEY, language)

    const url = new URL(window.location.href)
    url.searchParams.set('lang', language)
    window.history.replaceState({}, '', url.toString())
  }, [language])

  const value = useMemo(
    () => ({ language, setLanguage, t: copy[language] }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
