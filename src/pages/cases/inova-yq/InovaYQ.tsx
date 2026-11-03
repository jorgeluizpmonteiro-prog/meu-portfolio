import type { CSSProperties, ElementType, ReactNode } from 'react'
import '@fontsource/inter/500.css'
import '../../../styles/satoshi.css'
import { Abs, AbsImg, Stage } from '../Stage'
import { u } from '../units'
import { IA_BOX_HEIGHT, iaBoxes, iaLines } from './arquitetura'
import { flowBoxes, flowCircles, flowDiamonds, flowLines, flowTexts } from './fluxo'
import s from './InovaYQ.module.css'

import topoFundo from '../../../assets/cases/inova-yq/topo-fundo.webp'
import rodapeFundo from '../../../assets/cases/inova-yq/rodape-fundo.webp'
import logoMiro from '../../../assets/cases/inova-yq/logo-miro.svg'
import logoFigma from '../../../assets/cases/inova-yq/logo-figma.svg'
import telaHabilidades from '../../../assets/cases/inova-yq/tela-habilidades.webp'
import notebookInicio from '../../../assets/cases/inova-yq/notebook-inicio.webp'
import telaMensagens from '../../../assets/cases/inova-yq/tela-mensagens.webp'
import telaRevisao from '../../../assets/cases/inova-yq/tela-revisao.webp'
import fluxoSetas1 from '../../../assets/cases/inova-yq/fluxo-setas-1.svg'
import fluxoSetas2 from '../../../assets/cases/inova-yq/fluxo-setas-2.svg'
import avProfessoraA from '../../../assets/cases/inova-yq/avatar-professora-a.webp'
import avProfessoraB from '../../../assets/cases/inova-yq/avatar-professora-b.webp'
import avSecretaria from '../../../assets/cases/inova-yq/avatar-secretaria.webp'
import avSecretaria2 from '../../../assets/cases/inova-yq/avatar-secretaria-2.webp'
import avPais from '../../../assets/cases/inova-yq/avatar-pais.webp'
import avProfessora1 from '../../../assets/cases/inova-yq/avatar-professora-1.webp'
import avProfessora2 from '../../../assets/cases/inova-yq/avatar-professora-2.webp'
import avPais2 from '../../../assets/cases/inova-yq/avatar-pais-2.webp'
import avAutomacao from '../../../assets/cases/inova-yq/avatar-automacao.webp'
import avCentralizacao from '../../../assets/cases/inova-yq/avatar-centralizacao.webp'
import avAcessibilidade from '../../../assets/cases/inova-yq/avatar-acessibilidade.webp'
import telaPlanoDeAula from '../../../assets/cases/inova-yq/tela-plano-de-aula.webp'
import telaRevisaoPlano from '../../../assets/cases/inova-yq/tela-revisao-plano.webp'
import telaMensagensAlerta from '../../../assets/cases/inova-yq/tela-mensagens-alerta.webp'
import celularNaMao from '../../../assets/cases/inova-yq/celular-na-mao.webp'
import iconeSom from '../../../assets/cases/inova-yq/icone-som.svg'
import barraTextura from '../../../assets/cases/inova-yq/barra-textura.webp'
import iconeLixeira from '../../../assets/cases/inova-yq/icone-lixeira.svg'
import telasGaleria from '../../../assets/cases/inova-yq/telas-galeria.webp'
import telasCelular from '../../../assets/cases/inova-yq/telas-celular.webp'

// Ícones do UI Kit (recortados do Figma: Group 712 › Frame 69)
const uiIcons = import.meta.glob<string>('../../../assets/cases/inova-yq/icones/*.webp', {
  eager: true,
  import: 'default',
})
const uiIcon = (slug: string) => uiIcons[`../../../assets/cases/inova-yq/icones/${slug}.webp`]

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/** Estilo de texto do Figma: tamanho e entrelinha em px (escalam com o palco). */
const font = (fs: number, lh: number, extra?: CSSProperties) =>
  ({ '--fs': fs, '--lh': lh / fs, ...extra }) as CSSProperties

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
  as?: ElementType
  className?: string
  children: ReactNode
}

function T({ x, y, w, h, fs, lh, weight, color, center, as = 'p', className, children }: TProps) {
  return (
    <Abs
      as={as}
      x={x}
      y={y}
      w={w}
      h={h}
      className={cx(s.t, center && s.center, className)}
      style={font(fs, lh, { fontWeight: weight, color })}
    >
      {children}
    </Abs>
  )
}

/** Título de seção: Bold 66,77/120,2, azul, centralizado na página */
function SectionTitle({ y, children, left }: { y: number; children: ReactNode; left?: { x: number; w: number } }) {
  return (
    <T as="h2" x={left?.x ?? 0} y={y} w={left?.w ?? 1440} fs={66.77} lh={120.2} center={!left} className={s.title}>
      {children}
    </T>
  )
}

function Chip({ x, y, w, light, children }: { x: number; y: number; w: number; light?: boolean; children: ReactNode }) {
  return (
    <Abs x={x} y={y} w={w} h={49} className={cx(s.t, s.chip, light && s.chipLight)} style={font(20.07, 36.1)}>
      {children}
    </Abs>
  )
}

const Glow = ({ x, y }: { x: number; y: number }) => <Abs x={x} y={y} w={859} h={859} className={s.glow} />
const Glass = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <Abs x={x} y={y} w={size} h={size} className={s.glass} />
)
const Bubble = ({ x, y, size }: { x: number; y: number; size: number }) => (
  <Abs x={x} y={y} w={size} h={size} className={s.bubble} />
)

/** Linha pontilhada azul com bolinha numa das pontas (Necessidades e Funcionalidades) */
function DottedLine({ x1, y1, x2, y2, dot }: { x1: number; y1: number; x2: number; y2: number; dot?: 'start' | 'end' }) {
  const pad = 16
  const minX = Math.min(x1, x2) - pad
  const minY = Math.min(y1, y2) - pad
  const w = Math.abs(x2 - x1) + pad * 2
  const h = Math.abs(y2 - y1) + pad * 2
  const d = dot === 'start' ? [x1, y1] : dot === 'end' ? [x2, y2] : null
  return (
    <Abs as="svg" x={minX} y={minY} w={w} h={h} className={s.dots} aria-hidden="true" viewBox={`${minX} ${minY} ${w} ${h}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#004af7" strokeWidth={5.25} strokeDasharray="4.5 4.5" />
      {d && <circle cx={d[0]} cy={d[1]} r={14} fill="#004af7" />}
    </Abs>
  )
}

/* ——————————————————————————————————————————————————————————————————————— */

const DESIGN_PROCESS = [
  { label: 'Discovery (Imersão)', box: [132, 2471, 165, 148], list: [223, 2602, 141], items: ['Visita de campo', 'Desk Research', 'Matriz CSD', 'Entrevistas', 'Survey'] },
  { label: 'Definy (Síntese)', box: [511, 2781, 134, 122], list: [427, 2639, 180], items: ['Jornada do Usuário', 'Requisitos', 'Benchmaking'] },
  { label: 'Development (Ideação)', box: [770, 2456, 189, 169], list: [819, 2620, 180], items: ['Wireframes', 'Sitemap', 'Fluxo do usuário', 'Prototipagem'] },
  { label: 'Delivery (Validação)', box: [1155, 2758, 165, 148], list: [1088, 2657, 203], items: ['Teste de Usabilidade', 'Métricas'] },
] as const

const CSD = [
  {
    title: 'Certezas', color: '#579a11', note: '#edffd5', x: 242, w: 307,
    notes: [
      'Os pais não têm contato direto com os professores, o contato é apenas com a secretaria via grupo do whatsapp',
      'A escola utiliza um grupo de Whatsapp para o envio da agenda',
      'A avaliação dos alunos acontecem de forma diária e manual',
      'Professores sofrem com a falta de tempo',
    ],
  },
  {
    title: 'Suposições', color: '#9a6d00', note: '#fff5d5', x: 566, w: 308,
    notes: [
      'O email da escola possui recebe muitas mensagens',
      'Com a avaliação feita de modo manual, pode ocorrer a perca dessas informações',
      'A secretaria pedagógica possui uma alta carga de demandas relacionadas ao envio de agendas de todas as séries',
      'Professoras se sentem sobrecarregadas por usarem seu tempo livre para fazer coisas que deveriam ser feitas no horário de trabalho',
    ],
  },
  {
    title: 'Dúvidas', color: '#9a1111', note: '#ffd5d5', x: 892, w: 308,
    notes: [
      'O processo de envio dos planos de aula e agendas das professoras para secretária academica leva quanto tempo?',
      'Como a secretária pedagógica se organiza no processo de envio e recebimento dos planos de aula e agenda?',
      'O envio do plano de aula pelo WhatsApp é efetivo?',
      'Como as professoras documentam os planos de aula e agendas para envio?',
    ],
  },
]

/** Blocos “O que percebemos e o que fizemos?” — fala da persona e necessidade correspondente */
const PERSONAS = [
  { x: 78, y: 4924, avatar: avProfessora1, title: 'Professora:', titleH: 60, text: '"Perco muito tempo procurando os códigos da BNCC em PDFs separados para colar no Word."' },
  { x: 78, y: 5328, avatar: avAutomacao, title: 'Automação de Preenchimento:', titleH: 120, text: 'O sistema deve sugerir e inserir automaticamente os códigos da BNCC baseados na disciplina selecionada.', need: true },
  { x: 892, y: 5723, avatar: avProfessora2, title: 'Professora:', titleH: 60, text: '"É impossível gerenciar o WhatsApp. Mistura mensagem de pai, documento de professor e vida pessoal."' },
  { x: 892, y: 6168, avatar: avCentralizacao, title: 'Centralização de Canais:', titleH: 60, text: 'Unificar a entrega de documentos e a comunicação com famílias em uma plataforma única oficial.', need: true },
  { x: 77, y: 6677, avatar: avPais2, title: 'Pais/Responsáveis:', titleH: 60, text: '"Às vezes chegam bilhetes e eu não consigo ler direito, acabo perdendo o aviso."' },
  { x: 77, y: 7021, avatar: avAcessibilidade, title: 'Acessibilidade Nativa:', titleH: 60, text: 'A interface deve priorizar mensagens de áudio e ícones visuais para apoiar pais com baixo letramento.', need: true },
]

/** Escala tipográfica do app (relativa ao canto do bloco, x 99 / y 9816) */
const TYPE_STYLES: [number, number, number, string][] = [
  [30, 45, 900, '#001268'], [10.5, 30, 400, '#004af7'], [24, 36, 900, '#001268'], [18, 27, 900, '#001268'],
  [15, 22.5, 700, '#001268'], [12, 18, 700, '#001268'], [12, 18, 500, '#001268'], [10.5, 15.8, 400, '#001268'],
  [7.5, 11.3, 400, '#001268'], [7.5, 11.3, 400, '#004af7'],
]
const TYPE_SCALE: [number, number, string, number][] = [
  [0, 0, 'Título 3', 0], [0, 41.3, 'Black', 1], [0, 66.3, 'XXX-Grande', 1],
  [0, 124.3, 'Título 2', 2], [0, 154.3, 'Black', 1], [0, 179.3, 'XX-Grande', 1],
  [0, 237.3, 'Título', 3], [0, 256, 'Black', 1], [0, 281, 'X-Grande', 1],
  [144.8, 0, 'Subtítulo', 4], [144.8, 14, 'Bold', 1], [144.8, 39, 'Grande', 1],
  [144.8, 97, 'Texto Auxiliar', 5], [144.8, 99.5, 'Bold', 1], [144.8, 114.5, 'Médio', 1],
  [144.8, 167.5, 'Corpo de Texto', 6], [144.8, 175, 'Medium', 1], [144.8, 200, 'Médio', 1],
  [144.8, 258, 'Legenda', 7], [144.8, 263.5, 'Regular', 1], [144.8, 288.5, 'Pequeno', 1],
  [144.8, 346.5, 'Legenda de apoio', 8], [144.8, 361.5, 'Regular', 9], [144.8, 376.5, 'Pequeno', 9],
]

/** Família de ícones, na ordem da grade (linhas de 8). [nome, arquivo, tamanho do rótulo] */
const ICONS: [string, string, number][] = [
  ['Home', 'home', 10.5], ['Agenda Escolar', 'agenda-escolar', 10.5], ['Plano de Aula', 'plano-de-aula', 10.5], ['Não visível', 'nao-visivel', 10.5],
  ['Arquivo', 'arquivo', 10.5], ['Cronograma', 'cronograma', 7.5], ['Anexo', 'anexo', 10.5], ['Adicionar', 'adicionar', 10.5],
  ['Turmas', 'turmas', 10.5], ['Caixa de Entrada', 'caixa-de-entrada', 10.5], ['Configurações', 'configuracoes', 8.3], ['Acessibilidade', 'acessibilidade', 6.8],
  ['Chamada para ação', 'chamada-para-acao', 9], ['Status da conta', 'status-da-conta', 10.5], ['Filtro', 'filtro', 10.5], ['Notificações', 'notificacoes', 7.5],
  ['Fechar', 'fechar', 10.5], ['Ajuda', 'ajuda', 10.5], ['Seta Esquerda', 'seta-esquerda', 10.5], ['Erro', 'erro', 10.5],
  ['Atenção', 'atencao', 10.5], ['Sair', 'sair', 10.5], ['Check Box Outline', 'check-box-outline', 9], ['Salvar', 'salvar', 10.5],
  ['Seta Direita', 'seta-direita', 10.5], ['Seta Para Cima', 'seta-para-cima', 10.5], ['Busca', 'busca', 10.5], ['Enviar mensagem', 'enviar-mensagem', 9],
  ['Privacidade', 'privacidade', 8.3], ['Últimas alterações', 'ultimas-alteracoes', 9], ['Excluir', 'excluir', 10.5], ['Comentários', 'comentarios', 7.5],
  ['Seta Para Baixo', 'seta-para-baixo', 10.5], ['Check', 'check', 10.5], ['Check Box', 'check-box', 10.5], ['Informação', 'informacao', 9],
  ['Habilidades', 'habilidades', 8.3], ['Provas e testes', 'provas-e-testes', 10.5], ['Visível', 'visivel', 10.5], ['Editar', 'editar', 10.5],
]

const PALETTES = [
  { title: 'Primária', x: 79.5, y: 10414.5, colors: [['00', '#004AF7'], ['20', '#0033CD'], ['40', '#00219A'], ['60', '#001268'], ['80', '#000735']] },
  { title: 'Secundária', x: 79.5, y: 10629.8, colors: [['00', '#87B7FE'], ['20', '#6391CD'], ['40', '#436C9A'], ['60', '#284868'], ['80', '#122435']] },
  { title: 'Sucesso', x: 662.3, y: 10414.5, colors: [['Clara', '#EDFFD5'], ['Médio', '#91E73E'], ['Escura', '#579A11']] },
  { title: 'Atenção', x: 662.3, y: 10629.8, colors: [['Clara', '#FFF5D5'], ['Médio', '#EFA926'], ['Escura', '#9A6D00']] },
  { title: 'Informação', x: 997.5, y: 10414.5, colors: [['Clara', '#D5FFFF'], ['Médio', '#3EDCE7'], ['Escura', '#11979A']] },
  { title: 'Erro', x: 997.5, y: 10629.8, colors: [['Clara', '#FFD5D5'], ['Médio', '#E73E3E'], ['Escura', '#9A1111']] },
]

/* ——————————————————————————————————————————————————————————————————————— */

/** P.02 — Case Inova+YQ. Figma: node 141:56878. */
export default function InovaYQ() {
  return (
    <main id="conteudo" tabIndex={-1} className={s.page}>
      <h1 className="visually-hidden">Inova+YQ</h1>
      <Topo />
      <DesignProcess />
      <Imersao />
      <MatrizCSD />
      <Necessidades />
      <Arquitetura />
      <Fluxo />
      <UIKit />
      <Telas />
      <Resultados />
      <Rodape />
    </main>
  )
}

/* Topo: mockup, participação, ferramentas e apresentação (y 0–2250) */
function Topo() {
  return (
    <Stage h={2250} aria-label="Apresentação">
      <AbsImg bleed eager x={0} y={0} w={1440} h={1632} src={topoFundo}
        alt="Telas do Inova+YQ em um notebook e um celular" />
      <Glow x={1156} y={1762} />
      <Abs x={79} y={999} w={260} className={cx(s.t, s.meta)} style={font(20.07, 36.1)}>
        <p>Participação:</p>
        <p className={s.metaValues}>
          <span>UX/UI Design</span>
          <span>Sitemap</span>
        </p>
      </Abs>
      <Abs x={1135} y={1016} className={cx(s.t, s.tools)} style={font(20.07, 36.1)}>
        <span>Ferramentas:</span>
        <span className={s.toolLogos}>
          <img src={logoMiro} alt="Miro" width={41} height={41} />
          <img src={logoFigma} alt="Figma" width={41} height={41} />
        </span>
      </Abs>
      <Chip x={78} y={1127} w={230} light>
        O que é o Inova+YQ?
      </Chip>
      <T x={391} y={1188} w={659} fs={30} lh={45}>
        O Inova+YQ é uma <strong>intervenção de Design de Serviço</strong> e Produto Digital desenvolvida para a Escola
        Yolanda Queiroz, localizada em uma área de vulnerabilidade social em Fortaleza (Comunidade do Dendê).
      </T>
      <AbsImg x={171} y={1513} w={502} h={334} src={telaHabilidades} alt="Tela de habilidades do aluno no Inova+YQ" />
      <AbsImg x={300} y={1738} w={842} h={476} src={notebookInicio} alt="Página inicial da professora em um notebook" />
      <AbsImg x={834} y={1491} w={522} h={348} src={telaMensagens} alt="Tela de mensagens com alerta de emergência" />
      <AbsImg x={68} y={1857} w={398} h={266} src={telaRevisao} alt="Tela de revisão do plano de aula" />
    </Stage>
  )
}

/* Design Process (y 2250–3010) */
function DesignProcess() {
  const Y = 2250
  return (
    <Stage h={760} aria-labelledby="inova-design-process">
      <SectionTitle y={9}>
        <span id="inova-design-process">Design Process</span>
      </SectionTitle>
      <Abs as="svg" x={74} y={2382 - Y} w={1292} h={623} viewBox="74 2382 1292 623" aria-hidden="true">
        {[
          [74, 389.75], [720, 404.25], [720, 1035.75], [1366, 1050.25],
        ].map(([apex, base]) => (
          <polygon key={apex + '-' + base} points={`${apex},2693.5 ${base},2423.7 ${base},2963.3`}
            fill="#d9edff" stroke="#d9edff" strokeWidth={6} strokeLinejoin="round" />
        ))}
      </Abs>
      {DESIGN_PROCESS.map((p) => [
        <T key={p.label} as="h3" x={p.box[0]} y={p.box[1] - Y} w={p.box[2]} h={p.box[3]} fs={20.07} lh={36.1} className={s.rotLabel}>
          <span>{p.label}</span>
        </T>,
        <Abs key={p.label + '-lista'} as="ul" x={p.list[0]} y={p.list[1] - Y} w={p.list[2]} className={cx(s.t, s.phaseList)} style={font(20.07, 36.1)}>
          {p.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </Abs>,
      ])}
    </Stage>
  )
}

/* Imersão — “Como agimos” (y 3010–3560) */
function Imersao() {
  const Y = 3010
  const dx = 682
  const dy = 3161
  const labels: [number, number, string, boolean, boolean][] = [
    [846, 3467, '(Drive)', false, true], [749, 3267, '(Drive)', false, true], [1078, 3267, '(Canva)', false, true],
    [943, 3267, '(Drive)', false, true], [828, 3249, 'Professora A', false, false], [1164, 3247, 'Secretaria', false, false],
    [993, 3449, 'Professora B', false, false], [1324, 3443, 'Pais', false, false], [694, 3443, 'Secretaria', false, false],
    [1247, 3267, '(WhatsApp)', false, true], [1158, 3467, '(Face a face)', false, true],
  ]
  const bold: [number, number, number, string][] = [
    [825, 3521, 75, 'Plano de Ensino'], [1155, 3521, 75, 'Feedback'], [705, 3191, 75, 'Plano de Ensino'],
    [948, 3191, 75, 'Plano de Ensino'], [1028, 3198, 75, 'Agenda'], [1281, 3198, 75, 'Agenda'],
  ]
  return (
    <Stage h={550} aria-label="Como agimos">
      <Chip x={92} y={3060 - Y} w={183}>
        Como agimos:
      </Chip>
      <T as="h2" x={64} y={3168 - Y} w={151} h={373} fs={83.55} lh={150.4} className={s.vertical}>
        <span>IMERSÃO</span>
      </T>
      <T x={251} y={3175 - Y} w={383} fs={30} lh={45}>
        Identificamos um cenário <strong>crítico na comunicação</strong> entre gestão, professores e mais de 500 famílias. O
        fluxo informacional estava fragmentado entre canais desconexos (Google Drive, WhatsApp e Canvas).
      </T>
      <Abs x={dx} y={dy - Y} className={s.canvasWrap} role="img"
        aria-label="Diagrama dos fluxos de comunicação: no Fluxo 01, o plano de ensino circula pelo Drive entre a secretaria e as professoras A e B; no Fluxo 02, a agenda vai da secretaria para os pais pelo WhatsApp e volta como feedback presencial.">
        <div className={s.canvas} style={{ '--cw': 694, '--ch': 387 } as CSSProperties} aria-hidden="true">
          <img src={fluxoSetas1} alt="" style={{ left: `calc(${692.4 - dx} * var(--du))`, top: `calc(${3195.75 - dy} * var(--du))`, width: `calc(331 * var(--du))`, height: `calc(314 * var(--du))` }} />
          <img src={fluxoSetas2} alt="" style={{ left: `calc(${1031.3 - dx} * var(--du))`, top: `calc(${3191.2 - dy} * var(--du))`, width: `calc(331 * var(--du))`, height: `calc(319 * var(--du))` }} />
          {[[avProfessoraA, 823, 3161], [avSecretaria2, 1152, 3160], [avSecretaria, 682, 3357], [avProfessoraB, 988, 3363], [avPais, 1296, 3357]].map(([src, x, y]) => (
            <img key={String(src)} src={String(src)} alt="" style={{ left: `calc(${Number(x) - dx} * var(--du))`, top: `calc(${Number(y) - dy} * var(--du))`, width: `calc(80 * var(--du))`, height: `calc(80 * var(--du))` }} />
          ))}
          {labels.map(([x, y, text, , black]) => (
            <span key={`${x}-${y}`} className={cx(s.dlabel, black && s.dlabelBlack)} style={{ left: `calc(${x - dx} * var(--du))`, top: `calc(${y - dy} * var(--du))` }}>
              {text}
            </span>
          ))}
          {bold.map(([x, y, w, text]) => (
            <span key={`${x}-${y}`} className={s.dlabel} style={{ left: `calc(${x - dx} * var(--du))`, top: `calc(${y - dy} * var(--du))`, width: `calc(${w} * var(--du))`, fontWeight: 700, textAlign: 'center', whiteSpace: 'normal' }}>
              {text}
            </span>
          ))}
          <span className={s.fluxLabel} style={{ left: `calc(${823 - dx} * var(--du))`, top: `calc(${3340 - dy} * var(--du))` }}>Fluxo 01</span>
          <span className={s.fluxLabel} style={{ left: `calc(${1149 - dx} * var(--du))`, top: `calc(${3340 - dy} * var(--du))` }}>Fluxo 02</span>
        </div>
      </Abs>
    </Stage>
  )
}

/* Matriz CSD (y 3560–4440) */
function MatrizCSD() {
  const Y = 3560
  return (
    <Stage h={880} aria-labelledby="inova-csd">
      <Glow x={-573} y={3344 - Y} />
      <SectionTitle y={3640 - Y}>
        <span id="inova-csd">Matriz CSD</span>
      </SectionTitle>
      {CSD.map((c) => (
        <Abs key={c.title} x={c.x} y={3854 - Y} w={c.w} className={s.csdColumn}>
          <h3 className={cx(s.t, s.csdHeading)} style={font(36, 36.1, { color: c.color })}>
            {c.title}
          </h3>
          <ul className={s.csdNotes}>
            {c.notes.map((n) => (
              <li key={n} className={s.note} style={{ backgroundColor: c.note }}>
                {n}
              </li>
            ))}
          </ul>
        </Abs>
      ))}
      <T x={246} y={4331 - Y} w={948} fs={30} lh={45} center color="#000000">
        Realizamos imersão na escola e rodamos uma <strong>survey com 129 famílias</strong> para mapear as falhas de
        comunicação.
      </T>
    </Stage>
  )
}

/* Necessidades e Funcionalidades (y 4440–7360) */
function Necessidades() {
  const Y = 4440
  const persona = (p: (typeof PERSONAS)[number]) => (
    <Abs key={p.title + p.y} x={p.x} y={p.y - Y} w={470} className={s.persona}>
      <img src={p.avatar} alt="" width={80} height={80} loading="lazy" />
      <div className={cx(s.personaText, p.need && s.need)}>
        <h3 className={s.t} style={font(30, 45, { minHeight: u(p.titleH) })}>
          {p.title}
        </h3>
        <p className={s.t} style={font(30, 45)}>
          {p.text}
        </p>
      </div>
    </Abs>
  )
  return (
    <Stage h={2920} aria-labelledby="inova-necessidades">
      <Glass x={1050} y={4523 - Y} size={518} />
      <Bubble x={1324} y={4948 - Y} size={185} />
      <Glow x={-570} y={5393 - Y} />
      <Bubble x={-65} y={6449 - Y} size={227} />
      <DottedLine x1={451} y1={5279 - Y} x2={854} y2={5279 - Y} dot="start" />
      <DottedLine x1={386} y1={6116 - Y} x2={854} y2={6116 - Y} dot="end" />
      <DottedLine x1={383} y1={6084 - Y} x2={383} y2={6149 - Y} />
      <DottedLine x1={547} y1={6985 - Y} x2={852} y2={6985 - Y} dot="start" />

      <SectionTitle y={4505 - Y}>
        <span id="inova-necessidades">Necessidades e Funcionalidades</span>
      </SectionTitle>
      <Chip x={77} y={4726 - Y} w={378}>
        O que percebemos e o que fizemos?
      </Chip>
      {persona(PERSONAS[0])}
      {persona(PERSONAS[1])}
      <AbsImg x={789} y={4713 - Y} w={586} h={936} src={telaPlanoDeAula} alt="Formulário de plano de aula com sugestão automática dos códigos da BNCC" />
      {persona(PERSONAS[2])}
      {persona(PERSONAS[3])}
      <AbsImg x={61} y={5706 - Y} w={599} h={401} src={telaRevisaoPlano} alt="Tela de revisão do plano de aula" />
      <AbsImg x={65} y={6129 - Y} w={591} h={394} src={telaMensagensAlerta} alt="Tela de mensagens com alerta de emergência para os responsáveis" />
      {persona(PERSONAS[4])}
      {persona(PERSONAS[5])}
      <AbsImg x={960} y={6528 - Y} w={190} h={188} src={iconeSom} alt="" />
      <AbsImg x={734} y={6594 - Y} w={706} h={682} src={celularNaMao} alt="Mão segurando um celular com o app do Inova+YQ para responsáveis" />
      <AbsImg x={568} y={7277 - Y} w={872} h={69} src={barraTextura} alt="" />
    </Stage>
  )
}

/* Arquitetura da Informação (título y 7360; diagrama y 7560–8300) */
function Arquitetura() {
  const Y = 7560
  return (
    <>
      <Stage h={200} aria-labelledby="inova-ia">
        <SectionTitle y={7412 - 7360}>
          <span id="inova-ia">Arquitetura da Informação</span>
        </SectionTitle>
      </Stage>
      <Stage h={740} role="img"
        aria-label="Mapa do site: a Home leva a Agenda Escolar, Plano de Aula, Conteúdo, Avaliações, Arquivos Complementares, Configurações, Caixa de Entrada, Cronograma e Buscar; o Plano de Aula se desdobra no preenchimento do plano e seus campos.">
        <Glass x={-194} y={8104 - Y} size={575} />
        <Bubble x={-89} y={8529 - Y} size={191} />
        <Abs as="svg" x={0} y={0} w={1440} h={740} viewBox={`0 ${Y} 1440 740`} aria-hidden="true">
          {iaLines.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#87b7fe" strokeWidth={0.8} />
          ))}
        </Abs>
        {iaBoxes.map(([x, y, w, kind, label, lw]) => (
          <Abs key={`${x}-${y}`} x={x} y={y - Y} w={w} h={IA_BOX_HEIGHT} aria-hidden="true"
            className={cx(s.iaBox, kind === 1 && s.iaLight, kind === 2 && s.iaPrimary)}>
            <span style={{ maxWidth: u(lw + 1) }}>
              {label}
              {label === 'BOTÃO DE EXCLUIR ARQUIVO' && (
                <>
                  {' '}(<img src={iconeLixeira} alt="" className={s.trash} />)
                </>
              )}
            </span>
          </Abs>
        ))}
      </Stage>
    </>
  )
}

/* Fluxo do Usuário (título y 8300; diagrama y 8470–9480) */
function Fluxo() {
  const Y = 8470
  return (
    <>
      <Stage h={170} aria-labelledby="inova-fluxo">
        <SectionTitle y={8324 - 8300}>
          <span id="inova-fluxo">Fluxo do Usuário</span>
        </SectionTitle>
      </Stage>
      <Stage h={1010} role="img"
        aria-label="Fluxo do usuário: do acesso e login até a página inicial, com os caminhos de criação do plano de aula, atualização de habilidades das turmas e saída do sistema.">
        <Glow x={1027} y={8870 - Y} />
        <Abs as="svg" x={0} y={0} w={1440} h={1010} viewBox={`0 ${Y} 1440 1010`} aria-hidden="true">
          <defs>
            <marker id="seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse">
              <path d="M1 1 L9 5 L1 9" fill="none" stroke="#818181" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {flowLines.map(([x1, y1, x2, y2, arrow], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#818181" strokeWidth={1.5} strokeLinecap="round"
              markerEnd={arrow === 1 ? 'url(#seta)' : undefined} markerStart={arrow === -1 ? 'url(#seta)' : undefined} />
          ))}
        </Abs>
        {flowBoxes.map(([x, y, w, h]) => (
          <Abs key={`b${x}-${y}`} x={x} y={y - Y} w={w} h={h} className={s.flowBox} aria-hidden="true" />
        ))}
        {flowCircles.map(([x, y, d]) => (
          <Abs key={`c${x}-${y}`} x={x} y={y - Y} w={d} h={d} className={s.flowCircle} aria-hidden="true" />
        ))}
        {flowDiamonds.map(([x, y, d]) => (
          <Abs key={`d${x}-${y}`} x={x} y={y - Y} w={d} h={d} className={s.flowDiamond} aria-hidden="true">
            <span />
          </Abs>
        ))}
        {flowTexts.map(([x, y, w, h, text, kind]) => (
          <Abs key={`t${x}-${y}`} x={x} y={y - Y} w={w} h={h} aria-hidden="true"
            className={cx(s.flowText, kind >= 2 && s.flowTextLight, kind === 3 && s.flowTextDiamond)}>
            {text}
          </Abs>
        ))}
      </Stage>
    </>
  )
}

/* UI Kit (y 9480–10900) */
function UIKit() {
  const Y = 9480
  return (
    <Stage h={1420} aria-labelledby="inova-uikit">
      <SectionTitle y={9543 - Y}>
        <span id="inova-uikit">UI Kit</span>
      </SectionTitle>
      <Chip x={78.8} y={9729 - Y} w={307.5}>
        Escalas Tipográficas
      </Chip>
      <Abs x={99} y={9816 - Y} className={s.canvasWrap}>
        <div className={cx(s.canvas, s.typeScale)} style={{ '--cw': 260, '--ch': 392 } as CSSProperties}>
          {TYPE_SCALE.map(([x, y, text, st]) => {
            const [fs, lh, wt, color] = TYPE_STYLES[st]
            return (
              <p key={`${x}-${y}`} style={{ left: `calc(${x} * var(--du))`, top: `calc(${y} * var(--du))`, fontSize: `calc(${fs} * var(--du))`, lineHeight: lh / fs, fontWeight: wt, color }}>
                {text}
              </p>
            )
          })}
        </div>
      </Abs>
      <Chip x={404.3} y={9729 - Y} w={957}>
        Família de Ícones
      </Chip>
      <Abs as="ul" x={429.8} y={9819.8 - Y} className={s.iconGrid}>
        {ICONS.map(([name, slug, fs]) => (
          <li key={slug} className={s.iconTile} style={{ '--fs': fs } as CSSProperties}>
            <img src={uiIcon(slug)} alt="" width={18} height={18} loading="lazy" />
            <span>{name}</span>
          </li>
        ))}
      </Abs>
      <Chip x={78} y={10327.5 - Y} w={470.3}>
        Cores Principais
      </Chip>
      <Chip x={566.3} y={10327.5 - Y} w={795.8}>
        Cores de Feedback
      </Chip>
      {PALETTES.map((p) => (
        <Abs key={p.title} x={p.x} y={p.y - Y} className={s.palette}>
          <h3 className={s.t} style={font(24, p.title === 'Erro' ? 30 : 36, p.title === 'Erro' ? { fontWeight: 700 } : undefined)}>
            {p.title}
          </h3>
          <ul className={s.swatches} style={{ marginTop: u(p.title === 'Erro' ? 18 : 18) }}>
            {p.colors.map(([name, hex]) => (
              <li key={hex} className={s.swatch}>
                <span style={{ backgroundColor: hex }} />
                <span className={s.swatchName}>{name}</span>
                <span className={s.swatchHex}>{hex}</span>
              </li>
            ))}
          </ul>
        </Abs>
      ))}
    </Stage>
  )
}

/* Aplicação das Telas (y 10900–12100) */
function Telas() {
  const Y = 10900
  return (
    <Stage h={1200} aria-labelledby="inova-telas">
      <SectionTitle y={10955 - Y}>
        <span id="inova-telas">Aplicação das Telas</span>
      </SectionTitle>
      <Abs x={0} y={11163 - Y} w={1440} className={s.gallery}>
        <img src={telasGaleria} alt="Galeria com as telas do Inova+YQ para professoras e secretaria: login, página inicial, plano de aula, mensagens, configurações, turmas, revisão, habilidades e cronograma" width={1440} height={918} loading="lazy" />
      </Abs>
    </Stage>
  )
}

/* Telas do celular + Resultados (y 12100–13597) */
function Resultados() {
  const Y = 12100
  return (
    <Stage h={1497} aria-labelledby="inova-resultados">
      <Abs x={0} y={12130 - Y} w={1440} className={s.gallery}>
        <img src={telasCelular} alt="Telas do app para responsáveis: página inicial, mensagens, perfil do aluno e agenda escolar" width={1440} height={1357} loading="lazy" />
      </Abs>
      <SectionTitle y={13092 - Y} left={{ x: 78, w: 338 }}>
        <span id="inova-resultados">Resultados</span>
      </SectionTitle>
      <Chip x={892} y={13136 - Y} w={470}>
        Eficiência Operacional
      </Chip>
      <T x={78} y={13247 - Y} w={694} fs={30} lh={45}>
        Para confirmar a eficácia do Inova+YQ, realizamos testes de usabilidade com a coordenação e o corpo docente da
        escola. O cenário de teste focou na tarefa mais crítica da jornada:{' '}
        <strong>o preenchimento e envio do planejamento semanal.</strong>
      </T>
      <T x={896} y={13187 - Y} w={276} fs={132.44} lh={238.4} className={s.stat}>
        75%
      </T>
      <T x={1191} y={13248 - Y} w={166} fs={20.07} lh={30.1}>
        De <strong>redução</strong> do tempo de preenchimento dos planos de aula
      </T>
    </Stage>
  )
}

/* Rodapé (y 13597–14314) */
function Rodape() {
  const Y = 13597
  return (
    <Stage h={717} aria-labelledby="inova-fim">
      <AbsImg bleed x={0} y={0} w={1440} h={717} src={rodapeFundo} alt="" />
      <T as="h2" x={391} y={13956 - Y} w={659} fs={66.77} lh={45} center className={s.footerTitle}>
        <span id="inova-fim">Gostou do processo?</span>
      </T>
      <T x={391} y={14073 - Y} w={659} fs={30} lh={45} center>
        Obrigado por ter visto até aqui, espero que tenha gostado do projeto!
      </T>
    </Stage>
  )
}
