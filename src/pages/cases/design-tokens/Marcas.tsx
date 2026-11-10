import type { CSSProperties, ReactNode } from 'react'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/fraunces/400.css'
import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/source-sans-3/400.css'
import '@fontsource/source-sans-3/500.css'
import '../../../styles/satoshi.css'
import { Abs, AbsImg, T } from '../Stage'
import { bleed, u } from '../units'
import { Bar, Body, Title } from './shared'
import { cx } from './constants'
import s from './DesignTokens.module.css'
import m from './Marcas.module.css'

import fotoMonitor from '../../../assets/cases/design-tokens/foto-monitor.webp'
import icFuncionou from '../../../assets/cases/design-tokens/icones/funcionou.svg'
import icFalhou from '../../../assets/cases/design-tokens/icones/falhou.svg'
import icAjustamos from '../../../assets/cases/design-tokens/icones/ajustamos.svg'

/*
 * Três marcas seguindo a mesma estrutura (y 14244 a 22300 no Figma).
 * Os mostruários dos projetos A, B e C são o mesmo componente: só mudam os valores dos tokens
 * de cada marca (cores, fontes e raios), como na documentação.
 */

type Brand = {
  key: string
  dy: number
  /** Variáveis CSS da marca */
  vars: Record<string, string>
  cardsH: number
  badgesY: number
  badgesH: number
  checkCols: number[]
  radioCols: number[]
}

const brandVars = (v: {
  head: string
  body: string
  title: string
  cardTitleWeight: number
  p: [string, string, string]
  sec: [string, string, string]
  secText: string
  terText: string
  ter: [string, string]
  text: string
  placeholder: string
  helper: string
  border: string
  field: string
  trackOff: string
  trackW: number
  flat: string
  flatBorder: string
  link: string
  accentSoft: string
  neutralSoft: string
  neutralStrong: string
  radius: number
  boxRadius: number
  cardRadius: number
  badgeRadius: number
  cardPad: number
}) => ({
  '--b-head': v.head,
  '--b-body': v.body,
  '--b-title': v.title,
  '--b-card-title-weight': String(v.cardTitleWeight),
  '--b-p0': v.p[0],
  '--b-p1': v.p[1],
  '--b-p2': v.p[2],
  '--b-s0': v.sec[0],
  '--b-s1': v.sec[1],
  '--b-s2': v.sec[2],
  '--b-s-text': v.secText,
  '--b-t1': v.ter[0],
  '--b-t2': v.ter[1],
  '--b-t-text': v.terText,
  '--b-text': v.text,
  '--b-placeholder': v.placeholder,
  '--b-helper': v.helper,
  '--b-border': v.border,
  '--b-field': v.field,
  '--b-track-off': v.trackOff,
  '--b-track-w': u(v.trackW),
  '--b-flat': v.flat,
  '--b-flat-border': v.flatBorder,
  '--b-link': v.link,
  '--b-accent-soft': v.accentSoft,
  '--b-neutral-soft': v.neutralSoft,
  '--b-neutral-strong': v.neutralStrong,
  '--b-radius': u(v.radius),
  '--b-box-radius': u(v.boxRadius),
  '--b-card-radius': u(v.cardRadius),
  '--b-badge-radius': v.badgeRadius > 100 ? '9999px' : u(v.badgeRadius),
  '--b-card-pad': u(v.cardPad),
})

const BRANDS: Brand[] = [
  {
    key: 'A',
    dy: 0,
    cardsH: 357,
    badgesY: 18060,
    badgesH: 214,
    checkCols: [0, 88, 176],
    radioCols: [0, 88, 176],
    vars: brandVars({
      head: "'Satoshi', system-ui, sans-serif",
      body: "'Satoshi', system-ui, sans-serif",
      title: '#57277c',
      cardTitleWeight: 700,
      p: ['#9246d7', '#7d34bc', '#6a2f9a'],
      sec: ['#faf6fe', '#f3eafd', '#e9d9fb'],
      secText: '#6a2f9a',
      ter: ['#f6f6f6', '#e6e6e6'],
      terText: '#1a1a1a',
      text: '#1a1a1a',
      placeholder: '#535353',
      helper: '#404040',
      border: '#727272',
      field: '#ffffff',
      trackOff: '#404040',
      trackW: 44,
      flat: '#fafafa',
      flatBorder: '#e6e6e6',
      link: '#7d34bc',
      accentSoft: '#faf6fe',
      neutralSoft: '#f6f6f6',
      neutralStrong: '#404040',
      radius: 8,
      boxRadius: 4,
      cardRadius: 16,
      badgeRadius: 9999,
      cardPad: 16,
    }),
  },
  {
    key: 'B',
    dy: 1976,
    cardsH: 395,
    badgesY: 20075,
    badgesH: 175,
    checkCols: [0, 85, 170],
    radioCols: [0, 85.5, 171],
    vars: brandVars({
      head: "'Space Grotesk', system-ui, sans-serif",
      body: "'DM Sans', system-ui, sans-serif",
      title: '#4e3afe',
      cardTitleWeight: 700,
      p: ['#4e3afe', '#402bda', '#3124aa'],
      sec: ['#f2f5fe', '#e3e8ff', '#ccd5fe'],
      secText: '#3124aa',
      ter: ['#f2f4f8', '#e2e5eb'],
      terText: '#151920',
      text: '#151920',
      placeholder: '#4f5561',
      helper: '#3b404b',
      border: '#6d7380',
      field: '#ffffff',
      trackOff: '#3b404b',
      trackW: 52,
      flat: '#f9fafc',
      flatBorder: '#e2e5eb',
      link: '#402bda',
      accentSoft: '#f2f5fe',
      neutralSoft: '#f2f4f8',
      neutralStrong: '#3b404b',
      radius: 0,
      boxRadius: 0,
      cardRadius: 0,
      badgeRadius: 0,
      cardPad: 20,
    }),
  },
  {
    key: 'C',
    dy: 3888,
    cardsH: 405,
    badgesY: 21987,
    badgesH: 175,
    checkCols: [0, 85, 170],
    radioCols: [0, 85.5, 171],
    vars: brandVars({
      head: "'Fraunces', Georgia, serif",
      body: "'Source Sans 3', system-ui, sans-serif",
      title: '#607538',
      cardTitleWeight: 600,
      p: ['#607538', '#4e602b', '#3e4d22'],
      sec: ['#f5f8f0', '#e9f0df', '#d5e2c2'],
      secText: '#3e4d22',
      ter: ['#f5efe7', '#e8e1d8'],
      terText: '#1c1915',
      text: '#1c1915',
      placeholder: '#59544e',
      helper: '#44403a',
      border: '#78726b',
      field: '#fbf7f1',
      trackOff: '#44403a',
      trackW: 44,
      flat: '#ffffff',
      flatBorder: '#e8e1d8',
      link: '#4e602b',
      accentSoft: '#d5e2c2',
      neutralSoft: '#f5efe7',
      neutralStrong: '#44403a',
      radius: 12,
      boxRadius: 4,
      cardRadius: 24,
      badgeRadius: 9999,
      cardPad: 16,
    }),
  },
]

/** Cabeçalho de cada projeto, tipografia e paletas */
const INTRO = [
  {
    y: 16435,
    tx: 136,
    tw: 1200,
    title: 'Projeto A',
    text: 'O A recebeu os componentes, e os tokens dele ficaram com os valores do modelo. Todo componente usa só tokens da Semântica e estilos ligados a ela.',
  },
  {
    y: 18398,
    tx: 144,
    tw: 1192,
    title: 'Projeto B',
    text: 'O B usa três paletas de marca (índigo elétrico, lima e coral), neutro frio, Space Grotesk com DM Sans e componentes sem raio.',
  },
  {
    y: 20332,
    tx: 144,
    tw: 1192,
    title: 'Projeto C',
    text: 'O C usa uma paleta de marca (verde-musgo), neutro quente, página em linho com cartões brancos, Fraunces SemiBold com Source Sans 3 e cantos macios.',
  },
]

const PALETTES: string[][][] = [
  [
    ['#faf6fe', '#f3eafd', '#e9d9fb', '#d8bcf6', '#c090f0', '#a25ce5', '#9246d7', '#7d34bc', '#6a2f9a', '#57277c', '#3a105b'],
    ['#ecffff', '#cffbfe', '#a5f5fc', '#67ecf9', '#12cee4', '#06bcd4', '#0896b2', '#0e7890', '#156175', '#165063', '#083544'],
    ['#fef2ff', '#fce3ff', '#fac6ff', '#fb99ff', '#fb5dff', '#fa21ff', '#ff00ff', '#cf00cb', '#a900a3', '#890682', '#5e0059'],
    ['#f3f3ff', '#eae9fe', '#d7d6fe', '#b9b5fd', '#968bfa', '#745cf6', '#6f4bef', '#5328d9', '#4521b6', '#3a1d95', '#211065'],
  ],
  [
    ['#f2f5fe', '#e3e8ff', '#ccd5fe', '#acb8fe', '#828ffe', '#5f61fe', '#4e3afe', '#402bda', '#3124aa', '#252080', '#161453'],
    ['#f4ffe8', '#e5fec8', '#cffb97', '#b8f35b', '#a8ea27', '#91ce05', '#72a305', '#567b0d', '#456117', '#394f17', '#1d2c04'],
    ['#fff2ee', '#fee5de', '#feccbe', '#feaa93', '#fe8464', '#fe653b', '#ea5227', '#c23e16', '#993112', '#782913', '#47180b'],
  ],
  [['#f5f8f0', '#e9f0df', '#d5e2c2', '#bbce9e', '#9bb274', '#7a9250', '#607538', '#4e602b', '#3e4d22', '#303c1a', '#1c240e']],
]
const PALETTE_Y = [16974, 18984, 20879]

type Step = [y: number, fs: number, lh: number, name: string]
const SCALE: Step[][] = [
  [
    [16698, 64, 84, 'display/large'],
    [16790, 48, 64, 'display/medium'],
    [16862, 40, 52, 'display/small'],
    [16922, 32, 40, 'heading/large'],
    [16970, 24, 32, 'heading/medium'],
    [17010, 20, 28, 'heading/small'],
    [17046, 18, 28, 'body/large'],
    [17082, 16, 24, 'body/medium'],
    [17114, 14, 20, 'body/small'],
    [17142, 16, 24, 'label/large'],
    [17174, 14, 20, 'label/medium'],
    [17202, 12, 20, 'label/small'],
  ],
  [
    [18687, 72, 92, 'display/large'],
    [18787, 56, 72, 'display/medium'],
    [18867, 48, 64, 'display/small'],
    [18939, 32, 40, 'heading/large'],
    [18987, 24, 32, 'heading/medium'],
    [19027, 20, 28, 'heading/small'],
    [19063, 18, 28, 'body/large'],
    [19099, 16, 24, 'body/medium'],
    [19131, 14, 20, 'body/small'],
    [19159, 16, 24, 'label/large'],
    [19191, 14, 20, 'label/medium'],
    [19219, 12, 20, 'label/small'],
  ],
  [
    [20598, 64, 84, 'display/large'],
    [20690, 48, 64, 'display/medium'],
    [20762, 40, 52, 'display/small'],
    [20822, 32, 40, 'heading/large'],
    [20870, 24, 32, 'heading/medium'],
    [20910, 20, 28, 'heading/small'],
    [20946, 18, 28, 'body/large'],
    [20982, 16, 24, 'body/medium'],
    [21014, 14, 20, 'body/small'],
    [21042, 16, 24, 'label/large'],
    [21074, 14, 20, 'label/medium'],
    [21102, 12, 20, 'label/small'],
  ],
]

/** “Aa” e nomes das fontes de cada projeto */
const SPECIMEN = [
  {
    aa: { y: 16698.3, h: 304, w: 284, weight: 900 },
    names: [
      {
        y: 16891,
        h: 65,
        label: 'Satoshi Variable',
        text: (
          <>
            Satoshi Va<span style={{ fontWeight: 500 }}>ri</span>
            <span style={{ fontWeight: 700 }}>ab</span>l<span style={{ fontWeight: 900 }}>e</span>
          </>
        ),
      },
    ],
  },
  {
    aa: { y: 18727, h: 287, w: 273, weight: 700 },
    names: [
      { y: 18836, h: 61, label: 'Space Grotesk', text: 'Space Grotesk', head: true },
      { y: 18901, h: 62, label: 'DM Sans', text: 'DM Sans' },
    ],
  },
  {
    aa: { y: 20627, h: 278, w: 254, weight: 700 },
    names: [
      { y: 20733, h: 59, label: 'Fraunces', text: 'Fraunces', head: true },
      { y: 20796, h: 68, label: 'Source Sans 3', text: 'Source Sans 3' },
    ],
  },
]

/* —— Componentes do mostruário —— */

/** Cartão do mostruário: título na fonte de títulos da marca, divisor e conteúdo */
function Panel({ x, y, w, h, title, children, className }: { x: number; y: number; w: number; h: number; title: string; children: ReactNode; className?: string }) {
  return (
    <Abs x={x} y={y} w={w} h={h} className={m.panel}>
      <h4>{title}</h4>
      <hr />
      <div className={cx(m.panelBody, className)}>{children}</div>
    </Abs>
  )
}

/** Peça posicionada dentro do conteúdo do cartão (coordenadas relativas) */
const At = ({ x, y, children, className, style }: { x: number; y: number; children: ReactNode; className?: string; style?: CSSProperties }) => (
  <span className={cx(m.at, className)} style={{ left: u(x), top: u(y), ...style }}>
    {children}
  </span>
)

const STATES = ['', 'hover', 'pressed', 'focus', 'disabled'] as const
const VARIANTS = ['primary', 'secondary', 'tertiary', 'danger'] as const

const Check = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.25 8.25 6.75 10.75 11.75 5.25" />
  </svg>
)

const FieldIcon = ({ ok }: { ok?: boolean }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={m.fieldIcon}>
    <circle cx="8" cy="8" r="6.25" />
    {ok ? <path d="M5.4 8.2 7.2 10 10.6 6.4" /> : <path d="M6 6l4 4m0-4-4 4" />}
  </svg>
)

const FIELDS = [
  { state: '', value: '', help: 'Texto de ajuda' },
  { state: '', value: 'Texto preenchido', help: 'Texto de ajuda' },
  { state: 'focus', value: 'Texto preenchido', help: 'Texto de ajuda' },
  { state: 'error', value: 'Texto preenchido', help: 'Mensagem de erro' },
  { state: 'success', value: 'Texto preenchido', help: 'Tudo certo' },
  { state: 'disabled', value: '', help: 'Texto de ajuda' },
]

const BADGE_COLS = [0, 78, 170, 272, 357, 442]
const BADGES = [
  { label: 'Neutro', soft: 'var(--b-neutral-soft)', strong: 'var(--b-neutral-strong)', light: true },
  { label: 'Destaque', soft: 'var(--b-accent-soft)', strong: 'var(--b-p0)', light: true },
  { label: 'Informação', soft: '#eff6ff', strong: '#155dfc', light: true },
  { label: 'Sucesso', soft: '#f0fdf4', strong: '#05df72' },
  { label: 'Atenção', soft: '#fffbeb', strong: '#ffb900' },
  { label: 'Erro', soft: '#fef2f2', strong: '#e7000b', light: true },
]

function CardSample({ raised }: { raised?: boolean }) {
  return (
    <div className={cx(m.sampleCard, raised && m.sampleRaised)}>
      <span className={m.badge} style={{ backgroundColor: 'var(--b-accent-soft)' }}>
        Destaque
      </span>
      <strong className={m.sampleTitle}>Título do card</strong>
      <span className={m.sampleText}>Texto de apoio do card, em text/secondary, com uma ou duas linhas de conteúdo.</span>
      <span className={m.sampleLink}>Saiba mais</span>
      <span className={m.sampleActions}>
        <span className={cx(m.button, m.primary)}>Abrir</span>
        <span className={cx(m.button, m.tertiary)}>Depois</span>
      </span>
    </div>
  )
}

function Showcase({ brand }: { brand: Brand }) {
  const d = brand.dy
  return (
    <div className={m.brand} style={brand.vars as CSSProperties} aria-hidden="true">
      <Panel x={104} y={17274 + d} w={600} h={382} title="Botão">
        {VARIANTS.map((v, r) =>
          STATES.map((st, c) => (
            <At key={v + st} x={c * 115.2} y={r * 76} className={cx(m.button, m.btnFixed, m[v], st && m[st])}>
              Botão
            </At>
          )),
        )}
      </Panel>
      <Panel x={736} y={17274 + d} w={292} h={183} title="Checkbox">
        {[false, true].map((on, r) =>
          ['', 'focus', 'disabled'].map((st, c) => (
            <At key={`${r}${c}`} x={brand.checkCols[c]} y={r * 48} className={cx(m.option, st && m[st])}>
              <span className={cx(m.box, on && m.on)}>{on && <Check />}</span>
              Opção
            </At>
          )),
        )}
      </Panel>
      <Panel x={1043} y={17274 + d} w={293} h={183} title="Radio">
        {[false, true].map((on, r) =>
          ['', 'focus', 'disabled'].map((st, c) => (
            <At key={`${r}${c}`} x={brand.radioCols[c]} y={r * 48} className={cx(m.option, st && m[st])}>
              <span className={cx(m.box, m.radio, on && m.on)} />
              Opção
            </At>
          )),
        )}
      </Panel>
      <Panel x={737} y={17473 + d} w={599} h={183} title="Switch">
        {[false, true].map((on, r) =>
          ['', 'focus', 'disabled'].map((st, c) => (
            <At key={`${r}${c}`} x={c * 124} y={r * 48} className={cx(m.option, st && m[st])}>
              <span className={cx(m.track, on && m.on)} />
              Opção
            </At>
          )),
        )}
      </Panel>
      <Panel x={104} y={17680 + d} w={613} h={594} title="Text Field">
        {FIELDS.map((f, i) => (
          <At key={i} x={(i % 2) * 288.2} y={Math.floor(i / 2) * 144} className={cx(m.field, f.state && m[f.state])}>
            <span className={m.fieldLabel}>Rótulo</span>
            <span className={m.input}>
              <span className={f.value ? undefined : m.placeholder}>{f.value || 'Digite aqui'}</span>
              {(f.state === 'error' || f.state === 'success') && <FieldIcon ok={f.state === 'success'} />}
            </span>
            <span className={m.help}>
              {(f.state === 'error' || f.state === 'success') && <FieldIcon ok={f.state === 'success'} />}
              {f.help}
            </span>
          </At>
        ))}
      </Panel>
      <Panel x={737} y={17680 + d} w={599} h={brand.cardsH} title="Card" className={m.cards}>
        <CardSample />
        <CardSample raised />
      </Panel>
      <Panel x={737} y={brand.badgesY} w={599} h={brand.badgesH} title="Badge">
        {BADGES.map((b, i) => (
          <At key={b.label} x={BADGE_COLS[i]} y={0} className={m.badge} style={{ backgroundColor: b.soft }}>
            {b.label}
          </At>
        ))}
        {BADGES.map((b, i) => (
          <At key={b.label + 's'} x={BADGE_COLS[i]} y={44} className={m.badge} style={{ backgroundColor: b.strong, color: b.light ? '#ffffff' : undefined }}>
            {b.label}
          </At>
        ))}
      </Panel>
    </div>
  )
}

export default function Marcas() {
  return (
    <>
      {/* Transição: foto e destaque laranja */}
      <AbsImg
        x={-2}
        y={14244}
        w={1444}
        h={863}
        src={fotoMonitor}
        alt="Designer trabalhando em um monitor com a lista de variáveis do sistema de design aberta no Figma"
        className={s.cover}
        style={bleed(-2, 1444, 'both')}
      />
      <Abs x={0} y={14907} w={798} h={200} className={s.orangePill} style={bleed(0, 798, 'left')} aria-hidden="true" />
      <T x={104} y={14950} w={600} fs={32} lh={38} color="#ffffff">
        Uma arquitetura no papel ainda não prova nada. Eu precisava ver se ela aguentava <strong>marcas diferentes</strong>.
      </T>

      <section aria-labelledby="dt-marcas">
        <Title id="dt-marcas" x={224} y={15211} w={993} center>
          Três marcas seguindo
          <br />a mesma estrutura
        </Title>
        <Body x={267} y={15500} w={906} lh={48} center>
          Uma IA aplicou a documentação em <strong>três projetos de teste</strong>, com identidades bem diferentes, via
          MCP. Depois, auditei os três arquivos variável por variável.
        </Body>

        <Abs as="article" x={104} y={15713} w={600} h={349} className={s.verdict}>
          <img src={icFuncionou} alt="" width={96} height={96} loading="lazy" />
          <h3>O que funcionou</h3>
          <p style={{ maxWidth: u(399) }}>
            estrutura, nomes, referências e escopos iguais nos quatro arquivos; nenhum token fora do Catálogo; a linha Valor
            certa em 514 de 514 descrições.
          </p>
        </Abs>
        <Abs as="article" x={736} y={15713} w={600} h={349} className={s.verdict}>
          <img src={icFalhou} alt="" width={96} height={96} loading="lazy" />
          <h3>O que falhou</h3>
          <p>
            O anel de foco ficou ao botão primário nos três projetos, porque foco e ação apontavam para o mesmo valor;
            <br />
            Uma marca de cantos retos não cabia na regra de ordem;
            <br />
            21 inconsistências, 9 delas da própria documentação;
            <br />A IA declarou "Conferida" em estilos com descrição errada: das 36 afirmações do relatório dela, 2 foram
            contraditas pelos arquivos.
          </p>
        </Abs>
        <Abs as="article" x={104} y={16086} w={1232} h={253} className={s.verdict}>
          <img src={icAjustamos} alt="" width={96} height={96} loading="lazy" />
          <h3>O que ajustamos</h3>
          <p style={{ maxWidth: u(730) }}>
            Fiz 17 alterações na documentação. Para o foco, escolhi um anel separado do componente, como no Material 3
            (achado da pesquisa de mercado), em vez de deixá-lo grudado ao componente.
          </p>
        </Abs>
      </section>

      {BRANDS.map((brand, i) => {
        const intro = INTRO[i]
        const spec = SPECIMEN[i]
        return (
          <section key={brand.key} aria-labelledby={`dt-projeto-${brand.key}`}>
            <Bar x={104} y={intro.y} h={209} round />
            <Abs x={intro.tx} y={intro.y + 9} w={intro.tw} className={s.projectIntro}>
              <h3 id={`dt-projeto-${brand.key}`}>{intro.title}</h3>
              <p>{intro.text}</p>
            </Abs>

            <div className={m.brand} style={brand.vars as CSSProperties}>
              <p className="visually-hidden">
                Tipografia: {spec.names.map((n) => n.label).join(' e ')}. Paletas de cores, escala tipográfica e componentes
                (botão, checkbox, radio, switch, campo de texto, card e badge) do Projeto {brand.key}.
              </p>
              <T x={104} y={spec.aa.y} w={spec.aa.w} fs={225.1} lh={spec.aa.h} weight={spec.aa.weight} className={m.aa} aria-hidden="true">
                Aa
              </T>
              {spec.names.map((n) => (
                <T key={n.label} x={418} y={n.y} fs={48} lh={n.h} className={cx(m.fontName, 'head' in n && n.head && m.headFont)} aria-hidden="true">
                  {n.text}
                </T>
              ))}
              {PALETTES[i].map((row, r) => (
                <Abs key={r} x={104} y={PALETTE_Y[i] + r * 64} w={705} h={56} className={m.palette} aria-hidden="true">
                  {row.map((c) => (
                    <span key={c} style={{ backgroundColor: c }} />
                  ))}
                </Abs>
              ))}
              {SCALE[i].map(([y, fs, lh, name]) => {
                const kind = name.split('/')[0]
                return (
                  <T
                    key={name}
                    x={821}
                    y={y}
                    w={515}
                    fs={fs}
                    lh={lh}
                    right
                    className={cx(m.scale, kind === 'body' && m.scaleBody, kind === 'label' && m.scaleLabel)}
                    aria-hidden="true"
                  >
                    {name}
                  </T>
                )
              })}
            </div>
            <Showcase brand={brand} />
          </section>
        )
      })}
    </>
  )
}
