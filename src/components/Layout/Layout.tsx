import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DecorativeBackground } from '../DecorativeBackground/DecorativeBackground'
import { Header } from '../Header/Header'
import { ScrollIndicator } from '../ScrollIndicator/ScrollIndicator'
import styles from './Layout.module.css'

/** Estrutura comum a todas as páginas: link de pular, fundo decorativo, header e indicador de rolagem. */
export function Layout() {
  const { pathname } = useLocation()

  // Ao trocar de página, volta ao topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className={styles.page}>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      <DecorativeBackground />
      <Header />
      <Outlet />
      <ScrollIndicator />
    </div>
  )
}
