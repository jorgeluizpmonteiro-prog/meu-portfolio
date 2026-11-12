import { Abs } from '../Stage'
import { bleed } from '../units'
import { Arcs, Rings } from './shared'
import { ARCS_B, ARCS_A, BROWN, PEACH } from './constants'
import s from './DesignTokens.module.css'

/*
 * Fundos da parte 2 em diante, na mesma ordem das camadas do Figma (de baixo para cima):
 * marrons até a borda, elipses de transição e círculos de anéis.
 */
const ORANGE_RING = 'rgb(248 135 23 / 0.5)'

export default function Fundos() {
  return (
    <>
      <Abs x={-4} y={22329} w={1449} h={4400} className={s.brown} style={bleed(-4, 1449, 'both')} aria-hidden="true" />
      <Arcs x={-185} y={25903} arcs={ARCS_A} half="top" />
      <Rings x={-1289} y={24230} fill={BROWN} ring={ORANGE_RING} />
      {/* Corta o topo que escaparia acima da linha das faixas laranjas (y 21818,5) */}
      <Rings x={-170} y={21813} fill={BROWN} ring={ORANGE_RING} cut={8} />
      <Rings x={947} y={23223} fill={BROWN} ring={ORANGE_RING} />
      <Rings x={-171} y={20663} fill="#ffffff" ring="#d5e2c2" />
      <Arcs x={-185} y={20927} arcs={ARCS_B} half="bottom" />
      <Rings x={-170} y={14216} fill="#ffffff" ring={PEACH} />
      <Rings x={-170} y={28306} fill="#ffffff" ring={PEACH} />
      <Rings x={-171} y={16774} fill="#ffffff" ring="#d8bcf6" />
      <Rings x={-171} y={18749} fill="#ffffff" ring="#ccd5fe" />
      <Abs x={-4} y={9838} w={1449} h={5030} className={s.brown} style={bleed(-4, 1449, 'both')} aria-hidden="true" />
      {/* Corta o topo que escapava ao lado do princípio 7 (acima da linha das faixas, y 9317,5) */}
      <Rings x={-171} y={9293} fill={BROWN} ring={ORANGE_RING} cut={27} />
      <Arcs x={-186} y={8426} arcs={ARCS_B} half="bottom" />
      <Rings x={-170} y={6521} fill="#ffffff" ring={PEACH} />
    </>
  )
}
