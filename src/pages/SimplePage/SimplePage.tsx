import { Link } from 'react-router-dom'
import { buttonClassName } from '../../components/Button/buttonClassName'
import styles from './SimplePage.module.css'

type SimplePageProps = {
  title: string
  text: string
  showHomeLink?: boolean
}

/**
 * Página simples (título + texto), no layout de P.03.
 * Usada pela página 404 e, provisoriamente, pelas páginas que ainda serão desenvolvidas.
 */
export function SimplePage({ title, text, showHomeLink = true }: SimplePageProps) {
  return (
    <main id="conteudo" className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      {showHomeLink && (
        <Link to="/" className={buttonClassName('primary', styles.button)}>
          <span>Ver projetos</span>
        </Link>
      )}
    </main>
  )
}
