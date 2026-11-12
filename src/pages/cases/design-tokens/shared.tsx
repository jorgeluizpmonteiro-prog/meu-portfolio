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
 * Meias-elipses concêntricas de transição entre seções (grupo de 1811 × 1783), como os arcos do Figma.
 * half: metade de cima (abóbada) ou de baixo (bacia). Todas são cortadas na mesma linha (o centro do
 * grupo), por um contêiner com overflow oculto que encaixa no pixel e não deixa linha entre as faixas.
 * Até 1440 px têm o tamanho do Figma. Em telas largas alargam só o necessário para a elipse branca
 * de dentro cobrir a tela toda na linha de corte: assim o corte nunca aparece e as faixas chegam às
 * bordas da tela por cima do fundo marrom, sem deixar cantos.
 */
/** Metade da altura do grupo de elipses: a linha de corte */
const HALF = 1783 / 2

export function Arcs({ x, y, arcs, half }: { x: number; y: number; arcs: Arc[]; half: 'top' | 'bottom' }) {
  const pct = (v: number) => `${((v / 1811) * 100).toFixed(4)}%`
  return (
    <Abs
      x={x}
      y={half === 'top' ? y : y + HALF}
      h={HALF}
      className={s.arcs}
      style={
        {
          '--aw': 'max(calc(1811 * var(--u)), calc(100cqw * 1811 / 1440))',
          left: `calc(${u(x + 905.5)} - var(--aw) / 2)`,
          width: 'var(--aw)',
        } as CSSProperties
      }
      aria-hidden="true"
    >
      {arcs.map((a) => (
        <span
          key={a.c}
          style={{ left: pct(a.x), top: u(half === 'top' ? a.y : a.y - HALF), width: pct(a.w), height: u(a.h), backgroundColor: a.c }}
        />
      ))}
    </Abs>
  )
}

/**
 * Foto de largura total. Até 1440 px ocupa a largura toda, como no Figma. Em telas largas a foto
 * mantém o tamanho e o enquadramento do Figma, e as laterais são completadas por uma versão
 * desfocada da mesma imagem, que se funde com as bordas da foto (sem cortar em cima e embaixo).
 */
export function WidePhoto({ x, y, w, h, src, alt, eager }: { x: number; y: number; w: number; h: number; src: string; alt: string; eager?: boolean }) {
  return (
    <Abs x={x} y={y} w={w} h={h} className={s.widePhoto} style={bleed(x, w, 'both')}>
      <img src={src} alt="" aria-hidden="true" className={s.widePhotoBlur} loading="lazy" decoding="async" />
      <img
        src={src}
        alt={alt}
        width={Math.round(w)}
        height={Math.round(h)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={s.widePhotoMain}
        style={{ width: u(w) }}
      />
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
export const Bar = ({ x, y, h }: { x: number; y: number; h: number }) => (
  <Abs x={x} y={y} w={16} h={h} className={s.bar} aria-hidden="true" />
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
      <Bar x={barX} y={y} h={130} />
      <Abs x={x} y={y} w={w} className={cx(s.decision, right && s.decisionRight)}>
        <h3>Decisão {n}</h3>
        <p style={textW ? { width: u(textW) } : undefined}>{children}</p>
      </Abs>
    </>
  )
}
