import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './Stage.module.css'

/**
 * Sistema de posicionamento dos cases.
 *
 * As apresentações de case no Figma são composições livres de 1440 px. Cada seção vira um
 * “palco” (Stage) onde os elementos ficam nas coordenadas do Figma, em uma unidade (--u)
 * que vale 1 px a 1440 px de largura e diminui proporcionalmente em telas menores.
 *
 * No celular (< 768 px), o palco muda de comportamento:
 * - mobile="flow": os elementos saem do posicionamento absoluto e ficam empilhados
 *   na ordem do código (por isso a ordem dos elementos segue a ordem de leitura);
 * - mobile="scroll": o palco mantém o desenho e pode ser rolado na horizontal (diagramas).
 *   Elementos com data-center-scroll abrem centralizados (ver useCenterScroll).
 */

import { u } from './units'

type StageProps = HTMLAttributes<HTMLElement> & {
  /** Altura da seção no Figma */
  h: number
  mobile?: 'flow' | 'scroll'
  as?: ElementType
  children: ReactNode
}

export function Stage({ h, mobile = 'flow', as: Tag = 'section', className, style, children, ...rest }: StageProps) {
  const stage = (
    <Tag
      className={[styles.stage, mobile === 'flow' ? styles.flow : styles.scrollStage, className].filter(Boolean).join(' ')}
      style={{ height: u(h), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
  if (mobile === 'scroll')
    return (
      <div className={styles.scroller} data-center-scroll="">
        {stage}
      </div>
    )
  return stage
}

type AbsProps = HTMLAttributes<HTMLElement> & {
  x: number
  y: number
  w?: number
  h?: number
  as?: ElementType
  /** Some no celular (decoração, linhas de ligação) */
  desktopOnly?: boolean
  /** Para quando o elemento é um <svg> */
  viewBox?: string
  children?: ReactNode
}

/** Elemento posicionado nas coordenadas do Figma (relativas ao topo da seção). */
export function Abs({ x, y, w, h, as: Tag = 'div', desktopOnly, className, style, children, ...rest }: AbsProps) {
  const box: CSSProperties = { left: u(x), top: u(y) }
  if (w !== undefined) box.width = u(w)
  if (h !== undefined) box.height = u(h)
  return (
    <Tag
      className={[styles.abs, desktopOnly && styles.desktopOnly, className].filter(Boolean).join(' ')}
      style={{ ...box, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type ImgProps = {
  x: number
  y: number
  w: number
  h: number
  src: string
  /** Texto alternativo; vazio para imagens decorativas */
  alt: string
  /** Imagem que ocupa a largura toda da tela (fundos) */
  bleed?: boolean
  eager?: boolean
  desktopOnly?: boolean
  className?: string
}

/** Asset do Figma (mockup, foto, ilustração) posicionado no palco. */
export function AbsImg({ x, y, w, h, src, alt, bleed, eager, desktopOnly, className }: ImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={Math.round(w)}
      height={Math.round(h)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={[styles.abs, styles.img, bleed && styles.bleed, desktopOnly && styles.desktopOnly, className]
        .filter(Boolean)
        .join(' ')}
      style={{ left: u(x), top: u(y), width: u(w), height: u(h) }}
    />
  )
}
