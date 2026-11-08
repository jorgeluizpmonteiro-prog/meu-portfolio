import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { projects } from '../../data/projects'
import { BackToTop } from '../BackToTop/BackToTop'
import { DecorativeBackground } from '../DecorativeBackground/DecorativeBackground'
import { Header } from '../Header/Header'
import { ScrollIndicator } from '../ScrollIndicator/ScrollIndicator'
import styles from './Layout.module.css'

/**
 * Estrutura comum a todas as páginas: link de pular, fundo decorativo, header e indicador de rolagem.
 * Nas páginas de case, o header vira Type=Project e o fundo decorativo sai. O header, o menu e
 * a seção “Próximo case” seguem o tema escolhido; a apresentação usa as cores do próprio Figma.
 */
export function Layout() {
  const { pathname } = useLocation()
  const slug = pathname.match(/^\/projetos\/([^/]+)\/?$/)?.[1]
  const caseProject = projects.find((p) => p.slug === slug && p.status === 'published' && p.logo)

  // Ao trocar de página, volta ao topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className={`${styles.page} ${caseProject ? styles.casePage : ''}`}>
      <a href="#conteudo" className={styles.skipLink}>
        Pular para o conteúdo
      </a>
      {caseProject ? (
        <Header project={{ title: caseProject.title, logo: caseProject.logo!, year: caseProject.year }} />
      ) : (
        <>
          <DecorativeBackground />
          <Header />
        </>
      )}
      <Outlet />
      {caseProject && <BackToTop />}
      <ScrollIndicator />
    </div>
  )
}
