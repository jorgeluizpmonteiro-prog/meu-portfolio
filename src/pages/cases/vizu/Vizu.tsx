import { useRef, type CSSProperties, type ReactNode } from 'react'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import '../../../styles/satoshi.css'
import { Abs, AbsImg, Stage, T } from '../Stage'
import { ScrollProgress } from '../motion'
import { useScrollReveal } from '../useScrollReveal'
import { bleed, u } from '../units'
import {
  arrowPath,
  flowBoxes,
  flowCircles,
  flowDiamonds,
  flowLines,
  linePath,
  sitemapBoxes,
  sitemapLines,
  type Box,
  type Line,
} from './diagramas'
import s from './Vizu.module.css'

import texturaCapa from '../../../assets/cases/vizu/textura-capa.webp'
import texturaDireita from '../../../assets/cases/vizu/textura-direita.webp'
import texturaPersonas from '../../../assets/cases/vizu/textura-personas.webp'
import iphoneCapa from '../../../assets/cases/vizu/iphone-capa.webp'
import telaCapa from '../../../assets/cases/vizu/tela-capa.webp'
import maoIntro from '../../../assets/cases/vizu/mao-intro.webp'
import faixasTopo from '../../../assets/cases/vizu/faixas-topo.svg'
import faixasRodape from '../../../assets/cases/vizu/faixas-rodape.svg'
import faixaProcesso from '../../../assets/cases/vizu/faixa-processo.svg'
import fundoEscuro from '../../../assets/cases/vizu/fundo-escuro.svg'
import mosaicoTelas from '../../../assets/cases/vizu/mosaico-telas.webp'
import mosaicoWireframes from '../../../assets/cases/vizu/mosaico-wireframes.webp'
import personaEduardo from '../../../assets/cases/vizu/persona-eduardo.webp'
import personaSofia from '../../../assets/cases/vizu/persona-sofia.webp'
import ilustracaoUsuario from '../../../assets/cases/vizu/ilustracao-usuario.webp'
import ilustracaoFuncional from '../../../assets/cases/vizu/ilustracao-funcional.webp'
import telaColecoes from '../../../assets/cases/vizu/tela-colecoes-tela.webp'
import telaCamera from '../../../assets/cases/vizu/tela-camera-tela.webp'
import telaResultado from '../../../assets/cases/vizu/tela-resultado-tela.webp'
import landingPage from '../../../assets/cases/vizu/landing-page-tela.webp'
import maoLanding from '../../../assets/cases/vizu/mao-landing.webp'
import logoFigma from '../../../assets/cases/comum/logo-figma.svg'
import logoGmail from '../../../assets/cases/comum/logo-gmail.svg'

/*
 * Case Vizu — Figma: “Página com todos os projetos” › Projeto / Vizu — Estudo de caso (node 141:32033).
 * A apresentação é uma composição única de 1440 × 20655: um só palco, com os elementos na ordem
 * das camadas do Figma. Cores e fontes são as da própria apresentação.
 */

const LILAC = '#a39aed'
const LIGHT = '#f1effc'
const PURPLE = '#5e45d8'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/** Título com degradê no texto (Satoshi Bold 96/108) */
function Title({
  x,
  y,
  w,
  id,
  fade = 'both',
  children,
}: {
  x: number
  y: number
  w: number
  id: string
  fade?: 'both' | 'start' | 'end'
  children: ReactNode
}) {
  return (
    <T as="h2" id={id} x={x} y={y} w={w} fs={96} lh={108} className={cx(s.title, fade === 'start' && s.fadeStart, fade === 'end' && s.fadeEnd)} data-reveal="up">
      {children}
    </T>
  )
}

/** Texto corrido lilás 30/45 */
const Body = ({ x, y, w, right, children }: { x: number; y: number; w: number; right?: boolean; children: ReactNode }) => (
  <T x={x} y={y} w={w} fs={30} lh={45} color={LILAC} right={right} data-reveal="up">
    {children}
  </T>
)

/** Brilho escuro desfocado (“Decoração / Círculo”), centrado em cx, cy */
const DarkGlow = ({ x, y }: { x: number; y: number }) => <Abs x={x - 800} y={y - 800} w={1600} h={1600} className={s.darkGlow} />

/** Elipse clara com degradê radial, girada como no Figma */
const LightEllipse = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <Abs
    x={0}
    y={0}
    w={1063.5}
    h={1320}
    className={s.lightEllipse}
    style={{ '--c': color, transform: `translate(${u(x)}, ${u(y)}) rotate(-57.26deg)` } as CSSProperties}
  />
)

/* ——————————————————————————————————————————————————————————————————————— */

const PROCESS = [
  { title: 'Análise', x: 177.5, y: 2823.8, w: 242, items: ['Desk Research', 'Entrevistas', 'Card Sorting'] },
  {
    title: 'Síntese',
    x: 572.5,
    y: 2751.8,
    w: 311,
    items: ['Personas', 'Análise de Dados', 'Matriz de Requisitos', 'Fluxo do Usuário', 'Sitemap'],
  },
  { title: 'Avaliação', x: 1036.5, y: 2859.8, w: 226, items: ['Wireframes', 'Prototipagem'] },
]

const PERSONAS = [
  {
    name: 'Eduardo Duarte',
    img: personaEduardo,
    alt: 'Eduardo, agricultor sorridente de chapéu em uma plantação de café',
    y: 5622.8,
    imgY: 5559,
    goal: 'Poder identificar rapidamente tipos de torras de café para fazer relatórios do estágio.',
    goalW: 372,
    pain: (
      <>
        Utiliza apenas um método de pesquisa escrita para encontrar os tipos de cafés.
        <br />
        Têm pouco tempo para parar e pesquisar coisas do cotidiano.
      </>
    ),
    painX: 873,
    painW: 471.8,
  },
  {
    name: 'Sofia Leite',
    img: personaSofia,
    alt: 'Sofia, mulher colhendo flores em um jardim',
    y: 6066.8,
    imgY: 6003,
    goal: 'Construir um catálogo organizado onde possa salvar todas as suas coletas e visualizar a evolução das espécies identificadas.',
    goalW: 414.8,
    pain: 'A sua dificuldade atual é a fragmentação de informações, com fotos perdidas na galeria do celular e anotações dispersas em cadernos de campo.',
    painX: 872.3,
    painW: 483.8,
  },
]

const REQUIREMENTS = [
  {
    user: 'Sente a necessidade de ter mais precisão com o que está sendo classificado.',
    func: 'Tela de segmentação dos itens identificados no momento do registro da imagem.',
    ux: 78.8,
    fx: 534,
    y: 6823.5,
  },
  {
    user: 'Sente a necessidade de ter acesso às referências para conseguir se basear no feedback.',
    func: 'Funcionalidade de feedback do usuário com imagens de referências.',
    ux: 561,
    fx: 1016.2,
    y: 7090.5,
  },
  {
    user: 'Sente a necessidade de ter acesso às últimas classificações.',
    func: 'Tela para conseguir visualizar histórico de classificações.',
    ux: 78.8,
    fx: 534,
    y: 7357.5,
  },
  {
    user: 'Sente a necessidade de agrupar classificações para acompanhar.',
    func: 'Tela de coleções separadas para cada tipo de classificação',
    ux: 561,
    fx: 1016.2,
    y: 7624.5,
  },
]

const TYPE_SCALE = [
  { label: 'Título 3', x: 77.3, y: 14031, fs: 30, lh: 45, weight: 900, sub: ['Black', 'XXX-Grande'], subY: 14072.2 },
  { label: 'Título 2', x: 77.3, y: 14155.2, fs: 24, lh: 36, weight: 900, sub: ['Black', 'XX-Grande'], subY: 14185.2 },
  { label: 'Título', x: 77.3, y: 14268.2, fs: 18, lh: 27, weight: 900, sub: ['Black', 'X-Grande'], subY: 14287 },
  { label: 'Subtítulo', x: 222.8, y: 14031, fs: 15, lh: 22.5, weight: 700, sub: ['Bold', 'Grande'], subY: 14045 },
  { label: 'Texto Auxiliar', x: 222.8, y: 14128, fs: 12, lh: 18, weight: 700, sub: ['Bold', 'Médio'], subY: 14135.5, subStep: 15 },
  { label: 'Corpo de Texto', x: 222.8, y: 14198.5, fs: 12, lh: 18, weight: 500, sub: ['Medium', 'Médio'], subY: 14206 },
  { label: 'Legenda', x: 222.8, y: 14289, fs: 10.5, lh: 15.75, weight: 400, sub: ['Regular', 'Pequeno'], subY: 14294.5 },
  {
    label: 'Legenda de apoio',
    x: 222.8,
    y: 14377.5,
    fs: 7.5,
    lh: 11.25,
    weight: 400,
    sub: ['Regular', 'Pequeno'],
    subY: 14392.5,
    subStep: 15,
    subFs: 7.5,
    subLh: 11.25,
  },
]

const SHADES = ['-30', '-20', '-10', '00', '10', '20', '30']
const PALETTES = [
  { title: 'Primária', y: 14031, colors: ['#F1EFFC', '#DCD9F8', '#A39AED', '#5E45D8', '#492EBA', '#2D1B7B', '#100738'] },
  { title: 'Secundária', y: 14270.2, colors: ['#E9FBFE', '#D4F7FF', '#7CEBFF', '#12CEE4', '#0FBCD0', '#088796', '#013036'] },
  { title: 'Terciária', y: 14509.5, colors: ['#FFECFF', '#FFD1FF', '#FF87FF', '#FF00FF', '#DF00DF', '#850085', '#260026'] },
]
const FEEDBACK = [
  { title: 'Sucesso', y: 14031, colors: ['#EDFFD5', '#91E73E', '#579A11'] },
  { title: 'Atenção', y: 14270.2, colors: ['#FFF5D5', '#EFA926', '#9A6D00'] },
  { title: 'Erro', y: 14509.5, colors: ['#FFD5D5', '#E73E3E', '#9A1111'] },
]
const FEEDBACK_SHADES = ['Clara', 'Médio', 'Escura']

/** Linhas de chamada da “O ciclo nas telas”: trajeto e ponto da bolinha */
const CALLOUTS: { d: string; dot: [number, number] }[] = [
  { d: 'M560.25 15327.75H408.75', dot: [408.75, 15327.75] },
  { d: 'M560.25 15645.75H408.75', dot: [408.75, 15645.75] },
  { d: 'M576 15926.25H408.75', dot: [408.75, 15926.25] },
  { d: 'M552 16453.5H400.5', dot: [552, 16453.5] },
  { d: 'M1046.25 16705.5H894.75', dot: [894.75, 16705.5] },
  { d: 'M1206.38 16987.5V17005.5Q1206.38 17044.5 1167.38 17044.5H1061.63', dot: [1061.63, 17044.5] },
  { d: 'M869.25 17598H717.75', dot: [869.25, 17598] },
]

/* ——————————————————————————————————————————————————————————————————————— */

/*
 * Mosaico diagonal em carrossel (como o das telas do Tiddo): a faixa é o mosaico do Figma seguido das
 * telas que continuam a grade à direita; ela desliza para a esquerda e volta, sem parar.
 * Sem animação (reduzir movimento), fica parada na posição do Figma.
 */
function MosaicCarousel({ y, src, label }: { y: number; src: string; label: string }) {
  return (
    <Abs x={0} y={y} w={1440} h={1688.67} className={cx(s.mosaic, s.fadeX)} role="img" aria-label={label} data-reveal="mask" data-loop="">
      <img src={src} alt="" width={3000} height={2533} loading="lazy" decoding="async" className={s.mosaicStrip} />
    </Abs>
  )
}

type Phone = {
  /** Caixa do mockup no palco (com a margem da sombra), como no export do Figma */
  box: [number, number, number, number]
  /** Superfície escura (relativa à caixa): x, y, largura, altura, raio, borda */
  surface: [number, number, number, number, number, number]
  /** Tela (relativa à caixa): x, y, largura, altura, raio */
  screen: [number, number, number, number, number]
  src: string
  alt: string
}

/*
 * Mockup com o quadrado escuro do aparelho: a tela sai de dentro dele, de cima para baixo.
 * A superfície é desenhada em CSS; só a tela é imagem. A sombra é a do Figma (r 75 → drop-shadow 62,5).
 */
function PhoneMock({ p, className, style, ...rest }: { p: Phone; className?: string; style?: CSSProperties; [data: `data-${string}`]: string | undefined }) {
  const [sx, sy, sw, sh, sr, sb] = p.surface
  const [tx, ty, tw, th, tr] = p.screen
  return (
    <Abs x={p.box[0]} y={p.box[1]} w={p.box[2]} h={p.box[3]} className={cx(s.phone, className)} style={style} data-reveal="drop" {...rest}>
      <div className={s.phoneSurface} style={{ left: u(sx), top: u(sy), width: u(sw), height: u(sh), borderRadius: u(sr), borderWidth: u(sb) }} />
      <div className={s.phoneScreen} style={{ left: u(tx), top: u(ty), width: u(tw), height: u(th), clipPath: `inset(0 0 -100% 0 round ${u(tr)} ${u(tr)} 0 0)` }}>
        <img src={p.src} alt={p.alt} width={Math.round(tw)} height={Math.round(th)} loading="lazy" decoding="async" data-drop="" />
      </div>
    </Abs>
  )
}

const PHONE_SURFACE: Phone['surface'] = [75, 75, 319.5, 644.25, 45, 2.25]
const PHONES: Record<'colecoes' | 'camera' | 'resultado' | 'landing', Phone> = {
  colecoes: {
    box: [485, 15104, 470, 1226],
    surface: PHONE_SURFACE,
    screen: [90, 90, 290, 1062, 39],
    src: telaColecoes,
    alt: 'Tela inicial do Vizu com coleções, histórico das últimas classificações e referências',
  },
  camera: {
    box: [6, 16268, 470, 794.67],
    surface: PHONE_SURFACE,
    screen: [90, 90, 290, 616, 39],
    src: telaCamera,
    alt: 'Tela da câmera com a foto de uma flor amarela entre folhas',
  },
  resultado: {
    box: [971, 16268, 469.33, 794.67],
    surface: PHONE_SURFACE,
    screen: [90, 90, 290, 616, 39],
    src: telaResultado,
    alt: 'Tela de resultado: Sphagneticola trilobata com 91,2% de certeza, descrição e botões Concluir e Adicionar à coleção',
  },
  landing: {
    box: [8, 17273, 785.33, 2000.67],
    surface: [75, 75, 634.88, 490.92, 34.5, 1.99],
    screen: [88, 86, 610, 1840, 34.5],
    src: landingPage,
    alt: 'Landing page do Vizu: A Plataforma de Classificação por Imagem do Vortex, com seções de modularidade, classificação ágil, coleções e formulário de contato',
  },
}

function Swatch({ x, y, color, name }: { x: number; y: number; color: string; name: string }) {
  return (
    <>
      <Abs x={x} y={y} w={69.8} h={69.8} className={s.swatch} style={{ backgroundColor: color }} data-reveal="scale" />
      <T data-reveal="fade" x={x - 8.25} y={y + 75.7} w={86.3} fs={12} lh={18} weight={500} color={LIGHT} center>
        {name}
      </T>
      <T data-reveal="fade" x={x - 8.25} y={y + 99.7} w={86.3} fs={10.5} lh={15.75} color={LILAC} center>
        {color}
      </T>
    </>
  )
}

function DiagramBox({ b }: { b: Box }) {
  const outline = b.kind === 'outline'
  // Contorno centralizado na borda (como no Figma): a caixa cresce 2 px para cada lado
  const pad = outline ? 2 : 0
  return (
    <Abs
      x={b.x - pad}
      y={b.y - pad}
      w={b.w + pad * 2}
      h={b.h + pad * 2}
      className={cx(s.box, s[b.kind])}
      style={{ '--fs': b.fs ?? 24, borderRadius: u((b.r ?? 6) + pad) } as CSSProperties}
      data-reveal="scale"
    >
      {/* Uma linha só; quando o rótulo do Figma tem quebra, mostra a 1ª linha com reticências */}
      <span title={b.label.replace('\n', ' ')}>{b.label.includes('\n') ? `${b.label.split('\n')[0]}...` : b.label}</span>
    </Abs>
  )
}

/** Linhas de um diagrama, desenhadas num SVG em coordenadas da página */
function Lines({ lines, x, y, w, h, color }: { lines: Line[]; x: number; y: number; w: number; h: number; color: string }) {
  return (
    <Abs as="svg" x={x} y={y} w={w} h={h} viewBox={`${x} ${y} ${w} ${h}`} className={s.lines} aria-hidden="true" data-reveal="fade">
      {lines.map((l, i) => (
        <g key={i} stroke={l.color ?? color}>
          <path d={linePath(l)} />
          {l.arrow && <path d={arrowPath(l)} className={s.arrow} />}
        </g>
      ))}
    </Abs>
  )
}

/* ——————————————————————————————————————————————————————————————————————— */

export default function Vizu() {
  const main = useRef<HTMLElement>(null)
  useScrollReveal(main)
  return (
    <main ref={main} id="conteudo" tabIndex={-1} className={s.page}>
      <h1 className="visually-hidden">Vizu</h1>
      <ScrollProgress color={PURPLE} />
      <Stage h={20655} as="div">
        {/* Capa: texturas metálicas, vidro, fundo escuro do corpo e brilhos */}
        <div aria-hidden="true">
          <AbsImg x={914} y={397} w={527} h={687} src={texturaDireita} alt="" eager className={s.fadeRight} />
          <AbsImg x={914} y={884.4} w={527} h={687} src={texturaDireita} alt="" eager className={cx(s.flipY, s.fadeRight)} />
          <Abs x={0} y={818} w={1440} h={1383} className={s.glass} style={bleed(0, 1440, 'both')} />
          <AbsImg x={-6} y={1896} w={1452} h={17843.88} src={fundoEscuro} alt="" eager style={bleed(-6, 1452, 'both')} />
          <DarkGlow x={1440} y={15700} />
          <DarkGlow x={0} y={7198} />
          <DarkGlow x={1440} y={9643} />
          <DarkGlow x={1} y={11240} />
          <LightEllipse x={-752.75} y={1238.46} color="#d4f7ff" />
          <LightEllipse x={453} y={155.72} color="#eae5ff" />
          <AbsImg x={0} y={0} w={570} h={536} src={texturaCapa} alt="" eager className={s.fadeLeft} />
        </div>

        <section aria-labelledby="vizu-intro">
          {/* Celular e tela juntos: entram e se movem como uma peça só */}
          <Abs x={0} y={0} data-reveal="up" data-parallax="top" style={{ '--parallax': u(70) } as CSSProperties}>
            <AbsImg
              x={453}
              y={168}
              w={570}
              h={593}
              src={iphoneCapa}
              alt="iPhone com a tela inicial do Vizu: saudação, coleções e histórico de classificações"
              eager
            />
            <AbsImg x={475} y={174} w={540} h={559} src={telaCapa} alt="" eager />
          </Abs>

          <T x={78} y={892.5} w={106} fs={16.73} lh={30.11} color={PURPLE} data-reveal="fade">
            Participação:
          </T>
          <T x={78} y={923.5} fs={16.73} lh={30.11} weight={700} color={PURPLE} className={s.nowrap} data-reveal="fade">
            UX/UI Design
          </T>
          <T x={1223.6} y={908} fs={16.73} lh={30.11} weight={500} color={PURPLE} className={s.nowrap} data-reveal="fade">
            Ferramenta:
          </T>
          <AbsImg x={1328} y={906.5} w={34} h={34} src={logoFigma} alt="Figma" eager data-reveal="scale" />

          <T x={373} y={1048} w={695} fs={30} lh={45} color="#222222" data-reveal="up">
            O Vizu é um app de classificação de imagens por IA pensado como base modular: o laboratório pediu{' '}
            <strong>um app sem tema</strong>, ponto de partida para futuros projetos de visão computacional. A partir de
            conversas com quem usou apps anteriores do laboratório, o projeto chegou a <strong>um fluxo só</strong>, com o
            Atlas na hora do resultado e a certeza da IA visível.
          </T>

          {/* Mão com o iPhone, recortada pelo círculo, e as faixas de luz na borda do corpo escuro */}
          <AbsImg
            x={257}
            y={1420}
            w={928}
            h={759}
            src={maoIntro}
            alt="Mão segurando um iPhone com a câmera do Vizu apontada para uma flor amarela"
            className={s.introHand}
          data-reveal="up" />
          <AbsImg x={0} y={1004.66} w={1440} h={1295} src={faixasTopo} alt="" style={bleed(0, 1440, 'both')} />

          <T as="h2" id="vizu-intro" x={79.5} y={1045} fs={20.07} lh={36.13} weight={700} color={PURPLE} className={s.nowrap} data-reveal="up">
            O que é o Vizu?
          </T>
        </section>

        <AbsImg x={0} y={2530.25} w={1440} h={783.48} src={faixaProcesso} alt="" style={bleed(0, 1440, 'both')} />

        <section aria-labelledby="vizu-processo">
          <Title id="vizu-processo" x={286} y={2410.5} w={869}>
            Processo de design
          </Title>
          {PROCESS.map((p) => (
            <Abs key={p.title} x={p.x} y={p.y} w={p.w} className={cx(s.glassCard, s.processCard)} data-reveal="up">
              <h3 className={s.processTitle}>{p.title}</h3>
              <ul className={s.processList}>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Abs>
          ))}
          <MosaicCarousel
            y={3142}
            src={mosaicoTelas}
            label="Mosaico com as telas finais do Vizu: coleções, histórico, referências, perfil, câmera, onboarding e segmentação"
          />
        </section>

        <section aria-label="O desafio e os fluxos">
          <T as="h3" x={78} y={4757.3} w={475.5} fs={27} lh={45} weight={400} color={LIGHT} data-reveal="up">
            O desafio
          </T>
          <T as="h3" x={729} y={4757.3} w={308.3} fs={27} lh={45} weight={400} color={LIGHT} data-reveal="up">
            Fluxo com perfil
          </T>
          <T as="h3" x={1054.5} y={4757.3} w={307.5} fs={27} lh={45} weight={400} color={LIGHT} data-reveal="up">
            Fluxo anônimo
          </T>
          <Abs x={78} y={4824.75} w={1284} h={1.5} className={s.rule} data-reveal="wipe" />
          <Body x={78} y={4850.3} w={475.5}>
            O Vortex cria apps de visão computacional para projetos diferentes, como um app usado em hospital. O pedido era
            um app padrão, sem tema, que servisse de base para os próximos. O objetivo não era apenas criar um app, mas
            definir um padrão de design modular.
          </Body>
          <Body x={729} y={4850.3} w={297}>
            Focado em retenção, histórico de evolução e gamificação.
          </Body>
          <Body x={1054.5} y={4850.3} w={307.5}>
            Focado em utilidade rápida, privacidade e uso imediato sem barreiras de entrada.
          </Body>
        </section>

        <section aria-labelledby="vizu-personas">
          <AbsImg x={930} y={4918} w={510} h={889} src={texturaPersonas} alt="" className={s.fadeRight} />
          <Title id="vizu-personas" x={72.8} y={5362.5} w={692} fade="start">
            Proto-personas
          </Title>
          {PERSONAS.map((p) => (
            <div key={p.name}>
              <AbsImg x={0} y={p.imgY} w={455} h={459} src={p.img} alt={p.alt} className={s.fadeLeftEdge} data-reveal="left" />
              <T as="h3" x={410.3} y={p.y} w={342.8} fs={48} lh={72} weight={700} color={LIGHT} className={s.personaName} data-reveal="up">
                {p.name}
              </T>
              <Abs x={410.3} y={p.y + 87} w={946.5} h={1.5} className={s.rule} data-reveal="wipe" />
              <T as="h4" x={410.3} y={p.y + 110.2} fs={30} lh={45} weight={700} color="#66d575" className={s.personaLabel} data-reveal="up">
                Metas
              </T>
              <T x={410.3} y={p.y + 167.2} w={p.goalW} fs={27} lh={40.5} color={LILAC} data-reveal="up">
                {p.goal}
              </T>
              <T as="h4" x={p.painX} y={p.y + 110.2} fs={30} lh={45} weight={700} color="#e73e3e" className={s.personaLabel} data-reveal="up">
                Frustrações
              </T>
              <T x={p.painX} y={p.y + 166.5} w={p.painW} fs={27} lh={40.5} color={LILAC} data-reveal="up">
                {p.pain}
              </T>
            </div>
          ))}
        </section>

        <section aria-labelledby="vizu-requisitos">
          <Title id="vizu-requisitos" x={157} y={6572.3} w={1116}>
            Da necessidade à função
          </Title>
          {REQUIREMENTS.map((r) => (
            <div key={r.y} className={s.reqRow}>
              <Abs x={r.ux} y={r.y} w={343.5} h={202.3} className={cx(s.glassCard, s.reqCard)} data-reveal="up">
                <div className={s.reqHead}>
                  <img src={ilustracaoUsuario} alt="" width={56} height={61} className={s.reqIllus} style={{ width: u(55.7) }} />
                  <h3>Requisito do Usuário</h3>
                </div>
                <p>{r.user}</p>
              </Abs>
              <Abs x={r.fx} y={r.y} w={341} h={202.3} className={cx(s.glassCard, s.reqCard)} data-reveal="up">
                <div className={s.reqHead}>
                  <img src={ilustracaoFuncional} alt="" width={66} height={61} className={s.reqIllus} style={{ width: u(66) }} />
                  <h3>Requisito Funcional</h3>
                </div>
                <p>{r.func}</p>
              </Abs>
            </div>
          ))}
          <Lines
            x={430}
            y={6900}
            w={600}
            h={850}
            color={LILAC}
            lines={[6927, 7194, 7461, 7728].map((y, i) => {
              const x = i % 2 ? 931 : 448.5
              return { points: [[x, y], [x + 60, y]], arrow: true }
            })}
          />
        </section>

        <section aria-labelledby="vizu-sitemap">
          <Body x={78} y={8009} w={519}>
            O briefing pedia dois fluxos distintos. Em três versões do sitemap (sem perfil, com perfil e unificado), eles
            passaram a dividir o mesmo ciclo. O perfil ficou em login, histórico e coleções.
          </Body>
          <Title id="vizu-sitemap" x={999} y={8001.8} w={364} fade="end">
            Sitemap
          </Title>
          <Lines lines={sitemapLines} x={90} y={8450} w={1160} h={1250} color="#2d1b7b" />
          <div role="list" aria-label="Sitemap do aplicativo">
            {sitemapBoxes.map((b, i) => (
              <div role="listitem" key={i}>
                <DiagramBox b={b} />
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="vizu-fluxo">
          <Title id="vizu-fluxo" x={457} y={9896.3} w={526}>
            Um fluxo só
          </Title>
          <Body x={852} y={10101.5} w={510} right>
            Todo registro passa pelo mesmo ciclo: câmera, segmentação, carregamento e resultado. No fim, quem quer rapidez
            conclui; quem quer acompanhar adiciona à coleção.
          </Body>
          <Lines lines={flowLines} x={100} y={10200} w={1240} h={1530} color="#2d1b7b" />
          <Abs as="svg" x={230} y={10340} w={650} h={850} viewBox="230 10340 650 850" className={s.diamonds} aria-hidden="true" data-reveal="fade">
            {flowDiamonds.map((d) => (
              <polygon
                key={d.label}
                points={`${d.x + d.w / 2},${d.y + 4} ${d.x + d.w - 4},${d.y + d.h / 2} ${d.x + d.w / 2},${d.y + d.h - 4} ${d.x + 4},${d.y + d.h / 2}`}
              />
            ))}
          </Abs>
          <div role="list" aria-label="Etapas do fluxo do usuário">
            {flowCircles.map((c, i) => (
              <Abs role="listitem" key={i} x={c.x} y={c.y} w={c.size} h={c.size} className={cx(s.box, s.circle)} data-reveal="scale">
                <span>{c.label}</span>
              </Abs>
            ))}
            {flowDiamonds.map((d) => (
              <Abs
                role="listitem"
                key={d.label}
                x={d.x + d.w * 0.26}
                y={d.y}
                w={d.w * 0.48}
                h={d.h}
                className={cx(s.box, s.diamondText)}
                style={{ '--fs': d.fs, '--lines': d.lines } as CSSProperties}
              data-reveal="scale" >
                <span title={d.label}>{d.label}</span>
              </Abs>
            ))}
            {flowBoxes.map((b, i) => (
              <div role="listitem" key={i}>
                <DiagramBox b={b} />
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="vizu-wireframes">
          <Body x={816} y={12006.7} w={546} right>
            Comecei com wireframes de média fidelidade para definir navegação e hierarquia antes de aplicar cor.
          </Body>
          <Title id="vizu-wireframes" x={78} y={11994.7} w={517} fade="start">
            Wireframes
          </Title>
        </section>

        <section aria-labelledby="vizu-uikit">
          <Title id="vizu-uikit" x={597.8} y={13740.7} w={246}>
            UI Kit
          </Title>

          <T as="h3" x={77.3} y={13938} w={270.8} fs={27} lh={45} weight={400} color="#ffffff" data-reveal="up">
            Escala Tipográfica
          </T>
          {TYPE_SCALE.map((t) => (
            <div key={t.label}>
              <T x={t.x} y={t.y} fs={t.fs} lh={t.lh} weight={t.weight} color={LIGHT} className={s.nowrap} data-reveal="up">
                {t.label}
              </T>
              {t.sub.map((sub, i) => (
                <T
                  key={sub}
                  x={t.x}
                  y={t.subY + i * (t.subStep ?? 25)}
                  fs={t.subFs ?? 10.5}
                  lh={t.subLh ?? 30}
                  color={LILAC}
                  className={s.nowrap}
                data-reveal="fade" >
                  {sub}
                </T>
              ))}
            </div>
          ))}

          <T as="h3" x={403.5} y={13938} w={633} fs={27} lh={45} weight={400} color="#ffffff" data-reveal="up">
            Cores Principais
          </T>
          {PALETTES.map((p) => (
            <div key={p.title}>
              <T as="h4" x={403.5} y={p.y} fs={24} lh={36} weight={900} color={LIGHT} data-reveal="up">
                {p.title}
              </T>
              {p.colors.map((c, i) => (
                <Swatch key={c} x={403.5 + i * 87.75} y={p.y + 78 - (p.title === 'Terciária' ? 12 : 0)} color={c} name={SHADES[i]} />
              ))}
            </div>
          ))}

          <T as="h3" x={1054.5} y={13938} w={261} fs={27} lh={45} weight={400} color="#ffffff" data-reveal="up">
            Cores de Feedback
          </T>
          {FEEDBACK.map((p) => (
            <div key={p.title}>
              <T as="h4" x={1054.5} y={p.y} fs={24} lh={p.title === 'Erro' ? 30 : 36} weight={900} color={LIGHT} data-reveal="up">
                {p.title}
              </T>
              {p.colors.map((c, i) => (
                <Swatch
                  key={c}
                  x={1054.5 + i * 87.75}
                  y={p.y + 78 - (p.title === 'Erro' ? 11.3 : 0)}
                  color={c}
                  name={FEEDBACK_SHADES[i]}
                />
              ))}
            </div>
          ))}

          {/* No Figma o mosaico de wireframes fica por cima do início do UI Kit */}
          <MosaicCarousel y={12096} src={mosaicoWireframes} label="Mosaico com os wireframes de média fidelidade em tons de cinza" />
        </section>

        <section aria-labelledby="vizu-aplicacao">
          <Title id="vizu-aplicacao" x={358} y={14896.5} w={725}>
            O ciclo nas telas
          </Title>
          <Body x={81.8} y={15300} w={307.5}>
            Coleções que cada projeto renomeia. Aqui, Botânica e Torras de café, na mesma tela.
          </Body>
          <Body x={81.8} y={15617} w={307.5}>
            Histórico das últimas classificações, que fazia falta nos apps anteriores.
          </Body>
          <Body x={82} y={15900} w={295}>
            O Atlas de referências sai do menu e aparece na Home e em cada coleção.
          </Body>
          <Body x={571.5} y={16428.8} w={307.5}>
            A interface foi reduzida ao mínimo essencial para maximizar a área de visualização.
          </Body>
          <Body x={567} y={16672} w={307.5} right>
            Para quem teme o erro da IA, o resultado mostra a certeza, o aviso de que é IA e o botão Discordar.
          </Body>
          <Body x={407.2} y={17017.5} w={633} right>
            Aqui o design <strong>conecta os dois fluxos</strong>. O botão primário &lsquo;Concluir&rsquo; encerra o ciclo
            rápido, enquanto o secundário convida o usuário a engajar e salvar o item.
          </Body>
          <Body x={895.5} y={17506.8} w={460.5}>
            Além do produto, desenvolvi a landing page para comunicar a proposta de valor do Vizu. Os três blocos repetem as
            decisões do app: classificação ágil, Atlas integrado e coleções adaptáveis. O objetivo era converter visitantes em
            usuários cadastrados.
          </Body>

          <PhoneMock p={PHONES.colecoes} data-parallax="view" style={{ '--parallax': u(30) } as CSSProperties} />
          <PhoneMock p={PHONES.camera} />
          <PhoneMock p={PHONES.resultado} />

          <Abs as="svg" x={380} y={15300} w={860} h={2320} viewBox="380 15300 860 2320" className={s.callouts} aria-hidden="true" data-reveal="fade">
            {CALLOUTS.map((c) => (
              <g key={c.d}>
                <path d={c.d} />
                <circle cx={c.dot[0]} cy={c.dot[1]} r={6} />
              </g>
            ))}
          </Abs>

          <PhoneMock p={PHONES.landing} />
          <AbsImg
            x={895}
            y={18128}
            w={545.33}
            h={676.67}
            src={maoLanding}
            alt="Mão segurando um iPhone com a coleção Botânica aberta no Vizu"
          className={s.fadeRight}
          data-reveal="fade" />
          <Abs x={951} y={18564} w={489} h={243} className={s.handFade} />
        </section>

        <section aria-labelledby="vizu-fim">
          <T x={-87} y={20156.3} w={1615} fs={299.82} lh={449.73} weight={700} right className={s.bigThanks} aria-hidden="true" data-reveal="fade" data-parallax="drift" style={{ '--parallax': u(-160) } as CSSProperties}>
            OBRIGADO
          </T>
          <LightEllipse x={-816.75} y={20292.96} color="#d4f7ff" />
          <Abs x={0} y={20066} w={1440} h={600} className={s.glass} style={bleed(0, 1440, 'both')} />

          <T x={78} y={20130.5} w={190.1} fs={16.73} lh={30.11} color={PURPLE} data-reveal="fade">
            Participação:
          </T>
          <T x={78} y={20161.5} fs={16.73} lh={30.11} weight={700} color={PURPLE} className={s.nowrap} data-reveal="fade">
            UX/UI Design
          </T>
          <T x={204.1} y={20161.5} fs={16.73} lh={30.11} weight={700} color={PURPLE} className={s.nowrap} data-reveal="fade">
            Sitemap
          </T>
          <T x={1172.4} y={20129.1} w={189.6} fs={16.73} lh={30.11} color={PURPLE} right data-reveal="fade">
            Entre em contato:
          </T>
          <Abs x={1079.8} y={20160.1} w={282.3} h={33.8} className={s.mailWrap} data-reveal="fade">
            <a href="mailto:jorgeluizpmonteiro@gmail.com" className={s.mail}>
              <span>jorgeluizpmonteiro@gmail.com</span>
              <img src={logoGmail} alt="" width={34} height={34} />
            </a>
          </Abs>

          <T as="p" x={597} y={19678.5} w={247} fs={30} lh={45} color="#222222" className={s.nowrap} data-reveal="up">
            Obrigado por rolar
          </T>
          <T as="h2" id="vizu-fim" x={505.5} y={19755} w={430} fs={72} lh={45} weight={700} color="#222222" className={s.nowrap} data-reveal="up">
            <span data-count="27540">27540</span> pixels
          </T>
          <T x={387} y={19831.5} w={666.8} fs={30} lh={45} color="#222222" center data-reveal="up">
            de um projeto que gostei muito de desenvolver! Estou ansioso para trabalhar com você!
          </T>

          <AbsImg x={0} y={19330.5} w={1440} h={1325} src={faixasRodape} alt="" style={bleed(0, 1440, 'both')} />
        </section>
      </Stage>
    </main>
  )
}
