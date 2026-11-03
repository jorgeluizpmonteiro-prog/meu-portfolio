import styles from './DecorativeBackground.module.css'

/**
 * Fundo decorativo — Figma: elipse 2318 × 774 com gradiente radial
 * (background/accent-1/strong → transparente) e efeito Noise branco.
 * Recriado em CSS para acompanhar o tema; decorativo para leitores de tela.
 */
export function DecorativeBackground() {
  return <div className={styles.background} aria-hidden="true" />
}
