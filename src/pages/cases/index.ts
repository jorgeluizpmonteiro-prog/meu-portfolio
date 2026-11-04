import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

/**
 * Páginas de case já construídas, por slug (o mesmo de src/data/projects.ts).
 * Carregadas sob demanda: as imagens e fontes de cada case só baixam ao abrir o case.
 */
export const casepages: Record<string, LazyExoticComponent<ComponentType>> = {
  'inova-yq': lazy(() => import('./inova-yq/InovaYQ')),
  vizu: lazy(() => import('./vizu/Vizu')),
}
