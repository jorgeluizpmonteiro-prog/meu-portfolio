import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { Abs, T } from '../Stage'
import { bleed, u } from '../units'
import { BROWN, cx, type Arc } from './constants'
import s from './DesignTokens.module.css'

/* Peças comuns às seções do case Design Tokens. */

/**
 * Círculo com anéis concêntricos (efeito de shader do Figma): ring = cor dos anéis,
 * fill = cor do círculo, fade = onde os anéis somem (fração do raio).
 */
export function Rings({ x, y, size = 1782, fill, ring, fade = 0.88 }: { x: number; y: number; size?: number; fill: string; ring: string; fade?: number }) {
  const period = size / 2 / 100 // 100 anéis do centro à borda
  return (
    <Abs
      x={x}
      y={y}
      w={size}
      h={size}
      className={s.rings}
      style={{ '--fill': fill, '--ring': ring, '--period': u(period), '--fade': `${fade * 100}%` } as CSSProperties}
      aria-hidden="true"
    />
  )
}

/**
 * Meias-elipses concêntricas de transição entre seções (grupo de 1811 × 1783), esticam em telas largas.
 * half: metade de cima (abóbada) ou de baixo (bacia), como os arcos do Figma.
 */
export function Arcs({ x, y, arcs, half }: { x: number; y: number; arcs: Arc[]; half: 'top' | 'bottom' }) {
  const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`
  return (
    <Abs x={x} y={y} w={1811} h={1783} className={s.arcs} style={bleed(x, 1811, 'both')} aria-hidden="true">
      {arcs.map((a) => (
        <span
          key={a.c}
          style={{ left: pct(a.x, 1811), top: pct(a.y, 1783), width: pct(a.w, 1811), height: pct(a.h, 1783), backgroundColor: a.c, clipPath: half === 'top' ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)' }}
        />
      ))}
    </Abs>
  )
}

/** Texto corrido (Albert Sans 32/130%) */
export const Body = ({ x, y, w, color = BROWN, center, right, lh = 41.6, weight, children }: { x: number; y: number; w: number; color?: string; center?: boolean; right?: boolean; lh?: number; weight?: number; children: ReactNode }) => (
  <T x={x} y={y} w={w} fs={32} lh={lh} weight={weight} color={color} center={center} right={right}>
    {children}
  </T>
)

/** Título de seção (Roboto Light 96/130%); quebras de linha como no Figma */
export const Title = ({ x, y, w, id, color = BROWN, center, right, children }: { x: number; y: number; w: number; id: string; color?: string; center?: boolean; right?: boolean; children: ReactNode }) => (
  <T as="h2" id={id} x={x} y={y} w={w} fs={96} lh={124.8} weight={300} color={color} center={center} right={right} className={s.title}>
    {children}
  </T>
)

/** Barra laranja de destaque ao lado dos textos */
export const Bar = ({ x, y, h, round }: { x: number; y: number; h: number; round?: boolean }) => (
  <Abs x={x} y={y} w={16} h={h} className={cx(s.bar, round && s.barRound)} aria-hidden="true" />
)

/** Trecho de código/token dentro dos textos */
export const Tk = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <span className={light ? s.tkLight : s.tk}>
    {typeof children === 'string'
      ? children.split('/').map((part, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <>
                /<wbr />
              </>
            )}
            {part}
          </Fragment>
        ))
      : children}
  </span>
)

/** Número dentro de círculo (cartões de princípios, perguntas e resultados) */
export const Num = ({ n, inverse }: { n: number; inverse?: boolean }) => (
  <span className={cx(s.num, inverse && s.numInverse)} aria-hidden="true">
    {n}
  </span>
)

/** Cabeçalho “Decisão N” com a barra laranja (à esquerda ou à direita) */
export function Decision({ n, x, y, w, textW, barX, right, children }: { n: number; x: number; y: number; w: number; textW?: number; barX: number; right?: boolean; children: ReactNode }) {
  return (
    <>
      <Bar x={barX} y={y} h={130} round />
      <Abs x={x} y={y} w={w} className={cx(s.decision, right && s.decisionRight)}>
        <h3>Decisão {n}</h3>
        <p style={textW ? { width: u(textW) } : undefined}>{children}</p>
      </Abs>
    </>
  )
}
