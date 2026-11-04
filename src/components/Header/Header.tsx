import { useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import { useTheme } from '../../theme/useTheme'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import { NavBar } from '../NavBar/NavBar'
import styles from './Header.module.css'

const SESSION_KEY = 'header-entered'

// MOT-04: o header só anima na primeira visita da sessão
function shouldAnimateEntrance() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  } catch {
    return false
  }
}

const ANIMATE_ENTRANCE = shouldAnimateEntrance()

type ProjectHeader = {
  title: string
  logo: string
  year?: string
}

type HeaderProps = {
  /** Header Type=Project: voltar + logo do projeto + menu + ano. Sem ele, Type=Default. */
  project?: ProjectHeader
}

/** Header — Figma: Components › Header (Type=Default e Type=Project). */
export function Header({ project }: HeaderProps) {
  if (project) return <ProjectTypeHeader project={project} />
  return <DefaultHeader />
}

/** Type=Project — usado nas páginas de case (D-17: o voltar leva para a página inicial). */
function ProjectTypeHeader({ project }: { project: ProjectHeader }) {
  return (
    <header className={`${styles.header} ${styles.project} ${ANIMATE_ENTRANCE ? styles.enter : ''}`}>
      <div className={styles.profile}>
        <ButtonIcon icon="keyboard-arrow-left" label="Voltar para projetos" to="/" />
        <span className={styles.logoSlot}>
          <img src={project.logo} alt={project.title} />
        </span>
      </div>

      <NavBar className={styles.nav} />

      <div className={styles.actions}>{project.year && <span className={styles.year}>{project.year}</span>}</div>
    </header>
  )
}

/** Type=Default — avatar + nome, menu, CV, LinkedIn e tema. */
function DefaultHeader() {
  const { theme, toggle } = useTheme()
  const [avatarFailed, setAvatarFailed] = useState(false)
  const nextTheme = theme === 'dark' ? 'claro' : 'escuro'

  return (
    <header className={`${styles.header} ${ANIMATE_ENTRANCE ? styles.enter : ''}`}>
      <Link to="/" className={styles.profile}>
        <span className={styles.avatar}>
          {!avatarFailed && (
            <img
              src={site.avatar}
              alt={`Foto de ${site.name}`}
              width={72}
              height={72}
              onError={() => setAvatarFailed(true)}
            />
          )}
        </span>
        <span className={styles.identity}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>{site.role}</span>
        </span>
      </Link>

      <NavBar className={styles.nav} />

      <div className={styles.actions}>
        {site.cvUrl && (
          <ButtonIcon icon="lab-profile" label="Baixar currículo" href={site.cvUrl} external />
        )}
        <ButtonIcon
          icon="linkedin"
          label="LinkedIn"
          accessibleLabel={`LinkedIn de ${site.name} (abre em nova aba)`}
          href={site.linkedinUrl}
          external
        />
        <ButtonIcon
          icon={theme === 'dark' ? 'wb-sunny' : 'mode-night'}
          label={`Ativar tema ${nextTheme}`}
          onClick={toggle}
        />
      </div>
    </header>
  )
}
