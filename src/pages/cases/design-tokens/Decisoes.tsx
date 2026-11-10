import type { ReactNode } from 'react'
import { Abs, AbsImg, T } from '../Stage'
import { bleed } from '../units'
import { Decision, Num, Title, Tk } from './shared'
import { PEACH, cx } from './constants'
import s from './DesignTokens.module.css'

import mockupPapel from '../../../assets/cases/design-tokens/mockup-papel.webp'
import icTravado from '../../../assets/cases/design-tokens/icones/travado.svg'
import icAjustavel from '../../../assets/cases/design-tokens/icones/ajustavel.svg'
import icLivre from '../../../assets/cases/design-tokens/icones/livre.svg'

/* Cada decisão protege a continuidade: arquitetura, permissões, governança e documentação (y 10300 a 14250) */

const L = ({ children }: { children: ReactNode }) => <Tk light>{children}</Tk>

const PERMISSIONS = [
  {
    x: 104,
    w: 389,
    icon: icTravado,
    title: 'Travado',
    text: (
      <>
        O projeto não muda.
        <br />
        É igual em todos os projetos do laboratório.
        <br />
        Todos os nomes; as escalas da Base (<L>space</L>, <L>radius</L>, <L>font-size</L> e as outras medidas); os
        valores das paletas de feedback
      </>
    ),
  },
  {
    x: 525,
    w: 390,
    icon: icAjustavel,
    title: 'Ajustável',
    text: (
      <>
        O projeto pode trocar o valor, dentro de um limite
        <br />
        As referências da Semântica, inclusive as de feedback (dentro da própria paleta); a paleta <L>neutral</L>; as
        paletas <L>data-1</L> a <L>data-6</L>
      </>
    ),
  },
  {
    x: 947,
    w: 389,
    icon: icLivre,
    title: 'Livre',
    text: (
      <>
        O projeto define o valor
        <br />
        As paletas <L>brand-1</L> a <L>brand-4</L>; as fontes <L>primary</L> e <L>secondary</L>; os Específicos
      </>
    ),
  },
]

const QUESTIONS = [
  { n: 1, x: 104, y: 12437, h: 324, q: 'Algum token que já existe serve?', yes: 'Use esse token, mesmo que o valor não seja exatamente o que você imaginou.', no: 'Vá para a pergunta 2.' },
  { n: 2, x: 736, y: 12437, h: 324, q: 'A necessidade é só deste projeto?', yes: 'Crie um Específico e envie para a Designer Lead aprovar.', no: 'Vá para a pergunta 3.' },
  { n: 3, x: 104, y: 12793, h: 299, q: 'A mesma necessidade já apareceu em 3 ou mais projetos?', yes: 'Solicite a Designer Lead: ela leva o token para a Semântica.', no: 'Por enquanto, é um Específico: volte para a pergunta 2.' },
  { n: 4, x: 736, y: 12793, h: 299, q: 'A necessidade exige um valor que a Base não tem?', yes: 'Só a lead de design muda a Base.', no: 'Siga com o Específico ou com o pedido à lead.' },
]

/** Seta com ponta em linhas (como as do Figma) */
const head = (x: number, y: number) => `M${x - 6} ${y - 6} L${x} ${y} L${x - 6} ${y + 6}`

/** Ligações entre as camadas: Semântica → Estilos/Específicos → Telas (coordenadas a partir de 388, 11040) */
function Connectors() {
  const ox = 388
  const oy = 11040
  const p = (d: string) => d.replace(/(-?\d+(\.\d+)?) (-?\d+(\.\d+)?)/g, (_m, a, _b, c) => `${+a - ox} ${+c - oy}`)
  return (
    <Abs as="svg" x={ox} y={oy} w={670} h={240} viewBox="0 0 670 240" className={s.connectors} aria-hidden="true">
      <path d={p('M392 11159.5 L415 11159.5')} />
      <path d={p(head(415, 11159.5))} />
      <path d={p('M708 11159.5 L1047 11159.5')} />
      <path d={p(head(1047, 11159.5))} />
      <path d={p('M708 11159.5 L715.5 11159.5 Q720.5 11159.5 720.5 11154.5 L720.5 11053 Q720.5 11048 725.5 11048 L732 11048')} />
      <path d={p(head(732, 11048))} />
      <path d={p('M715.5 11159.5 Q720.5 11159.5 720.5 11164.5 L720.5 11265 Q720.5 11270 725.5 11270 L732 11270')} />
      <path d={p(head(732, 11270))} />
      <path d={p('M1021 11048 L1030.5 11048 Q1035.5 11048 1035.5 11053 L1035.5 11265 Q1035.5 11270 1030.5 11270 L1021 11270')} />
    </Abs>
  )
}

export default function Decisoes() {
  return (
    <section aria-labelledby="dt-decisoes">
      <Title id="dt-decisoes" x={262} y={10361} w={916} color={PEACH} center>
        Cada decisão protege
        <br />a continuidade
      </Title>

      {/* Decisão 1: arquitetura em camadas */}
      <Decision n={1} x={152} y={10696} w={495} barX={104}>
        A tela usa o papel (token semântico). O valor fica na Base
      </Decision>
      <Abs as="article" x={104} y={10911} w={284} h={498} className={s.layer}>
        <h3>Base</h3>
        <p>
          Os valores desses tokens que devem alimentar a camada semântica, sem modo:
          <br />
          <br />
          <L>space/16</L> · <L>radius/8</L>
          <br />
          <L>brand-1/500</L> · <L>neutral/900</L> · <br />
          <L>font-family/primary</L>
          <br />
          <br />
          Não pode ser aplicado diretamente nas telas/<wbr />componentes.
        </p>
        <p>
          O projeto muda os valores
          <br />
          de <L>brand-n</L>, <L>neutral</L> e fontes
        </p>
      </Abs>
      <Abs as="article" x={420} y={10911} w={284} h={498} className={s.layer}>
        <h3>Semântica</h3>
        <p>
          Essa camada consome os tokens da camada Base e diz para que serve cada valor em dois modos: Light e Dark.
          <br />
          <br />
          <L>text/primary · space/medium · </L>
          <br />
          <L>background/action/primary</L>
          <br />
          <br />
          Não pode ser aplicado diretamente nas telas/<wbr />componentes.
        </p>
        <p>O projeto troca a referência</p>
      </Abs>
      <Abs as="article" x={736} y={10911} w={284} h={241} className={s.layer}>
        <h3>Estilos</h3>
        <p>
          Juntam vários tokens da camada Semântica num só token composto:
          <br />
          <br />
          <L>body/medium · shadow/raised</L>
        </p>
      </Abs>
      <Abs as="article" x={736} y={11168} w={284} h={241} className={s.layer}>
        <h3>Específicos</h3>
        <p>Só o que um projeto necessita e nenhum token já existente supre. O designer responsável pelo projeto cria e a lead aprova</p>
      </Abs>
      <Abs as="article" x={1052} y={10911} w={285} h={498} className={cx(s.layer, s.layerSplit)}>
        <div>
          <h3>Tela / Componentes</h3>
          <p>Usa só Semântica, Estilos e Específicos, nunca a Base.</p>
        </div>
        <p>Não há tokens de componentes.</p>
      </Abs>
      <Connectors />

      {/* Decisão 2: permissões */}
      <Decision n={2} x={988} y={11514} w={300} barX={1320} right>
        Todo token diz quanto pode mudar
      </Decision>
      {PERMISSIONS.map((p) => (
        <Abs as="article" key={p.title} x={p.x} y={11716} w={p.w} h={419} className={s.permission}>
          <img src={p.icon} alt="" width={96} height={96} loading="lazy" />
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </Abs>
      ))}

      {/* Decisão 3: governança */}
      <Decision n={3} x={152} y={12240} w={495} textW={444} barX={104}>
        Começar no projeto, promover com evidência
      </Decision>
      <ol className={s.plainList} aria-label="Perguntas antes de criar um token">
        {QUESTIONS.map((q) => (
          <Abs as="li" key={q.n} x={q.x} y={q.y} w={600} h={q.h} className={s.question}>
            <div className={s.cardHead}>
              <Num n={q.n} inverse />
              <h3>{q.q}</h3>
            </div>
            <hr />
            <div>
              <h4 className={s.yes}>Se sim</h4>
              <p>{q.yes}</p>
            </div>
            <div>
              <h4 className={s.no}>Se não</h4>
              <p>{q.no}</p>
            </div>
          </Abs>
        ))}
      </ol>

      {/* Decisão 4: documentação */}
      <AbsImg
        x={-19}
        y={13295}
        w={1464}
        h={971}
        src={mockupPapel}
        alt="Folha da documentação impressa: Seção 01 — Comece aqui"
        className={s.fadeX}
        style={{ ...bleed(-19, 1464, 'both'), objectFit: 'cover' }}
      />
      <Decision n={4} x={916} y={13230} w={372} barX={1320} right>
        Escrito para o estagiário no primeiro dia
      </Decision>
      <T x={104} y={13463} w={495} fs={24} lh={36} color="#ffffff">
        Criei uma documentação em dez seções organizadas por pergunta, casos de Certo/<wbr />Errado, lista do que evitar e um
        questionário de 13 perguntas para o estagiário configurar o projeto por meio de um plugin no Figma criado por mim.
      </T>
    </section>
  )
}
