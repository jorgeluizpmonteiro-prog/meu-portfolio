import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import styles from './ScrollIndicator.module.css'

/**
 * Barra vertical à direita (Figma: “Frame 24065”, 16 × 900, D-07).
 * Indica a posição da rolagem (MOT-15) e pode ser arrastada.
 * Só aparece quando a página tem rolagem e em telas a partir de 1024 px
 * (abaixo disso a margem de 32 px não comporta a barra sem encostar nos cards).
 */
export function ScrollIndicator() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ progress: 0, scrollable: false })
  const drag = useRef<{ startY: number; startScroll: number } | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setState({ progress: max > 0 ? Math.min(1, window.scrollY / max) : 0, scrollable: max > 1 })
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [])

  const travel = () => {
    const track = trackRef.current
    if (!track) return 1
    // trilho − 2 × folga de 8 px − polegar de 100 px
    return Math.max(1, track.clientHeight - 16 - 100)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { startY: e.clientY, startScroll: window.scrollY }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    const max = document.documentElement.scrollHeight - window.innerHeight
    const delta = ((e.clientY - drag.current.startY) / travel()) * max
    window.scrollTo({ top: drag.current.startScroll + delta, behavior: 'instant' })
  }

  const onPointerUp = () => {
    drag.current = null
  }

  if (!state.scrollable) return null

  return (
    <div ref={trackRef} className={styles.track} aria-hidden="true">
      <div
        className={styles.thumb}
        style={{ '--progress': state.progress } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
  )
}
