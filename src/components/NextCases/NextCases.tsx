import { projects } from '../../data/projects'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import styles from './NextCases.module.css'

/**
 * Recomendações no fim de cada case: o próximo case publicado (na ordem da página inicial)
 * e, em seguida, os demais. Usa os tokens e o Project card do portfólio.
 */
export function NextCases({ current }: { current: string }) {
  const published = projects.filter((p) => p.status === 'published')
  const index = published.findIndex((p) => p.slug === current)
  if (index === -1 || published.length < 2) return null
  const others = [...published.slice(index + 1), ...published.slice(0, index)]

  return (
    <aside aria-labelledby="proximo-case-titulo" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 id="proximo-case-titulo" className={styles.title}>
            Próximo case
          </h2>
          <p className={styles.intro}>Continue explorando meus projetos e conheça outros processos de design.</p>
        </header>
        <ul className={styles.grid}>
          {others.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
