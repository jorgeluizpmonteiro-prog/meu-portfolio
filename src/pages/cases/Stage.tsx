import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import styles from './Stage.module.css'

/**
 * Sistema de posicionamento dos cases.
 *
 * As apresentações de case no Figma são composições livres de 1440 px. Cada seção vira um
 * “palco” (Stage) onde os elementos ficam nas coordenadas do Figma, em uma unidade (--u)
 * que vale 1 px a 1440 px de largura e escala com a tela até esse tamanho. No celular a composição
 * é a mesma, só que reduzida. Fundos de textura têm 2560 de largura para cobrir telas grandes.
 */

import { font, u } from './units'

type StageProps = HTMLAttributes<HTMLElement> & {
  /** Altura da seção no Figma */
  h: number
  as?: ElementType
  children: ReactNode
}

export function Stage({ h, as: Tag = 'section', className, style, children, ...rest }: StageProps) {
  return (
    <Tag className={[styles.stage, className].filter(Boolean).join(' ')} style={{ height: u(h), ...style }} {...rest}>
      {children}
    </Tag>
  )
}

type AbsProps = HTMLAttributes<HTMLElement> & {
  x: number
  y: number
  w?: number
  h?: number
  as?: ElementType
  /** Para quando o elemento é um <svg> */
  viewBox?: string
  children?: ReactNode
}

/** Elemento posicionado nas coordenadas do Figma (relativas ao topo da seção). */
export function Abs({ x, y, w, h, as: Tag = 'div', className, style, children, ...rest }: AbsProps) {
  const box: CSSProperties = { left: u(x), top: u(y) }
  if (w !== undefined) box.width = u(w)
  if (h !== undefined) box.height = u(h)
  return (
    <Tag
      className={[styles.abs, className].filter(Boolean).join(' ')}
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
  eager?: boolean
  className?: string
  style?: CSSProperties
}

/** Asset do Figma (mockup, foto, ilustração) posicionado no palco. */
export function AbsImg({ x, y, w, h, src, alt, eager, className, style }: ImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={Math.round(w)}
      height={Math.round(h)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={[styles.abs, styles.img, className].filter(Boolean).join(' ')}
      style={{ left: u(x), top: u(y), width: u(w), height: u(h), ...style }}
    />
  )
}


type TProps = {
  x: number
  y: number
  w?: number
  h?: number
  fs: number
  lh: number
  weight?: number
  color?: string
  center?: boolean
  right?: boolean
  as?: ElementType
  className?: string
  style?: CSSProperties
  id?: string
  children: ReactNode
}

/** Texto posicionado nas coordenadas do Figma. */
export function T({ x, y, w, h, fs, lh, weight, color, center, right, as = 'p', className, style, id, children }: TProps) {
  const textAlign = center ? 'center' : right ? 'right' : undefined
  return (
    <Abs
      as={as}
      id={id}
      x={x}
      y={y}
      w={w}
      h={h}
      className={[styles.text, className].filter(Boolean).join(' ')}
      style={font(fs, lh, { fontWeight: weight, color, textAlign, ...style })}
    >
      {children}
    </Abs>
  )
}
