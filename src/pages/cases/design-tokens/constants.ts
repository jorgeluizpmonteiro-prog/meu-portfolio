/* Cores e dados comuns às seções do case Design Tokens (da própria apresentação). */

export const BROWN = '#533e26'
export const ORANGE = '#f88717'
export const PEACH = '#ffd0a1'

export const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

export type Arc = { x: number; y: number; w: number; h: number; c: string }

/** Variações das elipses: a do fim da capa/“Como eu iniciei” e a das outras transições */
export const ARCS_A: Arc[] = [
  { x: 0, y: 0, w: 1811, h: 1783, c: '#f88717' },
  { x: 46, y: 42, w: 1719, h: 1691, c: '#ffbc79' },
  { x: 94, y: 87, w: 1623, h: 1597, c: '#ffd0a1' },
  { x: 139, y: 131, w: 1533, h: 1508, c: '#ffebd7' },
  { x: 180, y: 179, w: 1451, h: 1427, c: '#ffffff' },
]
export const ARCS_B: Arc[] = [
  { x: 0, y: 0, w: 1811, h: 1783, c: '#f88717' },
  { x: 46, y: 50, w: 1719, h: 1691, c: '#ffbc79' },
  { x: 94, y: 99, w: 1623, h: 1597, c: '#ffd0a1' },
  { x: 139, y: 144, w: 1533, h: 1508, c: '#ffebd7' },
  { x: 180, y: 177, w: 1451, h: 1427, c: '#ffffff' },
]

