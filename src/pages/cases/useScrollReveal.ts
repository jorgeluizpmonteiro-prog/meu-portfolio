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
 *   wipe  — revelado da esquerda para a direita (faixas, paletas); wipe-r, da direita
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
  // Enquanto conta, o número ocupa a largura final (alinhado à direita): o texto ao lado não “anda”
  const range = document.createRange()
  range.selectNodeContents(el)
  const width = range.getBoundingClientRect().width
  Object.assign(el.style, { display: 'inline-block', minWidth: `${width}px`, textAlign: 'right', alignSelf: 'flex-start' })
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = String(Math.round(target * eased))
    if (t < 1) requestAnimationFrame(tick)
    else Object.assign(el.style, { display: '', minWidth: '', textAlign: '', alignSelf: '' })
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

    const pending = new Set(root.querySelectorAll<HTMLElement>('[data-reveal]'))

    const reveal = (el: HTMLElement, delay: number) => {
      if (!pending.delete(el)) return
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.dataset.revealed = ''
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
      observer.unobserve(el)
    }

    // Aparece assim que qualquer parte entra na tela; os que entram juntos aparecem em sequência
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entry, i) => reveal(entry.target as HTMLElement, Math.min(i, MAX_STEPS) * STEP_MS))
      },
      { threshold: 0 },
    )

    // Rede de segurança: numa rolagem muito rápida (ou com End, âncoras, saltos) o observador pode não
    // ver um elemento passar. A cada parada da rolagem, revela tudo o que está na tela ou já passou.
    const sweep = { timer: 0 }
    const check = () => {
      sweep.timer = 0
      const bottom = window.innerHeight
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < bottom) reveal(el, 0)
      })
    }
    const onScroll = () => {
      if (!sweep.timer) sweep.timer = window.setTimeout(check, 150)
    }

    root.dataset.motion = ''
    pending.forEach((el) => observer.observe(el))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(sweep.timer)
      delete root.dataset.motion
    }
  }, [ref])
}
