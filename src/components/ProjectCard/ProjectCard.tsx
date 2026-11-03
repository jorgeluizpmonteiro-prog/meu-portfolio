import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { Icon } from '../Icon/Icon'
import styles from './ProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  headingLevel?: 'h2' | 'h3'
  className?: string
}

/**
 * Project card — Figma: Components › Project card.
 * O card inteiro é clicável por um único link (“Ver projeto”), sem links aninhados (D-11).
 * Projetos ainda sem case aparecem com “Em breve” e sem link.
 */
export function ProjectCard({ project, headingLevel: Heading = 'h3', className }: ProjectCardProps) {
  const [coverFailed, setCoverFailed] = useState(false)
  const published = project.status === 'published'

  return (
    <article className={[styles.card, published && styles.interactive, className].filter(Boolean).join(' ')}>
      <div className={styles.cover}>
        {!coverFailed && (
          <div className={styles.image}>
            <img
              src={project.cover}
              alt={project.coverAlt}
              loading="lazy"
              decoding="async"
              onError={() => setCoverFailed(true)}
            />
          </div>
        )}
        <div className={styles.badges}>
          <span className={styles.badge}>{project.category}</span>
        </div>
      </div>

      <div className={styles.content}>
        <Heading className={styles.title}>{project.title}</Heading>
        <p className={styles.description}>{project.description}</p>
      </div>

      {published ? (
        <Link to={`/projetos/${project.slug}`} className={styles.action}>
          <span className={styles.actionIcon}>
            <Icon name="arrow-outward" className={styles.icon} />
          </span>
          <span className={styles.actionLabel}>
            Ver projeto<span className="visually-hidden"> {project.title}</span>
          </span>
        </Link>
      ) : (
        <p className={`${styles.action} ${styles.soon}`}>Em breve</p>
      )}
    </article>
  )
}
