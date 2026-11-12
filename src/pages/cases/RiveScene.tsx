import { useEffect, useRef, useState, type CSSProperties } from 'react'
import wasmUrl from '@rive-app/canvas-lite/rive.wasm?url'
import { Abs } from './Stage'
import styles from './Stage.module.css'

/*
 * Animação do Rive posicionada no palco do case (arquivos .riv feitos no Rive).
 *
 * - Mostra o primeiro quadro como imagem (poster) até a animação carregar; a troca é invisível.
 * - Só baixa o runtime e o .riv quando a cena se aproxima da tela, e pausa fora dela.
 * - pingpong: a linha do tempo vai até o fim e volta, com desaceleração nas pontas, para um
 *   carrossel contínuo sem “pulo” quando o último quadro não emenda no primeiro.
 * - Com “reduzir movimento” ativado, fica só o poster.
 */

type Props = {
  x: number
  y: number
  w: number
  h: number
  /** Arquivo .riv (importado com ?url) */
  src: string
  /** Primeiro quadro da animação, mostrado enquanto carrega */
  poster: string
  alt: string
  /** Linha do tempo a tocar e sua duração em segundos */
  animation: string
  duration: number
  className?: string
  style?: CSSProperties
}

export function RiveScene({ x, y, w, h, src, poster, alt, animation, duration, className, style }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrap.current
    const cv = canvas.current
    if (!el || !cv || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Estado da reprodução (fora do React: muda a cada quadro)
    const st = {
      disposed: false,
      rive: null as import('@rive-app/canvas-lite').Rive | null,
      frame: 0,
      last: 0,
      elapsed: 0,
      visible: false,
    }

    const tick = (now: number) => {
      st.frame = 0
      if (!st.rive || !st.visible || st.disposed) return
      st.elapsed += Math.min(0.1, st.last ? (now - st.last) / 1000 : 0)
      st.last = now
      // Vai e volta: 0 → duração → 0, desacelerando nas pontas
      const phase = (st.elapsed % (duration * 2)) / (duration * 2)
      st.rive.scrub(animation, (duration * (1 - Math.cos(phase * 2 * Math.PI))) / 2)
      st.frame = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!st.frame && st.rive && st.visible) {
        st.last = 0
        st.frame = requestAnimationFrame(tick)
      }
    }

    const resize = () => st.rive?.resizeDrawingSurfaceToCanvas(Math.min(window.devicePixelRatio || 1, 1.5))
    const sizes = new ResizeObserver(resize)

    const load = async () => {
      const mod = await import('@rive-app/canvas-lite')
      if (st.disposed) return
      mod.RuntimeLoader.setWasmUrl(wasmUrl)
      mod.Rive.suppressDeprecationWarnings = ['scrub', 'animations-param', 'default-state-machine']
      st.rive = new mod.Rive({
        src,
        canvas: cv,
        autoplay: false,
        animations: animation,
        layout: new mod.Layout({ fit: mod.Fit.Cover }),
        onLoad: () => {
          if (st.disposed || !st.rive) return
          resize()
          sizes.observe(cv)
          st.rive.scrub(animation, 0)
          setReady(true)
          start()
        },
      })
    }

    // Baixa quando falta pouco para aparecer; toca só enquanto está na tela
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near.disconnect()
          void load()
        }
      },
      { rootMargin: '3000px 0px' },
    )
    const onScreen = new IntersectionObserver((entries) => {
      st.visible = entries.some((e) => e.isIntersecting)
      if (st.visible) start()
    })
    near.observe(el)
    onScreen.observe(el)

    return () => {
      st.disposed = true
      near.disconnect()
      onScreen.disconnect()
      sizes.disconnect()
      cancelAnimationFrame(st.frame)
      st.rive?.cleanup()
    }
  }, [src, animation, duration])

  return (
    <Abs x={x} y={y} w={w} h={h} className={className} style={style} role="img" aria-label={alt}>
      <div ref={wrap} className={styles.riveScene}>
        <img src={poster} alt="" width={Math.round(w)} height={Math.round(h)} loading="lazy" decoding="async" />
        <canvas ref={canvas} style={{ opacity: ready ? 1 : 0 }} aria-hidden="true" />
      </div>
    </Abs>
  )
}
