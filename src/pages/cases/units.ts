import type { CSSProperties } from 'react'

/** Converte uma medida do Figma (px a 1440) para a unidade do palco dos cases (--u). */
export const u = (n: number) => `calc(${n} * var(--u))`

/** Estilo de texto do Figma: tamanho e entrelinha em px (escalam com o palco). */
export const font = (fs: number, lh: number, extra?: CSSProperties) =>
  ({ '--fs': fs, '--lh': lh / fs, ...extra }) as CSSProperties

/**
 * Elementos que no Figma passam da borda da apresentação: em telas maiores que 1440 px eles
 * continuam até a borda da tela. --bleed é a sobra de cada lado (0 até 1440 px).
 */
export function bleed(x: number, w: number, side: 'left' | 'right' | 'both'): CSSProperties {
  const left = side === 'right' ? u(x) : `calc(${u(x)} - var(--bleed))`
  const extra = side === 'both' ? '2 * var(--bleed)' : 'var(--bleed)'
  return { left, width: `calc(${u(w)} + ${extra})` }
}
