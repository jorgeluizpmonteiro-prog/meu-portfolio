import { useEffect, type RefObject } from 'react'
import './motion.css'

/*
 * Animações de scroll dos cases (reaproveitáveis em todas as apresentações).
 *
 * Marque os elementos com data-reveal e o tipo de entrada:
 *   up    — aparece subindo levemente (padrão para textos e cards)
 *   fade  — só aparece
 *   scale — cresce de leve ao aparecer (formas, destaques)
 *   left  — entra da esquerda
 *   mask  — revelado por uma máscara que se abre (fotos e mockups)
 *   wipe  — revelado da esquerda para a direita (faixas, paletas)
 *   grow  — cresce de cima para baixo (barras de destaque)
 *   lines — título revelado linha a linha (use <Lines>)
 * Elementos que entram juntos na tela aparecem em sequência (de cima para baixo, da esquerda para a
 * direita). data-count="N" num filho faz o número contar até N quando o bloco aparece.
 *
 * data-parallax="view" (ou "top", para a capa) move o elemento de leve com o scroll; a amplitude
 * vem de --parallax. Usa as animações ligadas ao scroll do CSS, só onde o navegador tem suporte.
 *
 * Princípios: o estado final é sempre o do Figma; sem JavaScript ou com “reduzir movimento”
 * ativado, tudo aparece parado; só transform e opacity são animados.
 */

const STEP_MS = 80
const MAX_STEPS = 8

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count)
  if (!Number.isFinite(target)) return
  const start = performance.now()
  const duration = 900
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = String(Math.round(target * eased))
    if (t < 1) requestAnimationFrame(tick)
  }
  el.textContent = '0'
  requestAnimationFrame(tick)
}

/** Liga as revelações de scroll dentro do elemento (normalmente o <main> do case). */
export function useScrollReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        entering.forEach((entry, i) => {
          const el = entry.target as HTMLElement
          el.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STEPS) * STEP_MS}ms`)
          el.dataset.revealed = ''
          el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    root.dataset.motion = ''
    targets.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      delete root.dataset.motion
    }
  }, [ref])
}
