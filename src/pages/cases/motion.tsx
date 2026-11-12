import { Children, isValidElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import './motion.css'

/* Peças visuais das animações de scroll dos cases (o funcionamento está em useScrollReveal.ts). */

/**
 * Divide um título nas linhas definidas por <br /> para a revelação linha a linha
 * (cada linha sobe de dentro de uma máscara).
 */
export function Lines({ children }: { children: ReactNode }) {
  const lines: ReactNode[][] = [[]]
  Children.toArray(children).forEach((child) => {
    if (isValidElement(child) && child.type === 'br') lines.push([])
    else lines[lines.length - 1].push(child)
  })
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line" style={{ '--line': i } as CSSProperties}>
          <span>{line}</span>
        </span>
      ))}
    </>
  )
}

/** Barra fina no topo que acompanha quanto do case já foi lido. */
export function ScrollProgress({ color }: { color: string }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const raf = { id: 0 }
    const update = () => {
      raf.id = 0
      const el = bar.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const onScroll = () => {
      if (!raf.id) raf.id = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf.id)
    }
  }, [])
  return <div ref={bar} className="scroll-progress" style={{ backgroundColor: color }} aria-hidden="true" />
}
