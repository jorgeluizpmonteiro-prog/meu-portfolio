import { useEffect, useRef, useState } from 'react'
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon'
import { ProjectCard } from '../../components/ProjectCard/ProjectCard'
import { FEATURED_COUNT, projects } from '../../data/projects'
import styles from './Home.module.css'

/** P.01 — Página inicial (Projetos). Figma: node 96:29280. */
export function Home() {
  const listRef = useRef<HTMLUListElement>(null)
  const hasMore = projects.length > FEATURED_COUNT

  return (
    <main id="conteudo" className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>Projetando</span>{' '}
          <span className={styles.titleLine}>para pessoas</span>
        </h1>
        <p className={styles.intro}>
          Sou Jorge Luiz, Product Designer com foco em operações de design systems e automações com IA.
          Explore meus projetos e conheça meu processo de design.
        </p>
      </section>

      <section aria-labelledby="projetos-titulo" className={styles.projects}>
        <h2 id="projetos-titulo" className="visually-hidden">
          Projetos
        </h2>
        <ul ref={listRef} className={styles.grid}>
          {projects.map((project, index) => (
            <li
              key={project.slug}
              className={styles.gridItem}
              style={{ animationDelay: `${300 + Math.min(index, FEATURED_COUNT - 1) * 100}ms` }}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      {hasMore && <MoreProjectsButton listRef={listRef} />}
    </main>
  )
}

/**
 * “Ver mais projetos” (INT-09): indica que há projetos abaixo dos 3 em destaque.
 * Ao clicar, a página desce até eles. Some quando a pessoa começa a rolar.
 */
function MoreProjectsButton({ listRef }: { listRef: React.RefObject<HTMLUListElement | null> }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY <= 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showMore = () => {
    const next = listRef.current?.children[FEATURED_COUNT] as HTMLElement | undefined
    if (!next) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    next.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <div className={`${styles.more} ${visible ? '' : styles.moreHidden}`} inert={!visible}>
      <ButtonIcon icon="keyboard-arrow-down" label="Ver mais projetos" onClick={showMore} className={styles.moreButton} />
    </div>
  )
}
