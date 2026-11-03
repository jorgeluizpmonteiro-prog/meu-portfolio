// Gera src/styles/tokens.css a partir dos tokens exportados do Figma (pasta tokens/).
// Rode com `npm run tokens` sempre que exportar novos tokens do Figma.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'))

const toVar = (path) => `--${path.replace(/\//g, '-')}`

// Valores numéricos sem unidade (o resto vira px)
const UNITLESS = [/font-weight/, /^opacity\//]
const FONT_FALLBACK = {
  Onest: "'Onest', system-ui, sans-serif",
  Outfit: "'Outfit', system-ui, sans-serif",
}

function flatten(node, prefix = '') {
  const out = []
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue
    const path = prefix ? `${prefix}/${key}` : key
    if (value && typeof value === 'object' && '$type' in value) out.push({ path, token: value })
    else if (value && typeof value === 'object') out.push(...flatten(value, path))
  }
  return out
}

function color(value) {
  const [r, g, b] = value.components.map((c) => Math.round(c * 255))
  if (value.alpha === undefined || value.alpha === 1) return value.hex.toLowerCase()
  return `rgb(${r} ${g} ${b} / ${+value.alpha.toFixed(3)})`
}

function format(path, token) {
  const v = token.$value
  switch (token.$type) {
    case 'color':
      return color(v)
    case 'string':
      return FONT_FALLBACK[v] ?? `'${v}'`
    case 'number': {
      if (/^opacity\//.test(path)) return String(v / 100)
      if (UNITLESS.some((re) => re.test(path))) return String(v)
      return `${v}px`
    }
    default:
      return String(v)
  }
}

// Semânticos apontam para o primitivo (var) quando existe alias no Figma
function declarations(tokens, { useAlias }) {
  return tokens.map(({ path, token }) => {
    const alias = token.$extensions?.['com.figma.aliasData']?.targetVariableName
    // Quando o semântico tem o mesmo nome do primitivo (ex.: radius/full), usa o valor direto
    const value = useAlias && alias && alias !== path ? `var(${toVar(alias)})` : format(path, token)
    return `  ${toVar(path)}: ${value};`
  })
}

const base = flatten(read('tokens/base/value.tokens.json'))
const semanticLight = flatten(read('tokens/semantic/light.tokens.json'))
const semanticDark = flatten(read('tokens/semantic/dark.tokens.json'))
const specificLight = flatten(read('tokens/specific/light.tokens.json'))
const specificDark = flatten(read('tokens/specific/dark.tokens.json'))

// Só o que muda entre os modos vai para o bloco dark
const lightValues = new Map(
  [...semanticLight, ...specificLight].map(({ path, token }) => [path, JSON.stringify(token.$value)]),
)
const darkOnly = [...semanticDark, ...specificDark].filter(
  ({ path, token }) => lightValues.get(path) !== JSON.stringify(token.$value),
)

const shadows = (names) =>
  names.map(
    (n) =>
      `  --shadow-${n}: var(--shadow-${n}-offset-x) var(--shadow-${n}-offset-y) var(--shadow-${n}-blur) var(--shadow-${n}-spread) var(--shadow-${n}-color);`,
  )

const darkBlock = declarations(darkOnly, { useAlias: true }).map((l) => `  ${l}`)

const css = `/* Arquivo gerado por scripts/build-tokens.mjs — não edite à mão. */

/* Primitivos (coleção base) */
:root {
${declarations(base, { useAlias: false }).join('\n')}
}

/* Semânticos — modo light (padrão) */
:root {
  color-scheme: light;
${declarations([...semanticLight, ...specificLight], { useAlias: true }).join('\n')}
${shadows(['raised', 'overlay']).join('\n')}
}

/* Semânticos — modo dark (escolha salva ou preferência do sistema) */
:root[data-theme='dark'] {
  color-scheme: dark;
${declarations(darkOnly, { useAlias: true }).join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
${darkBlock.join('\n')}
  }
}
`

writeFileSync(resolve(root, 'src/styles/tokens.css'), css)
console.log(`tokens.css gerado: ${base.length} primitivos, ${semanticLight.length + specificLight.length} semânticos, ${darkOnly.length} sobrescritas dark`)
