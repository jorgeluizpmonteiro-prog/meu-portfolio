import type { CSSProperties } from 'react'

/** Converte uma medida do Figma (px a 1440) para a unidade do palco dos cases (--u). */
export const u = (n: number) => `calc(${n} * var(--u))`

/** Estilo de texto do Figma: tamanho e entrelinha em px (escalam com o palco). */
export const font = (fs: number, lh: number, extra?: CSSProperties) =>
  ({ '--fs': fs, '--lh': lh / fs, ...extra }) as CSSProperties
