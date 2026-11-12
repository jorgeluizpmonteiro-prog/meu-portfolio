import { Fragment, type ReactNode } from 'react'
import { Abs, AbsImg, T } from '../Stage'
import { u } from '../units'
import { Title } from './shared'
import { PEACH } from './constants'
import s from './DesignTokens.module.css'

import vortex from '../../../assets/cases/design-tokens/vortex.svg'
import maoTelefone from '../../../assets/cases/design-tokens/mao-telefone.webp'
import icWebhook from '../../../assets/cases/design-tokens/fluxo/webhook.svg'
import icCodigo from '../../../assets/cases/design-tokens/fluxo/codigo.svg'
import icEspera from '../../../assets/cases/design-tokens/fluxo/espera.svg'
import icTabela from '../../../assets/cases/design-tokens/fluxo/tabela.svg'
import icRamificacao from '../../../assets/cases/design-tokens/fluxo/ramificacao.svg'
import icDrive from '../../../assets/cases/design-tokens/fluxo/drive.webp'
import icGmail from '../../../assets/cases/design-tokens/fluxo/gmail.webp'
import icGemini from '../../../assets/cases/design-tokens/fluxo/gemini.webp'

/* Regras que se conferem sozinhas: plugin e os dois fluxos no n8n (y 22745 a 25830 no Figma) */

type Icon = { src: string; w: number; h: number }
const IC: Record<string, Icon> = {
  webhook: { src: icWebhook, w: 36.4, h: 33.6 },
  codigo: { src: icCodigo, w: 33, h: 30 },
  drive: { src: icDrive, w: 43, h: 40 },
  ramificacao: { src: icRamificacao, w: 31, h: 29.5 },
  gemini: { src: icGemini, w: 35, h: 36 },
  tabela: { src: icTabela, w: 29, h: 30.5 },
  gmail: { src: icGmail, w: 36, h: 29 },
  espera: { src: icEspera, w: 24.4, h: 33.4 },
}

type Step = { icon: keyof typeof IC; label: ReactNode; text: string }

const st = (icon: keyof typeof IC, a: string, b?: string): Step => ({
  icon,
  text: b ? `${a} ${b}` : a,
  label: b ? (
    <>
      {a}
      <br />
      {b}
    </>
  ) : (
    a
  ),
})

const FLOW_1: Step[] = [
  st('webhook', 'Recebe do', 'plugin'),
  st('codigo', 'Ler', 'tokens'),
  st('drive', 'Ler', 'documentação'),
  st('codigo', 'Resumir', 'documentação'),
  st('codigo', 'Conferir', 'respostas'),
  st('ramificacao', 'Proposta'),
  st('codigo', 'Auditar', 'respostas'),
  st('codigo', 'Montar', 'ficha'),
  st('drive', 'Salvar no', 'drive'),
  st('codigo', 'Medir'),
  st('tabela', 'Tabela de', 'dados'),
]

const FLOW_2: Step[] = [
  st('webhook', 'Recebe do', 'plugin'),
  st('codigo', 'Ler', 'tokens'),
  st('drive', 'Ler', 'documentação'),
  st('codigo', 'Resumir', 'documentação'),
  st('tabela', 'Busca', 'registro'),
  st('codigo', 'Conferir', 'regras'),
  st('ramificacao', 'Parecer'),
  st('codigo', 'Montar', 'e-mail'),
  st('gmail', 'Aprovação'),
  st('espera', 'Esperar', 'decisão'),
  st('codigo', 'Montar', 'registro'),
  st('codigo', 'Medir'),
  st('tabela', 'Tabela de', 'dados'),
  st('codigo', 'Montar', 'retorno'),
  st('gmail', 'Manda', 'mensagem'),
]

const GEMINI = st('gemini', 'Google Gemini', 'Chat Model')

/** Nó do fluxo: ícone num quadrado claro e rótulo embaixo */
function Node({ x, y, step }: { x: number; y: number; step: Step }) {
  const ic = IC[step.icon]
  return (
    <Abs as="li" x={x} y={y} w={64} h={64} className={s.node}>
      <img src={ic.src} alt="" width={Math.round(ic.w)} height={Math.round(ic.h)} loading="lazy" style={{ width: u(ic.w), height: u(ic.h) }} />
      <span className={s.nodeLabel}>{step.label}</span>
    </Abs>
  )
}

/** Setas entre os nós (coordenadas do Figma, a partir de x0, y0) */
function Arrows({ x0, y0, w, h, arrows, width }: { x0: number; y0: number; w: number; h: number; arrows: [number, number, number, number][]; width: number }) {
  const hd = 6 * (width / 2)
  return (
    <Abs as="svg" x={x0} y={y0} w={w} h={h} viewBox={`0 0 ${w} ${h}`} className={s.flowArrows} style={{ strokeWidth: width }} aria-hidden="true">
      {arrows.map(([x1, y1, x2, y2]) => {
        const [a, b, c, d] = [x1 - x0, y1 - y0, x2 - x0, y2 - y0]
        const down = a === c
        const tip = down ? `M${c - hd} ${d - hd} L${c} ${d} L${c + hd} ${d - hd}` : `M${c - hd} ${d - hd} L${c} ${d} L${c - hd} ${d + hd}`
        return (
          <Fragment key={`${x1}-${y1}`}>
            <path d={`M${a} ${b} L${c} ${d}`} />
            <path d={tip} />
          </Fragment>
        )
      })}
    </Abs>
  )
}

export default function Automacao() {
  const flow1Arrows = FLOW_1.slice(1).map((_, i) => [182 + i * 116.78, 24497, 209 + i * 116.78, 24497] as [number, number, number, number])
  const flow2Arrows = FLOW_2.slice(1).map((_, i) => [171 + i * 83.36, 25453, 183 + i * 83.36, 25453] as [number, number, number, number])
  return (
    <section aria-labelledby="dt-regras">
      <Title id="dt-regras" x={224} y={22745} w={993} color={PEACH} center>
        Regras que se
        <br />
        conferem sozinhas
      </Title>
      <T x={115} y={23058} w={1232} fs={32} lh={48} color="#ffffff">
        Para a documentação não depender de quem lembra, pensei a governança como dois fluxos:{' '}
        <strong>personalizar um projeto</strong> e <strong>validar um token específico</strong>, cada um dividindo o
        trabalho entre código, IA e humano.
      </T>

      {/* Plugin no Figma */}
      <Abs x={105} y={23266} w={500} h={627} className={s.pluginFrame} aria-hidden="true" />
      <Abs as="figure" x={129} y={23290} w={452} h={579} className={s.plugin}>
        <figcaption className="visually-hidden">Plugin Tokens do Laboratório: questionário de identidade do projeto</figcaption>
        <div className={s.pluginBrand}>
          <img src={vortex} alt="Vortex" width={83} height={19} loading="lazy" />
          <p>Tokens do Laboratório</p>
        </div>
        <div className={s.pluginTabs}>
          <span className={s.pluginTabOn}>Personalizar projeto</span>
          <span>Validar token específico</span>
        </div>
        <p className={s.pluginHeading}>Questionário de identidade</p>
        <div className={s.pluginField}>
          <span>1. Nome do projeto</span>
          <span className={s.pluginInput}>Digite o nome do projeto</span>
        </div>
        <div className={s.pluginField}>
          <span>2. Cor principal (brand-1)</span>
          <span className={s.pluginInput}>#1A73E8 ou uma escala de cores</span>
          <small>Informe um hex ou as 11 cores de 50 a 950 (uicolors.app).</small>
        </div>
        <div className={s.pluginField}>
          <span>3. Cor brand-2</span>
          <span className={s.pluginInput}>padrão</span>
          <small>Informe um hex, uma escala de cores ou “não usa”.</small>
        </div>
        <span className={s.pluginFade} />
      </Abs>
      <T x={716} y={23290} w={621} fs={32} lh={48} weight={300} color="#ffffff" right>
        Para rodá-los, montei um plugin que é os <strong>olhos e as mãos dentro do Figma</strong>, e deixei as{' '}
        <strong>regras e a IA no n8n</strong>. O plugin existe porque, no plano Education (restrição que temos), o n8n não
        chega às variáveis.
      </T>

      {/* Fluxo 1 */}
      <Title id="dt-fluxo-1" x={104} y={23966} w={922} color={PEACH}>
        Fluxo 1 - Personalizar
        <br />
        um projeto
      </Title>
      <T x={105} y={24252} w={851} fs={24} lh={36} weight={300} color="#ffffff">
        O estagiário responde as 13 perguntas;
        <br />O código calcula o que é conta (trocas na Base, grupos a apagar, contraste);
        <br />A IA propõe as trocas na Semântica seguindo a documentação;
        <br />O código audita a proposta antes de alguém ver.
      </T>
      <ol className={s.plainList} aria-label={`Etapas: ${FLOW_1.map((f) => f.text).join(', ')}`}>
        {FLOW_1.map((f, i) => (
          <Node key={i} x={105 + i * 116.7} y={24469} step={f} />
        ))}
        <Node x={688.5} y={24610} step={GEMINI} />
      </ol>
      <Arrows x0={170} y0={24480} w={1100} h={130} width={2} arrows={[...flow1Arrows, [720.5, 24573, 720.5, 24600]]} />

      {/* Fluxo 2 */}
      <AbsImg x={0} y={24700} w={479.5} h={679.5} src={maoTelefone} className={s.fadeLeft} alt="Mão segurando um celular com o e-mail de aprovação de um token específico" />
      <Title id="dt-fluxo-2" x={414} y={24846} w={922} color={PEACH} right>
        Fluxo 2 - Validar
        <br />
        token específico
      </Title>
      <T x={415} y={25132} w={921} fs={24} lh={36} weight={300} color="#ffffff" right>
        Doze checagens em código (nome, propriedade, referência para a Base, contraste nos dois modos, escopo, seis
        rótulos…);
        <br />A IA responde só o que pede julgamento: algum token já serve? A necessidade já apareceu em 3 ou mais
        projetos?
        <br />A lead decide;
        <br />O registro alimenta a pergunta 3, que sinaliza quando promover à Semântica.
      </T>
      <ol className={s.plainList} aria-label={`Etapas: ${FLOW_2.map((f) => f.text).join(', ')}`}>
        {FLOW_2.map((f, i) => (
          <Node key={i} x={104 + i * 83.36} y={25421} step={f} />
        ))}
        <Node x={604.1} y={25562} step={GEMINI} />
      </ol>
      <Arrows x0={165} y0={25440} w={1110} h={120} width={1.5} arrows={[...flow2Arrows, [636.1, 25525, 636.1, 25552]]} />

      <T x={317} y={25734} w={828} fs={32} lh={48} color="#ffffff" center>
        A parte técnica funcionou cedo.
        <br />O que mais mudou foi a <strong>experiência de quem decide</strong>.
      </T>
    </section>
  )
}
