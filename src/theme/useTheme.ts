import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readSaved(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  return media().matches ? 'dark' : 'light'
}

function apply(theme: Theme, animate: boolean) {
  const root = document.documentElement
  if (animate) {
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 300)
  }
  root.dataset.theme = theme
}

/**
 * Tema da página. Na primeira visita segue o sistema; depois que a pessoa
 * escolhe pelo botão, a escolha fica salva no navegador.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Acompanha o sistema enquanto não houver escolha salva
  useEffect(() => {
    const mq = media()
    const onChange = () => {
      if (readSaved()) return
      const next: Theme = mq.matches ? 'dark' : 'light'
      apply(next, true)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    apply(next, true)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sem armazenamento: o tema vale só para esta visita
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
