import { useEffect, type RefObject } from 'react'

/**
 * No celular, os diagramas e galerias roláveis abrem centralizados
 * (em vez de mostrar só o canto esquerdo do desenho).
 */
export function useCenterScroll(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const center = () => {
      root.current?.querySelectorAll<HTMLElement>('[data-center-scroll]').forEach((el) => {
        if (el.scrollWidth > el.clientWidth) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
      })
    }
    center()
    const mq = window.matchMedia('(max-width: 767px)')
    mq.addEventListener('change', center)
    return () => mq.removeEventListener('change', center)
  }, [root])
}
