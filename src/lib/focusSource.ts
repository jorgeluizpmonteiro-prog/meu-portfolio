/**
 * Marca no <html> como a pessoa está navegando: data-focus-source="keyboard" ao usar Tab,
 * "pointer" ao clicar ou tocar. Os campos de texto só mostram o anel de foco quando se chega
 * a eles pelo Tab; ao clicar para digitar, ficam no estado Filled (o navegador considera
 * :focus-visible verdadeiro em campos de texto mesmo com o mouse).
 */
export function trackFocusSource() {
  const root = document.documentElement
  window.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Tab') root.dataset.focusSource = 'keyboard'
    },
    true,
  )
  window.addEventListener(
    'pointerdown',
    () => {
      root.dataset.focusSource = 'pointer'
    },
    true,
  )
}
