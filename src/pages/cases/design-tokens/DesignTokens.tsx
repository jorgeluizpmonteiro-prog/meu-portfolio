import type { CSSProperties, ReactNode } from 'react'
import '@fontsource/roboto/300.css'
import '@fontsource/albert-sans/400.css'
import '@fontsource/albert-sans/500.css'
import '@fontsource/albert-sans/600.css'
import '@fontsource/albert-sans/700.css'
import { Abs, AbsImg, Stage, T } from '../Stage'
import { bleed, u } from '../units'
import s from './DesignTokens.module.css'

import cartaoHex from '../../../assets/cases/design-tokens/cartao-hex.webp'
import cartaoBase from '../../../assets/cases/design-tokens/cartao-base.webp'
import cartaoSemantico from '../../../assets/cases/design-tokens/cartao-semantico.webp'
import fotoContexto from '../../../assets/cases/design-tokens/foto-contexto.webp'
import seta1 from '../../../assets/cases/design-tokens/seta-1.svg'
import seta2 from '../../../assets/cases/design-tokens/seta-2.svg'
import logoFigma from '../../../assets/cases/comum/logo-figma.svg'
import logoN8n from '../../../assets/cases/comum/logo-n8n.svg'

/*
 * Case Documentação de Design Tokens — Figma: “Projeto — Documentação de design tokens” (node 180:29914).
 * Composição única de 1440 de largura, com os elementos na ordem das camadas do Figma.
 * Cores e fontes (Roboto Light e Albert Sans) da própria apresentação.
 * Em construção por partes: esta é a parte 1 (capa, introdução, Contexto e Como eu iniciei).
 */

const BROWN = '#533e26'
const ORANGE = '#f88717'

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ')

/**
 * Círculo com anéis concêntricos (efeito de shader do Figma): r = raio, ring = cor dos anéis,
 * fill = cor do círculo, fade = onde os anéis somem (fração do raio).
 */
function Rings({ x, y, size, fill, ring, fade = 0.88 }: { x: number; y: number; size: number; fill: string; ring: string; fade?: number }) {
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

/** Cartão de token da capa: imagem em perspectiva isométrica (matriz do Figma) com sombra */
function TokenCard({ src, w, h, m, alt }: { src: string; w: number; h: number; m: [number, number, number, number, number, number]; alt: string }) {
  const [a, b, c, d, tx, ty] = m
  return (
    <Abs x={0} y={0} className={s.cardWrap}>
      <img
        src={src}
        alt={alt}
        width={Math.round(w)}
        height={Math.round(h)}
        decoding="async"
        className={s.card}
        style={{ width: u(w), height: u(h), transform: `translate(${u(tx)}, ${u(ty)}) matrix(${a}, ${b}, ${c}, ${d}, 0, 0)` }}
      />
    </Abs>
  )
}

/** Texto corrido marrom (Albert Sans 32/130%) */
const Body = ({ x, y, w, color = BROWN, center, right, children }: { x: number; y: number; w: number; color?: string; center?: boolean; right?: boolean; children: ReactNode }) => (
  <T x={x} y={y} w={w} fs={32} lh={41.6} color={color} center={center} right={right}>
    {children}
  </T>
)

/** Título de seção (Roboto Light 96/130%) */
const Title = ({ x, y, w, id, children }: { x: number; y: number; w: number; id: string; children: ReactNode }) => (
  <T as="h2" id={id} x={x} y={y} w={w} fs={96} lh={124.8} weight={300} color={BROWN} className={s.title}>
    {children}
  </T>
)

/** Barra laranja ao lado dos textos do Contexto */
const Bar = ({ x, y, h }: { x: number; y: number; h: number }) => <Abs x={x} y={y} w={16} h={h} className={s.bar} />

const SUMMARY = [
  { n: '5', label: 'funcionam', bg: '#d0ffe1', color: '#1e6b43' },
  { n: '11', label: 'com ressalva', bg: '#ffe5ca', color: '#8a4a00' },
  { n: '4', label: 'não funcionam', bg: '#ffd8d0', color: '#a3321f' },
]

/** Trecho de código/token dentro das descrições */
const Tk = ({ children }: { children: ReactNode }) => <span className={s.tk}>{children}</span>

type Finding = {
  x: number
  y: number
  h: number
  icon: ReactNode
  title: string
  subtitle: string
  verdict: string
  decision: ReactNode
}

const FINDINGS: Finding[] = [
  {
    x: 194,
    y: 5015,
    h: 363,
    icon: <span className={cx(s.findIcon, s.iconDimension)} />,
    title: 'Dimension/0 a 7 (0 a 40)',
    subtitle: 'Escala de medidas',
    verdict:
      'Funciona, com ressalva de nomenclatura. O nome segue escalas ordenadas, mas não da forma ideal. Vale encontrar outra forma de nomear o grupo.',
    decision: (
      <>
        Valor no nome na Base (<Tk>space/16</Tk>, <Tk>radius/8</Tk>), e <Tk>space</Tk> e <Tk>radius</Tk> em grupos
        separados. O nome diz o que não muda (princípio 2).
      </>
    ),
  },
  {
    x: 764,
    y: 5015,
    h: 363,
    icon: <span className={s.findIcon} style={{ backgroundColor: '#3bd9d9' }} />,
    title: 'Accent-cyan',
    subtitle: 'Destaques por cor',
    verdict: 'Não funciona. Em projetos que usarão outras cores, o nome do token mente.',
    decision: (
      <>
        Destaque sem significado: <Tk>accent-1</Tk> a <Tk>accent-4</Tk>, cada um apontando para o token <Tk>brand</Tk> de
        mesmo número. Sem cor no nome do token.
      </>
    ),
  },
  {
    x: 194,
    y: 5440,
    h: 390,
    icon: <span className={s.findIcon} style={{ backgroundColor: '#00a1a1' }} />,
    title: 'Color/Text/Metric',
    subtitle: 'Cor de métrica',
    verdict: 'Não funciona. É um token extremamente pontual.',
    decision: (
      <>
        A coleção Específicos: o que só um projeto precisa nasce nele e sobe para a Semântica quando aparece em 3 ou mais
        projetos.
      </>
    ),
  },
  {
    x: 764,
    y: 5440,
    h: 390,
    icon: <span className={cx(s.findIcon, s.iconOpacity)} />,
    title: 'Opacity/Hover',
    subtitle: 'Opacidades de estado',
    verdict:
      'Não funciona. Criei porque o lead colocou uma opacidade menor em um card para indicar hover (apenas documentei). Não acredito que seja uma boa prática.',
    decision: (
      <>
        Estados viram tokens de cor (hover, pressed); a opacidade fica só no estado desabilitado em todo o componente
        (prática adotada pelo Material Design 3).
      </>
    ),
  },
]

/** Elipses concêntricas da transição para “Como eu iniciei” (posições dentro do grupo de 1811 × 1783) */
const ARCS = [
  { x: 0, y: 0, w: 1811, h: 1783, c: '#f88717' },
  { x: 46, y: 42, w: 1719, h: 1691, c: '#ffbc79' },
  { x: 94, y: 87, w: 1623, h: 1597, c: '#ffd0a1' },
  { x: 139, y: 131, w: 1533, h: 1508, c: '#ffebd7' },
  { x: 180, y: 179, w: 1451, h: 1427, c: '#ffffff' },
]
const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`

/* ——————————————————————————————————————————————————————————————————————— */

export default function DesignTokens() {
  return (
    <main id="conteudo" tabIndex={-1} className={s.page}>
      <h1 className="visually-hidden">Documentação de Design Tokens</h1>
      <Stage h={6000} as="div">
        {/* Fundo marrom do Contexto e elipses da transição para “Como eu iniciei” */}
        <Abs x={-4} y={2832} w={1449} h={1479} className={s.brown} style={bleed(-4, 1449, 'both')} aria-hidden="true" />
        <Abs x={-185} y={3930} w={1811} h={1783} className={s.arcs} style={bleed(-185, 1811, 'both')} aria-hidden="true">
          {ARCS.map((a) => (
            <span
              key={a.c}
              style={{ left: pct(a.x, 1811), top: pct(a.y, 1783), width: pct(a.w, 1811), height: pct(a.h, 1783), backgroundColor: a.c }}
            />
          ))}
        </Abs>

        <Rings x={549} y={-48} size={1782} fill="#ffffff" ring={ORANGE} />
        <Rings x={-170} y={4520} size={1782} fill="#ffffff" ring="#ffd0a1" />
        <Rings x={-30} y={2082} size={1500} fill={BROWN} ring="rgb(248 135 23 / 0.52)" fade={0.85} />

        {/* Capa: cartões de token ligados por setas pontilhadas */}
        <section aria-labelledby="dt-titulo">
          <AbsImg x={694} y={423.2} w={141} h={170} src={seta1} alt="" eager />
          <TokenCard
            src={cartaoHex}
            w={447.69}
            h={155.62}
            m={[0.8467, 0.5321, -0.7331, 0.6802, 820.96, 534.04]}
            alt="Cartão do valor hexadecimal #F88717"
          />
          <Abs x={0} y={786} w={1440} h={2045} className={s.glass} style={bleed(0, 1440, 'both')} aria-hidden="true" />
          <AbsImg x={778.4} y={242.5} w={161} h={190} src={seta2} alt="" eager />
          <TokenCard
            src={cartaoBase}
            w={542.16}
            h={188.46}
            m={[0.8467, 0.5321, -0.7331, 0.6802, 910.46, 379.44]}
            alt="Cartão do token base brand-1/500"
          />
          <TokenCard
            src={cartaoSemantico}
            w={642.07}
            h={223.19}
            m={[0.8467, 0.5321, -0.7331, 0.6802, 1026.44, 201]}
            alt="Cartão do token semântico background/action/primary"
          />

          <T as="h2" id="dt-titulo" x={104} y={224} w={613.7} fs={75.82} lh={90.98} weight={300} color={BROWN} className={s.titleFont}>
            Documentação de Design Tokens
          </T>
          <T x={104} y={432} w={495} fs={24} lh={33.6} color={BROWN}>
            De cada projeto do seu jeito a uma linguagem que se confere sozinha e de forma automatizada
          </T>

          <T x={78} y={832} fs={16.73} lh={30.11} color={BROWN} className={s.nowrap}>
            Participação:
          </T>
          <T x={78} y={863} fs={16.73} lh={30.11} weight={700} color={BROWN} className={s.nowrap}>
            Product Designer
          </T>
          <T x={234.1} y={863} fs={16.73} lh={30.11} weight={700} color={BROWN} className={s.nowrap}>
            Governança e supervisão
          </T>
          <T x={450.1} y={863} fs={16.73} lh={30.11} weight={700} color={BROWN} className={s.nowrap}>
            Automação
          </T>
          <T x={1163.3} y={847.5} fs={16.73} lh={30.11} weight={500} color={BROWN} className={s.nowrap}>
            Ferramenta:
          </T>
          <AbsImg x={1268.7} y={843} w={40} h={40} src={logoFigma} alt="Figma" eager />
          <AbsImg x={1322.1} y={843} w={40} h={40} src={logoN8n} alt="n8n" eager />

          <Body x={209} y={1139} w={1022}>
            No Vortex, laboratório de formação e inovação vinculado à Vice Reitoria de Pesquisa da UNIFOR, cada projeto
            criava os <strong>próprios estilos de cor de forma pessoal e desestruturada</strong>. Pensando em como solucionar
            isso, criei uma arquitetura de design tokens com a mesma estrutura para todos os projetos de forma que a
            aparência fosse personalizável para cada um, documentada para o estagiário aprender e utilizar.
          </Body>
          <Body x={209} y={1471} w={1022}>
            Defini a <strong>arquitetura e as regras de aplicação dos tokens</strong>, documentei e montei um modelo de{' '}
            <strong>governança e supervisão automatizada</strong> por meio do n8n.
          </Body>
        </section>

        {/* Contexto */}
        <section aria-labelledby="dt-contexto">
          <Title id="dt-contexto" x={530} y={1721} w={381}>
            Contexto
          </Title>
          <Bar x={161} y={2946} h={168} />
          <Body x={209} y={2946} w={445} color="#ffffff">
            O laboratório atende vários projetos, e as equipes de estagiários <strong>sofrem com uma rotatividade</strong> a
            cada dois anos.
          </Body>
          <Bar x={1263} y={3146} h={210} />
          <Body x={736} y={3146} w={495} color="#ffffff" right>
            Cada projeto criava <strong>a própria estrutura</strong>, os próprios nomes e o próprio guia de estilo, conforme a
            experiência de quem estava responsável pelo projeto.
          </Body>
          <Bar x={161} y={3388} h={168} />
          <Body x={209} y={3388} w={612} color="#ffffff">
            Quem continua o projeto após o estagiário responsável sair, <strong>precisa aprender tudo de novo</strong>, e o
            que foi decidido se perde quando a pessoa sai.
          </Body>
          <Abs x={263} y={3692} w={914} h={132} className={s.highlight}>
            <p>
              O objetivo central não era deixar os produtos iguais, e sim fazer todos serem{' '}
              <strong>construídos com a mesma linguagem</strong>.
            </p>
          </Abs>
          <AbsImg
            x={0}
            y={1970}
            w={1440}
            h={861}
            src={fotoContexto}
            alt="Jovem de boné trabalhando em um computador com um sistema de design aberto na tela"
            className={s.cover}
            style={bleed(0, 1440, 'both')}
          />
        </section>

        {/* Como eu iniciei */}
        <section aria-labelledby="dt-inicio">
          <Title id="dt-inicio" x={382.6} y={4276} w={643}>
            Como eu iniciei
          </Title>
          <Body x={263} y={4451} w={914} center>
            Comecei auditando um projeto que foi a minha primeira experiência com tokens: 191 tokens em duas coleções
            (Primitiva e Semântica), sem temas nem modos.
          </Body>

          <ul className={s.summary} aria-label="Resultado da auditoria dos 20 grupos de tokens">
            {SUMMARY.map((c, i) => (
              <Abs as="li" key={c.label} x={104 + i * 310} y={4649} w={286} h={180} className={s.summaryCard} style={{ backgroundColor: c.bg }}>
                <span className={s.summaryNumber} style={{ color: c.color }}>
                  {c.n}
                </span>
                <span className={s.summaryLabel} style={{ color: c.color }}>
                  {c.label}
                </span>
                <span className={s.summaryOf}>de 20 grupos de tokens</span>
              </Abs>
            ))}
            <Abs as="li" x={1034} y={4649} w={286} h={180} className={cx(s.summaryCard, s.summaryDecision)}>
              <span className={s.decisionLabel}>Decisão</span>
              <span className={s.decisionRow}>
                <span>
                  <span className={s.decisionNumber}>9</span>
                  <span className={s.decisionText}>manter</span>
                </span>
                <span>
                  <span className={s.decisionNumber}>11</span>
                  <span className={s.decisionText}>mudar</span>
                </span>
              </span>
            </Abs>
          </ul>

          {FINDINGS.map((f) => (
            <Abs as="article" key={f.title} x={f.x} y={f.y} w={483} h={f.h} className={s.finding}>
              <div className={s.findHead}>
                {f.icon}
                <div>
                  <h4>{f.title}</h4>
                  <p className={s.findSub}>{f.subtitle}</p>
                </div>
              </div>
              <p className={s.findText}>{f.verdict}</p>
              <hr />
              <h5>Virou decisão na documentação:</h5>
              <p className={s.findDecision}>{f.decision}</p>
            </Abs>
          ))}

          <T x={377} y={5902} w={686} fs={24} lh={31.2} color={BROWN} center>
            Mas o achado que <strong>mudou a direção</strong> foi uma pergunta simples.
          </T>
        </section>
      </Stage>
    </main>
  )
}
