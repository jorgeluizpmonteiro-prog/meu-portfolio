import type { CSSProperties } from 'react'
import { Abs, T } from '../Stage'
import { u } from '../units'
import { Bar, Num, Title } from './shared'
import { BROWN } from './constants'
import s from './DesignTokens.module.css'

/* O que os testes mostraram · encerramento (y 26265 até o fim) */

type Result = { title: string; text: string }

const FLOW_1: Result[] = [
  { title: 'Automação funcionou', text: '2 minutos de automação e 5 min de revisão na prévia.' },
  { title: 'Trocas feitas rapidamente', text: 'Um clique aplicou 13 trocas na camada Base e 15 na Semântica e removeu 107 tokens que não seriam utilizados.' },
  { title: 'Trocas feitas rapidamente', text: 'Na primeira versão, com o Projeto B, a automação levou 10 min, e a aplicação ainda ficava para outra etapa.' },
  { title: 'Trocas feitas rapidamente', text: 'O contraste pegou um caso real: preto sobre a nova cor de ação dava 2,76:1.' },
]

const FLOW_2: Result[] = [
  { title: 'Automação funcionou', text: '6 envios, de 3 tokens diferentes; o border/drop-target foi enviado 4 vezes, em iterações do e-mail;' },
  { title: 'Trocas feitas rapidamente', text: 'A recomendação da IA bateu com a decisão humana nos 6;' },
  { title: 'Trocas feitas rapidamente', text: 'A proposta com aparência e componente no nome teve 7 falhas e foi barrada.' },
  { title: 'Trocas feitas rapidamente', text: 'Do envio à decisão, até 8 min.' },
]

const COLS = [
  { x: 104, w: 284 },
  { x: 421, w: 283 },
  { x: 737, w: 283 },
  { x: 1053, w: 283 },
]

function Results({ y, items, label }: { y: number; items: Result[]; label: string }) {
  return (
    <ol className={s.plainList} aria-label={label}>
      {items.map((r, i) => (
        <Abs as="li" key={i} x={COLS[i].x} y={y} w={COLS[i].w} h={228} className={s.result} data-reveal="up">
          <div className={s.cardHead}>
            <Num n={i + 1} />
            <h4>{r.title}</h4>
          </div>
          <p>{r.text}</p>
        </Abs>
      ))}
    </ol>
  )
}

export default function Resultados() {
  return (
    <>
      <section aria-labelledby="dt-testes">
        <Title id="dt-testes" x={259} y={26265} w={922} center>
          O que os testes
          <br />
          mostraram
        </Title>
        <T x={389} y={26572} w={663} fs={32} lh={41.6} weight={300} color={BROWN} center data-reveal="up">
          Os testes mostram que <strong>o desenho funciona</strong>,
          <br />e o primeiro uso real confirma.
        </T>

        <Bar x={104} y={26713} h={105} />
        <T as="h3" x={144} y={26722} w={1192} fs={64} lh={96} weight={700} color={BROWN} data-reveal="up">
          Fluxo 1
        </T>
        <Results y={26860} items={FLOW_1} label="Resultados do fluxo 1" />

        <Bar x={1320} y={27184} h={105} />
        <T as="h3" x={104} y={27193} w={1192} fs={64} lh={96} weight={700} color={BROWN} right data-reveal="up">
          Fluxo 2
        </T>
        <Results y={27333} items={FLOW_2} label="Resultados do fluxo 2" />
      </section>

      <section aria-labelledby="dt-conclusao">
        <Title id="dt-conclusao" x={104} y={27666} w={737}>
          O sistema foi
          <br />
          desenhado para
          <br />
          continuar sem
          <br />
          quem o criou.
        </Title>
        <T x={875} y={27936} w={461} fs={32} lh={41.6} weight={300} color={BROWN} right data-reveal="up">
          A documentação <strong>mora no próprio arquivo do laboratório</strong>, o quadro de registros guarda as{' '}
          <strong>propostas, aprovações e exceções</strong> de cada projeto.
        </T>
      </section>

      <section aria-labelledby="dt-fim">
        <T x={-12} y={28691} w={1464} fs={302.8} lh={393.6} weight={300} color="#ffebd7" className={`${s.titleFont} ${s.thanks}`} aria-hidden="true" data-reveal="fade" data-parallax="drift" style={{ '--parallax': u(160) } as CSSProperties}>
          OBRIGADO
        </T>
        <T as="h2" id="dt-fim" x={378} y={28377} w={683.3} fs={66.8} lh={100.2} weight={400} color={BROWN} center className={s.nowrap} data-reveal="up">
          Gostou do processo?
        </T>
        <T x={411.8} y={28496} w={615.8} fs={30} lh={45} color={BROWN} center data-reveal="up">
          Obrigado por ter visto até aqui, espero que tenha gostado do projeto!
        </T>
      </section>
    </>
  )
}
