import type { ReactNode } from 'react'
import { Abs, AbsImg, T } from '../Stage'
import { Body, Num, Title, Tk } from './shared'
import { BROWN, cx } from './constants'
import s from './DesignTokens.module.css'

import triangulo from '../../../assets/cases/design-tokens/triangulo.svg'

/* Padronizar a estrutura · Estrutura de nomenclatura · Sete princípios (y 6000 a 9700 no Figma) */

const STEPS = [
  { x: 104, title: '1. Propriedade', q: 'o que pinta ou mede?', items: ['text', 'icon', 'background', 'border', 'space', 'radius', 'border-width', 'opacity', 'data', 'typography', 'shadow'] },
  { x: 420.7, title: '2. Papel', q: 'para que serve?', items: ['neutral · brand', 'action', 'canvas · surface', 'inverse · backdrop', 'danger · warning', 'success · information', 'accent-1 a accent-4', 'selected · focus', 'link · placeholder'] },
  { x: 737.3, title: '3. Ênfase', q: 'quanto destaque?', items: ['primary', 'secondary', 'tertiary', 'subtle · strong', 'none a xx-large'], note: ['primary = mais destaque,', 'não a marca'] },
  { x: 1054, title: '4. Estado', q: 'está interagindo?', items: ['hover', 'pressed'], note: ['vazio = repouso;', 'só em ação'] },
]
const EXAMPLE = ['background', 'action', 'primary', 'hover']

type Principle = { n: number; x: number; y: number; w?: number; title: ReactNode; desc: ReactNode; right: ReactNode; wrong: ReactNode; wide?: boolean }

const PRINCIPLES: Principle[] = [
  {
    n: 1,
    x: 104,
    y: 8158,
    title: (
      <>
        Padronize a estrutura,
        <br />
        não a aparência
      </>
    ),
    desc: 'Todos os projetos usam os mesmos nomes e regras. Cada um mantém sua cor e família tipográfica.',
    right: (
      <>
        O botão principal usa <Tk>background/action/primary</Tk>, com a cor da marca de cada projeto.
      </>
    ),
    wrong: 'Obrigar todos os projetos a usar o mesmo azul.',
  },
  {
    n: 2,
    x: 526,
    y: 8158,
    title: 'O nome diz o que não muda',
    desc: 'Se o valor muda, o nome diz o papel. Se o valor nunca muda, o nome diz o valor.',
    right: (
      <>
        <Tk>space/16</Tk> vale 16 em todo projeto. <Tk>text/primary</Tk> muda de cor, mas é sempre o texto principal.
      </>
    ),
    wrong: (
      <>
        <Tk>background/blue</Tk>, que vira mentira quando a marca do projeto é verde.
      </>
    ),
  },
  {
    n: 3,
    x: 947,
    y: 8158,
    title: 'Reutilize antes de criar',
    desc: 'Antes de criar um token, procure um que já sirva. Cada novo nome exige aprendizado e manutenção.',
    right: (
      <>
        Usar <Tk>text/secondary</Tk> numa legenda.
      </>
    ),
    wrong: (
      <>
        Criar <Tk>text/caption</Tk> com o mesmo valor de <Tk>text/secondary</Tk>.
      </>
    ),
  },
  {
    n: 4,
    x: 104,
    y: 8703,
    title: 'Comece no projeto; promova com evidência',
    desc: 'O que nasce em um projeto fica em Específicos. Só vira token de todos quando a necessidade se repete.',
    right: (
      <>
        <Tk>background/reading</Tk> nasce em Específicos e sobe para a Semântica se três projetos precisarem dele.
      </>
    ),
    wrong: 'Criar um token na camada Semântica que só um projeto usa.',
  },
  {
    n: 5,
    x: 525,
    y: 8703,
    title: 'Todo token diz quanto pode mudar',
    desc: 'A descrição informa se o token é Travado, Ajustável ou Livre. Leia antes de mexer.',
    right: (
      <>
        A descrição de <Tk>border/strong</Tk> informa se é Travado, Ajustável ou Livre e qual é o limite.
      </>
    ),
    wrong: 'Mudar um token sem descrição, sem saber o efeito nas telas.',
  },
  {
    n: 6,
    x: 947,
    y: 8703,
    title: 'Prefira regras verificáveis',
    desc: 'Prefira regras que qualquer pessoa possa conferir. Números não dependem de bom senso.',
    right: 'Texto com contraste mínimo de 4,5:1; medidas em múltiplos de 4.',
    wrong: '“Contraste suficiente”; “espaçamento confortável”.',
  },
  {
    n: 7,
    x: 104,
    y: 9257,
    w: 810,
    wide: true,
    title: 'Registre o porquê',
    desc: 'Registre o motivo de cada decisão e token para que outras pessoas entendam antes de mudar.',
    right: 'Descreva quando usar e não usar. Ao renomear, registre no Histórico o nome antigo e o substituto.',
    wrong: 'Renomear um token sem registrar qual é o substituto.',
  },
]

export default function Estrutura() {
  return (
    <>
      {/* Padronizar a estrutura, não a aparência */}
      <section aria-labelledby="dt-padronizar">
        <Title id="dt-padronizar" x={104} y={6073} w={600}>
          Padronizar a<br />
          estrutura, não
          <br />a aparência.
        </Title>
        <Abs x={841} y={6100} w={179} h={179} className={s.shapeCircle} aria-hidden="true" />
        <Abs x={999} y={6100} w={179} h={179} className={s.shapeSquare} aria-hidden="true" />
        <AbsImg x={1133} y={6100} w={203} h={179} src={triangulo} alt="" />
        <Body x={841} y={6302} w={495}>
          Na pesquisa de mercado, percebi que um token primitivo chamado <Tk>blue</Tk> não serve a um projeto rosa.
        </Body>
        <Body x={104} y={6557} w={1002}>
          O nome precisa dizer o que não muda: se o valor muda de projeto para projeto, o nome diz o papel (
          <Tk>brand-n/500</Tk>, <Tk>accent-n/subtle</Tk>); se nunca muda, diz o valor (<Tk>space/24</Tk>,{' '}
          <Tk>radius/16</Tk>).
        </Body>
      </section>

      {/* Estrutura de nomenclatura */}
      <section aria-labelledby="dt-nomenclatura">
        <Title id="dt-nomenclatura" x={420} y={6761} w={600} center>
          Estrutura de
          <br />
          nomenclatura
        </Title>
        <ol className={s.steps}>
          {STEPS.map((st) => (
            <Abs as="li" key={st.title} x={st.x} y={7097} w={282} h={547} className={s.step}>
              <div className={s.stepHead}>
                <h3>{st.title}</h3>
                <p>{st.q}</p>
              </div>
              <ul className={s.stepBox}>
                {st.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
                {st.note && (
                  <li className={s.stepNote}>
                    {st.note[0]}
                    <br />
                    {st.note[1]}
                  </li>
                )}
              </ul>
            </Abs>
          ))}
        </ol>
        {[388.3, 705, 1021.7].map((x) => (
          <T key={x} x={x} y={7121} w={30} fs={30} lh={36} color="#533f26" center aria-hidden="true">
            →
          </T>
        ))}
        <p className="visually-hidden">Exemplo: background/action/primary/hover</p>
        {EXAMPLE.map((t, i) => (
          <Abs key={t} x={[104, 420.7, 737.3, 1054][i]} y={7682} w={282} h={54} className={s.exampleBox} aria-hidden="true">
            {t}
          </Abs>
        ))}
        {[399.3, 716, 1032.7].map((x) => (
          <T key={x} x={x} y={7696} w={8} fs={22} lh={26} color="#b55a00" aria-hidden="true">
            /
          </T>
        ))}
      </section>

      {/* Sete princípios */}
      <section aria-labelledby="dt-principios">
        <Title id="dt-principios" x={563} y={7822} w={773} right>
          Sete princípios
          <br />
          para decidir
        </Title>
        {PRINCIPLES.map((p) => (
          <Abs as="article" key={p.n} x={p.x} y={p.y} w={p.w ?? 389} h={p.wide ? 356 : 494} className={cx(s.principle, p.wide && s.principleWide)}>
            <div className={s.cardTop}>
              <div className={s.cardHead}>
                <Num n={p.n} />
                <h3>{p.title}</h3>
              </div>
              <p>{p.desc}</p>
            </div>
            <hr />
            <div className={s.cardRight}>
              <h4>Certo</h4>
              <p>{p.right}</p>
            </div>
            <div className={s.cardWrong}>
              <h4>Errado</h4>
              <p>{p.wrong}</p>
            </div>
          </Abs>
        ))}
        <T x={947} y={9457} w={389} fs={40} lh={52} weight={300} color={BROWN} right>
          Com eles, as decisões deixaram de ser <strong>opinião</strong>.
        </T>
      </section>
    </>
  )
}
