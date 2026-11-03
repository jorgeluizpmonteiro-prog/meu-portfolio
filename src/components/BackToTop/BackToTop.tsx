import { useEffect, useState } from 'react'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import styles from './BackToTop.module.css'

/**
 * Botão fixo “Voltar para o topo”, centralizado na base da tela das páginas de case
 * (mesma posição do botão fixo da página inicial: 48 px da base).
 * Aparece depois que a pessoa rola a primeira tela.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Leva o foco do teclado para o início da página
    document.getElementById('conteudo')?.focus({ preventScroll: true })
  }

  return (
    <div className={`${styles.wrap} ${visible ? '' : styles.hidden}`} inert={!visible}>
      <ButtonIcon icon="keyboard-arrow-up" label="Voltar para o topo" onClick={toTop} className={styles.button} />
    </div>
  )
}
