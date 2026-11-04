import type { CSSProperties, ReactNode } from 'react'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import '@fontsource/open-sans/700.css'
import '@fontsource/open-sans/800.css'
import '../../../styles/satoshi.css'
import { Abs, AbsImg, Stage, T } from '../Stage'
import { u } from '../units'
import { notes } from './canvas'
import s from './Tiddo.module.css'

import mockupCapa from '../../../assets/cases/tiddo/mockup-capa.webp'
import mockupContexto from '../../../assets/cases/tiddo/mockup-contexto.webp'
import operadora from '../../../assets/cases/tiddo/operadora.webp'
import wireframes from '../../../assets/cases/tiddo/wireframes.webp'
import painelTelas from '../../../assets/cases/tiddo/painel-telas.webp'
import mockupPiloto from '../../../assets/cases/tiddo/mockup-piloto.webp'
import cartilha from '../../../assets/cases/tiddo/cartilha.webp'
import simbolo from '../../../assets/cases/tiddo/simbolo.svg'
import setaCurva from '../../../assets/cases/tiddo/seta-curva.svg'
import iconePerfil from '../../../assets/cases/tiddo/icone-perfil-cliente.svg'
import iconeProposta from '../../../assets/cases/tiddo/icone-proposta-valor.svg'
import iconeSemPapel from '../../../assets/cases/tiddo/icone-sem-papel.svg'
import iconeDispositivos from '../../../assets/cases/tiddo/icone-dispositivos.svg'
import iconeNavegacao from '../../../assets/cases/tiddo/icone-navegacao.svg'
import iconeTabela from '../../../assets/cases/tiddo/icone-tabela.svg'
import iconeContrato from '../../../assets/cases/tiddo/icone-contrato.svg'
import iconeSeguranca from '../../../assets/cases/tiddo/icone-seguranca.svg'
import iconeOperador from '../../../assets/cases/tiddo/icone-operador.svg'
import iconeGrafico from '../../../assets/cases/tiddo/icone-grafico.svg'
import foto1 from '../../../assets/cases/tiddo/foto-hackathon-1.webp'
import foto2 from '../../../assets/cases/tiddo/foto-hackathon-2.webp'
import foto3 from '../../../assets/cases/tiddo/foto-hackathon-3.webp'
import foto4 from '../../../assets/cases/tiddo/foto-hackathon-4.webp'
import logoFigma from '../../../assets/cases/comum/logo-figma.svg'
import logoGmail from '../../../assets/cases/comum/logo-gmail.svg'

/*
 * Case Tiddo — Figma: “Página com todos os projetos” › Project - Tiddo (node 208:32391).
 * Composição única de 1440 × 15657, com os elementos na ordem das camadas do Figma.
 * Cores e fontes (Open Sans e Satoshi) da própria apresentação.
 */

const NAVY = '#04235d'
const DARK = '#031942'
const BLUE = '#0b46dc'
const CYAN = '#74d3fd'
const WHITE = '#fefefe'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/**
 * Faixas e fundos que no Figma passam da borda da apresentação: em telas maiores que 1440 px
 * eles continuam até a borda da tela (--bleed é a sobra de cada lado; 0 até 1440 px).
 */
function bleed(x: number, w: number, side: 'left' | 'right' | 'both'): CSSProperties {
  const left = side === 'right' ? u(x) : `calc(${u(x)} - var(--bleed))`
  const extra = side === 'both' ? '2 * var(--bleed)' : 'var(--bleed)'
  return { left, width: `calc(${u(w)} + ${extra})` }
}

/** Faixa azul-clara arredondada com o título da seção (Open Sans ExtraBold 66,77, caixa alta) */
function TitleBand({
  band,
  side,
  text,
  id,
}: {
  band: [number, number, number]
  side: 'left' | 'right'
  text: [number, number, string]
  id: string
}) {
  const [x, y, w] = band
  return (
    <>
      <Abs x={x} y={y} w={w} h={126.8} className={s.band} style={bleed(x, w, side)} />
      <T as="h2" id={id} x={text[0]} y={y} w={text[1]} fs={66.77} lh={120.19} weight={800} color={WHITE} className={s.title}>
        {text[2]}
      </T>
    </>
  )
}

/** Painel azul-escuro com cantos arredondados (superior direito e inferior esquerdo) */
const DarkPanel = ({ y, h }: { y: number; h: number }) => (
  <Abs x={0} y={y} w={1440} h={h} className={s.panel} style={bleed(0, 1440, 'both')} />
)

/** Brilho desfocado (“Círculo decorativo”, desfoque 225), centrado em cx, cy */
function Glow({ x, y, r, color, noise }: { x: number; y: number; r: number; color: string; noise?: boolean }) {
  // Disco de raio r com desfoque gaussiano (σ ≈ 112): opaco no centro e some a ~2,5σ da borda
  const R = r + 280
  const pct = (d: number) => `${((d / R) * 100).toFixed(1)}%`
  const mix = (a: number) => `color-mix(in srgb, ${color} ${a}%, transparent)`
  const background = `radial-gradient(closest-side, ${color}, ${color} ${pct(r - 112)}, ${mix(50)} ${pct(r)}, ${mix(10)} ${pct(r + 112)}, transparent)`
  return (
    <Abs
      x={x - R}
      y={y - R}
      w={R * 2}
      h={R * 2}
      className={cx(s.glow, noise && s.noise)}
      style={{ background, '--solid': pct(r) } as CSSProperties}
      aria-hidden="true"
    />
  )
}

/** Etiqueta com contorno (Satoshi Bold 20,07) */
function Chip({ x, y, w, children }: { x: number; y: number; w: number; children: ReactNode }) {
  return (
    <Abs x={x} y={y} w={w} h={49} className={s.chip}>
      {children}
    </Abs>
  )
}

/** Texto ao lado do processo, ligado por uma linha com bolinha */
function SideNote({ x, y, w, right, color, children }: { x: number; y: number; w: number; right?: boolean; color: string; children: ReactNode }) {
  return (
    <T x={x} y={y} w={w} fs={18} lh={27} color={color} right={right}>
      {children}
    </T>
  )
}

/** Linhas com bolinha: [x da linha sem bolinha, x da bolinha, y] */
function Connectors({ lines, color }: { lines: [number, number, number][]; color: string }) {
  const ys = lines.map((l) => l[2])
  const top = Math.min(...ys) - 20
  const h = Math.max(...ys) - top + 20
  return (
    <Abs as="svg" x={300} y={top} w={850} h={h} viewBox={`300 ${top} 850 ${h}`} className={s.connectors} aria-hidden="true" style={{ color }}>
      {lines.map(([a, b, y]) => (
        <g key={`${a}-${y}`}>
          <path d={`M${a} ${y}H${b}`} />
          <circle cx={b} cy={y} r={10} />
        </g>
      ))}
    </Abs>
  )
}

/** Menu suspenso aberto com etapas (Processo de Design / Validação e melhorias) */
function Dropdown({ x, y, title, items, selected, dark }: { x: number; y: number; title: string; items: string[]; selected: number; dark?: boolean }) {
  return (
    <Abs x={x} y={y} w={633} className={cx(s.dropdown, dark && s.dropdownDark)}>
      <div className={s.ddHead}>
        <span>{title}</span>
        <svg viewBox="0 0 27 17" aria-hidden="true">
          <path d="M1.768 14.976 13.261 2.598l11.493 12.378" />
        </svg>
      </div>
      <ul className={s.ddList}>
        {items.map((item, i) => (
          <li key={item} className={cx(i === selected && s.ddSelected)}>
            <span>{item}</span>
            <span className={s.ddBox} aria-hidden="true">
              {i === selected && (
                <svg viewBox="0 0 34 25">
                  <path d="M30.943 2.652 9.844 22.102 2.652 15.472" />
                </svg>
              )}
            </span>
          </li>
        ))}
      </ul>
    </Abs>
  )
}

/** Texto curvo do canvas (Open Sans Bold 18, centralizado no arco) */
function CurvedLabel({ id, d, matrix, children }: { id: string; d: string; matrix: string; children: string }) {
  return (
    <g transform={`matrix(${matrix})`}>
      <path id={id} d={d} fill="none" />
      <text>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {children}
        </textPath>
      </text>
    </g>
  )
}

const ARC_H = 'M0 22.919C96.366-7.536 149.207-7.744 241.5 22.919'
const ARC_V = 'M0 19.093C91.495-6.566 145.445-6.162 246 19.093'

/** Círculo do canvas: centro, raios até as bordas (para cima e para baixo) */
const CANVAS_CIRCLES = [
  { x: 108, center: [392.25, 4038.75] },
  { x: 759, center: [1043.25, 4038.75] },
] as const

const DECISIONS = [
  {
    x: 240.8,
    y: 5964,
    icons: [
      { src: iconeSemPapel, w: 58, h: 61, bg: '#ffc2c2' },
      { src: iconeDispositivos, w: 55, h: 44, bg: '#c4ffd4' },
    ],
    arrow: true,
    textW: 348,
    text: (
      <>
        Substituição das pranchetas e cadernos por uma <strong>interface dinâmica</strong> e baseada em etapas.
      </>
    ),
  },
  {
    x: 779.3,
    y: 5964,
    icons: [
      { src: iconeNavegacao, w: 61, h: 61, bg: '#ffc2c2' },
      { src: iconeTabela, w: 65, h: 65, bg: '#c4ffd4' },
    ],
    arrow: true,
    textW: 360,
    text: (
      <>
        Padronização de dados e termos para <strong>reduzir a carga cognitiva</strong> durante o uso.
      </>
    ),
  },
  {
    x: 240.8,
    y: 6381.9,
    icons: [
      { src: iconeContrato, w: 72, h: 72, bg: '#ffc2c2' },
      { src: iconeSeguranca, w: 72, h: 72, bg: '#c4ffd4' },
    ],
    arrow: true,
    textW: 348,
    text: (
      <>
        Implementação de coleta de assinaturas de forma <strong>segura e digital</strong> para garantir validade legal.
      </>
    ),
  },
  {
    x: 779.3,
    y: 6381.8,
    icons: [
      { src: iconeOperador, w: 72, h: 72, bg: '#d0f0fe' },
      { src: iconeGrafico, w: 67, h: 67, bg: '#d0f0fe' },
    ],
    arrow: false,
    textW: 360,
    text: (
      <>
        Criação de <strong>visões distintas</strong>: uma focada na execução ágil para o operador e outra com dashboards
        para os supervisores.
      </>
    ),
  },
]

/** Fluxos de tarefas da prototipação: círculos nas pontas, caixas no meio e setas entre eles */
const FLOWS = [
  {
    label: 'Colaborador',
    chip: [78, 7292.3, 203],
    y: 7392.8,
    start: 'Login',
    end: { x: 1135.5, text: 'Envio para assinatura' },
    boxes: [
      { x: 210, w: 92, h: 47, text: 'Home' },
      { x: 338.3, w: 154, h: 47, text: 'Criar checklist' },
      { x: 528, w: 180, h: 47, text: 'Escolher máquina' },
      { x: 743.3, w: 162, h: 70, text: 'Preenchimento guiado' },
      { x: 941.3, w: 158, h: 47, text: 'Tela de revisão' },
    ],
    arrows: [180, 308.3, 498, 713.3, 911.3, 1105.5],
  },
  {
    label: 'Gestor',
    chip: [78, 7571.3, 126],
    y: 7671.8,
    start: 'Dashboard',
    end: { x: 841.5, text: 'Assinatura digital' },
    boxes: [
      { x: 210, w: 172.5, h: 70, text: 'Lista de checklists feitas' },
      { x: 418.5, w: 174.8, h: 70, text: 'Expansão por equipamento' },
      { x: 629.3, w: 176.3, h: 70, text: 'Revisão do documento' },
    ],
    arrows: [180, 388.5, 599.3, 811.5],
  },
] as const

/** Fotos do hackathon: moldura quadrada arredondada (x) com a foto já recortada */
const PHOTOS = [
  { x: -22.5, src: foto1, alt: 'Equipe do Tiddo reunida no auditório durante o hackathon' },
  { x: 352.3, src: foto2, alt: 'Integrantes da equipe sorrindo no evento do hackathon' },
  { x: 727, src: foto3, alt: 'Equipe recebendo o prêmio de segundo lugar no palco' },
  { x: 1101.8, src: foto4, alt: 'Troféu e certificado de segundo lugar no hackathon' },
] as const

const IMPACTS = [
  { value: '50%', x: 80.9, y: 14250.8, w: 176.3, textX: 275.2, textW: 134.3, text: <>De <strong>redução</strong> do tempo de preenchimento</> },
  { value: '100%', x: 513, y: 14250.8, w: 226.7, textX: 757.7, textW: 166.5, text: <>De <strong>rastreabilidade</strong> dos registros</> },
  { value: '90%', x: 512.3, y: 14376.8, w: 177.8, textX: 757.5, textW: 166.5, text: <>De <strong>redução nos erros</strong> de preenchimento</> },
  { value: '90%', x: 1028.3, y: 14248.5, w: 177.8, textX: 1216.5, textW: 147.8, text: <>De <strong>redução no volume</strong> anual de uso de papel</> },
]

/* ——————————————————————————————————————————————————————————————————————— */

export default function Tiddo() {
  return (
    <main id="conteudo" tabIndex={-1} className={s.page}>
      <h1 className="visually-hidden">Tiddo</h1>
      <Stage h={15657} as="div" className={s.stage}>
        {/* —— Capa —— */}
        <section aria-labelledby="tiddo-contexto">
          <Abs x={0} y={0} w={1440} h={942} className={s.coverBg} style={bleed(0, 1440, 'both')} aria-hidden="true" />
          <Glow x={-48.5} y={2803.5} r={262.5} color="#d0edfe" />
          <AbsImg
            x={260}
            y={96}
            w={1181}
            h={887.5}
            src={mockupCapa}
            alt="Mãos segurando um iPhone com o dashboard do Tiddo: checklists feitas, assinaturas e pendentes"
            eager
          />
          <Abs x={0} y={787.5} w={1440} h={154.5} className={s.glass} style={bleed(0, 1440, 'both')} aria-hidden="true" />
          <T x={78} y={832.5} fs={16.73} lh={30.11} color={BLUE} className={s.satoshi}>
            Participação:
          </T>
          <T x={78} y={863.5} fs={16.73} lh={30.11} weight={700} color={BLUE} className={s.satoshi}>
            Product Design
          </T>
          <T x={218.1} y={863.5} fs={16.73} lh={30.11} weight={700} color={BLUE} className={s.satoshi}>
            UX/UI Design
          </T>
          <T x={1223.6} y={848} fs={16.73} lh={30.11} weight={500} color="#ffffff" className={s.satoshi}>
            Ferramenta:
          </T>
          <AbsImg x={1328} y={846.5} w={34} h={34} src={logoFigma} alt="Figma" eager />
          <Abs x={-54} y={942} w={1635} h={62.3} className={s.band} style={bleed(-54, 1635, 'both')} aria-hidden="true" />

          <Chip x={78} y={1082.3} w={229.5}>
            <h2 id="tiddo-contexto">Contexto</h2>
          </Chip>
          <T x={403.5} y={1216.5} w={633} fs={24} lh={38.4} color={NAVY}>
            O Tiddo é uma aplicação desenvolvida e premiada durante o 2° Hackathon promovido pela fábrica de alimentos M.
            Dias Branco. O desafio era <strong className={s.semibold}>digitalizar o preenchimento de checklists de limpeza</strong>{' '}
            industrial. O processo manual levava cerca de 1 hora por tarefa, custava R$ 19.000 anuais em papel e era
            suscetível a erros, o que comprometia a rastreabilidade e elevava os riscos de falhas em auditorias,
            contaminações e multas.
          </T>
          <AbsImg
            x={1124}
            y={1200}
            w={316.5}
            h={523.5}
            src={mockupContexto}
            alt="Mão segurando um iPhone com a tela de preenchimento da checklist"
            className={s.fadeRight}
          />
        </section>

        {/* —— Entendimento do problema —— */}
        <section aria-labelledby="tiddo-entendimento">
          <TitleBand id="tiddo-entendimento" band={[121.5, 1723.5, 1394.3]} side="right" text={[191.3, 1058, 'entendimento do problema']} />
          <T x={395.3} y={1919.3} w={650.3} fs={24} lh={36} color={NAVY} center>
            Para <strong>compreender o cenário real</strong> e as dificuldades da operação, realizamos uma imersão profunda
            focada na fase de Descoberta. Nossa investigação incluiu:
          </T>
          <SideNote x={104.3} y={2223} w={204} right color={NAVY}>
            Para vivenciar o ambiente e as condições de trabalho.
          </SideNote>
          <SideNote x={70.5} y={2403} w={237.8} right color={NAVY}>
            Para organizar as hipóteses iniciais e guiar as perguntas da nossa pesquisa.
          </SideNote>
          <SideNote x={76.5} y={2584.5} w={231.8} right color={NAVY}>
            Identificando a sobrecarga e dificuldades associado à responsabilidade dos documentos.
          </SideNote>
          <SideNote x={1129.5} y={2320.5} w={190.5} color={NAVY}>
            Para alinhar os requisitos de negócio.
          </SideNote>
          <SideNote x={1129.5} y={2501.3} w={228.8} color={NAVY}>
            Para visualizar visualmente os gargalos operacionais de ponta a ponta.
          </SideNote>
          <Connectors
            color={BLUE}
            lines={[
              [402.4, 337.1, 2238.4],
              [402.4, 337.1, 2418.4],
              [402.4, 337.1, 2599.9],
              [1035.8, 1101, 2333.6],
              [1035.8, 1101, 2513.6],
            ]}
          />
          <Dropdown
            x={403.5}
            y={2087.3}
            title="Processo de Design"
            selected={1}
            items={[
              'Visitas de campo às instalações',
              'Reuniões com stakeholders',
              'Matriz CSD',
              'Desenho da jornada e fluxo atual',
              'Levantamento de dores',
            ]}
          />
        </section>

        {/* —— Definição do problema —— */}
        <section aria-labelledby="tiddo-definicao">
          <DarkPanel y={2776.5} h={1904.3} />
          <Glow x={1565.3} y={3533.3} r={365.3} color="#04235d" noise />
          <AbsImg
            x={0}
            y={2860}
            w={385.5}
            h={590.5}
            src={operadora}
            alt="Operadora segurando uma checklist de limpeza impressa"
            className={s.fadeLeft}
          />
          <TitleBand id="tiddo-definicao" band={[-69, 2776.5, 1346.3]} side="left" text={[279.8, 881, 'definição do problema']} />
          <Abs x={-100.5} y={3450} w={648.8} h={188.3} className={s.band} style={bleed(-100.5, 648.8, 'left')} />
          <Abs x={891.8} y={4448.3} w={712.5} h={233.3} className={s.band} style={bleed(891.8, 712.5, 'right')} />
          <T as="h3" x={882.8} y={2995.5} w={479.3} fs={27} lh={40.5} weight={700} color="#fdfefe" right>
            Consolidamos os aprendizados para definir nosso direcionamento:
          </T>
          <T x={915} y={3095.3} w={447} fs={18} lh={30.11} color="#fdfefe" right>
            Como manter a conformidade com as exigências de qualidade e certificações, eliminando o desperdício de tempo e
            recursos do processo manual?
          </T>
          <T x={79.5} y={3483.8} w={307.5} fs={18} lh={30.11} color={NAVY}>
            Para garantir que a solução atacasse as reais necessidades, construímos o{' '}
            <strong>Value Proposition (Canvas de Proposta de Valor):</strong>
          </T>
          <T x={1005.8} y={4473.8} w={356.3} fs={18} lh={30.11} color={NAVY} right>
            Ao mapear o Perfil do Cliente e conectá-lo ao Mapa de Valor, a oportunidade ficou clara: transformar a tarefa
            exaustiva em um processo digital, <strong>otimizando a mão de obra</strong> e alinhando a operação à agenda ESG
            (redução de papel/plástico).
          </T>
          <Abs x={0} y={3277.5} w={380.3} h={172.5} className={s.fadeDown} aria-hidden="true" />

          {/* Canvas de Proposta de Valor: Perfil do Cliente (esquerda) e Mapa de Valor (direita) */}
          <div role="img" aria-label="Canvas de Proposta de Valor: perfil do cliente com ganhos, dores e tarefas, ligado ao mapa de valor com criadores de ganhos, aliviadores de dores e produtos e serviços">
            {CANVAS_CIRCLES.map((c) => (
              <Abs key={c.x} x={c.x} y={3754.5} w={568.5} h={568.5} className={s.canvasCircle} />
            ))}
            <Abs as="svg" x={100} y={3700} w={1240} h={640} viewBox="100 3700 1240 640" className={s.canvasLines} aria-hidden="true">
              {CANVAS_CIRCLES.map(({ center: [ccx, ccy] }) => (
                <path key={ccx} d={`M${ccx} ${ccy}V4323M${ccx} ${ccy}L${ccx + 200.1} 3838.7M${ccx} ${ccy}L${ccx - 200.1} 3838.7`} />
              ))}
            </Abs>
            <Abs x={1018.3} y={4023.9} w={50.5} h={8.1} className={s.canvasPatch} />
            <AbsImg x={363} y={4011} w={58} h={55} src={iconePerfil} alt="" />
            <AbsImg x={1017} y={4007} w={54} h={59} src={iconeProposta} alt="" />
            {notes.map((n) => (
              <Abs key={n.text} x={n.x} y={n.y} w={70} h={75} className={s.note} style={{ backgroundColor: n.color }}>
                {n.text}
              </Abs>
            ))}
            <Abs as="svg" x={0} y={3700} w={1440} h={500} viewBox="0 3700 1440 500" className={s.curved} aria-hidden="true">
              <CurvedLabel id="tiddo-arco-ganhos" d={ARC_H} matrix="1 0 0 1 274.5 3744.75">
                Ganhos
              </CurvedLabel>
              <CurvedLabel id="tiddo-arco-criadores" d={ARC_H} matrix="1 0 0 1 924.75 3744.75">
                Criadores de ganhos
              </CurvedLabel>
              <CurvedLabel id="tiddo-arco-dores" d={ARC_H} matrix="0 -1 1 0 99.75 4160.25">
                Dores
              </CurvedLabel>
              <CurvedLabel id="tiddo-arco-produtos" d={ARC_H} matrix="0 -1 1 0 750 4160.25">
                Produtos e serviços
              </CurvedLabel>
              <CurvedLabel id="tiddo-arco-trabalho" d={ARC_V} matrix="0 1 -1 0 685.843 3916.5">
                Trabalho a ser feito
              </CurvedLabel>
              <CurvedLabel id="tiddo-arco-aliviadores" d={ARC_V} matrix="0 1 -1 0 1336.093 3916.5">
                Aliviadores de dores
              </CurvedLabel>
            </Abs>
            <AbsImg x={659} y={4226} w={122} h={24} src={setaCurva} alt="" />
            <AbsImg x={658} y={3827} w={122} h={24} src={setaCurva} alt="" className={s.rotate180} />
          </div>
        </section>

        {/* —— Ideação da solução —— */}
        <section aria-labelledby="tiddo-ideacao">
          <TitleBand id="tiddo-ideacao" band={[241.5, 4786.5, 1268.3]} side="right" text={[339.8, 762, 'ideação da solução']} />
          <AbsImg
            x={0}
            y={5000}
            w={1440}
            h={646}
            src={wireframes}
            alt="Wireframes das telas do Tiddo: login, início, componente, preenchimento e revisão"
            className={s.fadeX}
          />
          <T x={395.3} y={5744.3} w={650.3} fs={24} lh={38.4} color={NAVY} center>
            A proposta central foi a criação de uma plataforma digital responsiva (Tiddo){' '}
            <strong>focada na experiência</strong> do operador. As <strong>principais decisões</strong> de produto e design
            incluíram:
          </T>
          {DECISIONS.map((d) => (
            <Abs key={d.x + '-' + d.y} x={d.x} y={d.y} w={420} h={313} className={s.decision}>
              {d.icons.map((icon, i) => (
                <span key={i} className={s.decisionIcon} style={{ left: u(30 + i * 216), backgroundColor: icon.bg }}>
                  <img src={icon.src} alt="" width={icon.w} height={icon.h} style={{ width: u(icon.w), height: u(icon.h) }} />
                </span>
              ))}
              {d.arrow && (
                <svg className={s.decisionArrow} viewBox="0 0 39 16" aria-hidden="true">
                  <path d="M0 8H37M30 1l7 7-7 7" />
                </svg>
              )}
              <p style={{ width: u(d.textW) }}>{d.text}</p>
            </Abs>
          ))}
        </section>

        {/* —— Prototipação —— */}
        <section aria-labelledby="tiddo-prototipacao">
          <DarkPanel y={6841.5} h={1119.8} />
          <Glow x={1592.5} y={7475.5} r={365.3} color="#04235d" noise />
          <TitleBand id="tiddo-prototipacao" band={[-141, 6841.5, 1243.5]} side="left" text={[453.8, 532, 'prototipação']} />
          <T as="h3" x={78} y={7050} w={603} fs={27} lh={40.5} weight={700} color="#fdfefe">
            Desenhamos os fluxos priorizando a facilidade de uso no chão de fábrica.
          </T>
          <T x={78} y={7149.8} w={307.5} fs={18} lh={30.11} color="#fdfefe">
            A arquitetura foi dividida em dois task-flows principais:
          </T>
          {FLOWS.map((f) => (
            <div key={f.label}>
              <Abs as="h4" x={f.chip[0]} y={f.chip[1]} w={f.chip[2]} h={65} className={s.flowChip}>
                {f.label}
              </Abs>
              <ol className={s.flowList} aria-label={`Fluxo do ${f.label.toLowerCase()}`}>
                <Abs as="li" x={78} y={f.y} w={96} h={96} className={s.flowCircle}>
                  {f.start}
                </Abs>
                {f.boxes.map((b) => (
                  <Abs as="li" key={b.text} x={b.x} y={f.y + (96 - b.h) / 2} w={b.w} h={b.h} className={s.flowBox}>
                    {b.text}
                  </Abs>
                ))}
                <Abs as="li" x={f.end.x} y={f.y} w={96} h={96} className={s.flowCircle}>
                  {f.end.text}
                </Abs>
              </ol>
              <Abs as="svg" x={170} y={f.y + 38} w={980} h={20} viewBox={`170 ${f.y + 38} 980 20`} className={s.flowArrows} aria-hidden="true">
                {f.arrows.map((ax) => (
                  <path key={ax} d={`M${ax} ${f.y + 48}h24m-5-5 5 5-5 5`} />
                ))}
              </Abs>
            </div>
          ))}
          <AbsImg
            x={0}
            y={7716}
            w={1440}
            h={1847.3}
            src={painelTelas}
            alt="Painel com as telas finais do Tiddo: login, dashboard, checklists feitas, componente, preenchimento e revisão"
            className={s.fadeX}
          />
        </section>

        {/* —— Resultado no hackathon —— */}
        <section aria-labelledby="tiddo-hackathon">
          <TitleBand id="tiddo-hackathon" band={[112, 9491, 1445]} side="right" text={[229.5, 981, 'resultado no hackathon']} />
          <T x={480} y={9716} w={480} fs={24} lh={38.4} color={NAVY} center>
            A solução digital demonstrou <strong>alto valor estratégico</strong> e{' '}
            <strong>viabilidade de implementação</strong>, conquistando o
          </T>
          <p className={s.secondPlace}>
            <T as="span" x={576} y={9838} fs={270} lh={270} weight={700} color={CYAN} className={s.nowrap}>
              2º
            </T>
            <T as="span" x={746} y={10019} w={140} fs={18} lh={25} color={NAVY}>
              lugar no hackathon
            </T>
          </p>
          {PHOTOS.map((p) => (
            <Abs key={p.x} x={p.x} y={10201.6} w={360.5} h={360.5} className={s.photo}>
              <img src={p.src} alt={p.alt} width={721} height={721} loading="lazy" decoding="async" />
            </Abs>
          ))}
        </section>

        {/* —— Projeto piloto —— */}
        <section aria-labelledby="tiddo-piloto">
          <DarkPanel y={10673.3} h={3131.3} />
          <Glow x={720} y={11498.3} r={365.3} color="#04235d" noise />
          <TitleBand id="tiddo-piloto" band={[-106, 10673, 1212]} side="left" text={[440, 561, 'projeto piloto']} />
          <AbsImg x={162} y={10926} w={1135} h={1125} src={simbolo} alt="" className={s.symbol} />
          <AbsImg
            x={402}
            y={11075}
            w={654.5}
            h={829}
            src={mockupPiloto}
            alt="Dois iPhones com as telas de checklists feitas e de revisão do Tiddo"
          />
          <T x={78} y={10939.5} w={432} fs={27} lh={43.2} weight={700} color={WHITE}>
            O sucesso chamou a atenção da indústria parceira, e o conceito evoluiu para um projeto piloto.
          </T>
          <Abs x={829.5} y={11959.5} w={713.3} h={171.8} className={s.band} style={bleed(829.5, 713.3, 'right')} />
          <T x={918} y={11988.8} w={444} fs={18} lh={28.8} color={DARK} right>
            Descobrimos que a empresa já possuía uma iniciativa interna de digitalização operando em outra unidade, mas a
            fábrica local <strong>necessitava de adaptações</strong> estruturais e de usabilidade.
          </T>
          <T x={404.3} y={12291.8} w={632.3} fs={24} lh={38.4} color={WHITE} center>
            Nosso <strong>desafio como designers evoluiu</strong>: integrar nossa visão para avaliar, refinar e testar a
            solução real que estava sendo desenvolvida.
          </T>
          <SideNote x={105} y={12636.8} w={210.8} right color={WHITE}>
            Utilizamos heurísticas de Nielsen, categorizando ocorrências para priorizar correções.
          </SideNote>
          <SideNote x={92.3} y={12816.8} w={223.5} right color={WHITE}>
            Conduzimos testes presenciais e preenchimentos piloto com os usuários.
          </SideNote>
          <SideNote x={84} y={12998.3} w={231.8} right color={WHITE}>
            Estabelecemos um canal aberto via Microsoft Teams para capturar dúvidas e oportunidades de melhoria com os
            usuários finais.
          </SideNote>
          <SideNote x={1137} y={12734.3} w={211.5} color={WHITE}>
            Cadastramos mais de 300 novos componentes de maquinário no banco de dados.
          </SideNote>
          <SideNote x={1137} y={12915} w={228.8} color={WHITE}>
            Desenvolvemos uma &quot;Cartilha de Uso&quot; visual e objetiva para facilitar o onboarding e garantir a adoção da
            ferramenta.
          </SideNote>
          <Connectors
            color={CYAN}
            lines={[
              [409.9, 344.6, 12652.1],
              [409.9, 344.6, 12832.1],
              [409.9, 344.6, 13013.6],
              [1043.3, 1108.5, 12747.4],
              [1043.3, 1108.5, 12927.4],
            ]}
          />
          <Dropdown
            x={403.5}
            y={12501}
            dark
            title="Validação e melhorias"
            selected={1}
            items={[
              'Avaliação Heurística',
              'Revisão da arquitetura da informação',
              'Testes de usabilidade',
              'Documentação de apoio',
              'Coleta de feedback contínuo',
            ]}
          />
          <AbsImg
            x={293}
            y={13212}
            w={856.5}
            h={473}
            src={cartilha}
            alt="Cartilha de uso impressa: Melhorando a experiência — Checklists de Limpeza"
          />
        </section>

        {/* —— Impactos —— */}
        <section aria-labelledby="tiddo-impactos">
          <TitleBand id="tiddo-impactos" band={[401.3, 13894.5, 1170.8]} side="right" text={[543.8, 354, 'impactos']} />
          <Chip x={76.5} y={14142} w={333}>
            <h3>Eficiência</h3>
          </Chip>
          <Chip x={511.1} y={14142} w={418.5}>
            <h3>Segurança e qualidade</h3>
          </Chip>
          <Chip x={1028.3} y={14142} w={336}>
            <h3>Sustentabilidade</h3>
          </Chip>
          {IMPACTS.map((i) => (
            <p key={i.textX + '-' + i.y} className={s.impact}>
              <T as="span" x={i.x - 4} y={i.y - 22.5} w={i.w + 8} fs={92.3} lh={110} weight={800} color="#2ca94d" className={s.nowrap}>
                {i.value}
              </T>
              <T as="span" x={i.textX} y={i.y} w={i.textW} fs={18} lh={23.4} color={NAVY}>
                {' '}
                {i.text}
              </T>
            </p>
          ))}
        </section>

        {/* —— Encerramento —— */}
        <section aria-labelledby="tiddo-fim">
          <T as="h2" id="tiddo-fim" x={378.8} y={14688.8} w={683.3} fs={66.77} lh={45} weight={700} color={DARK} className={s.nowrap}>
            Gostou do processo?
          </T>
          <T x={412.5} y={14778.8} w={615.8} fs={30} lh={45} color={DARK} center>
            Obrigado por ter visto até aqui, espero que tenha gostado do projeto!
          </T>
          <T x={-66.8} y={15165.8} w={1574} fs={286.38} lh={515.49} weight={800} color={CYAN} className={s.bigThanks} aria-hidden="true">
            OBRIGADO
          </T>
          <Abs x={-97.5} y={14971.5} w={1635} h={62.3} className={s.band} style={bleed(-97.5, 1635, 'both')} aria-hidden="true" />
          <Abs x={0} y={15033.8} w={1440} h={623.3} className={s.glass} style={bleed(0, 1440, 'both')} aria-hidden="true" />
          <T x={78} y={15082.3} fs={18} lh={30.11} color={BLUE}>
            Participação:
          </T>
          <T x={78} y={15113.3} fs={18} lh={30.11} weight={700} color={BLUE} className={s.nowrap}>
            Product Design
          </T>
          <T x={235.1} y={15113.3} fs={18} lh={30.11} weight={700} color={BLUE} className={s.nowrap}>
            UX/UI Design
          </T>
          <T x={1172.4} y={15080.9} w={189.6} fs={16.73} lh={30.11} color={BLUE} right>
            Entre em contato:
          </T>
          <Abs x={1069.8} y={15111.9} w={292.3} h={33.8} className={s.mailWrap}>
            <a href="mailto:jorgeluizpmonteiro@gmail.com" className={s.mail}>
              <span>jorgeluizpmonteiro@gmail.com</span>
              <img src={logoGmail} alt="" width={34} height={34} />
            </a>
          </Abs>
        </section>
      </Stage>
    </main>
  )
}
