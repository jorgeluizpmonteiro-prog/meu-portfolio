/*
 * Sitemap e Fluxo do Usuário do Vizu — coordenadas do Figma (palco de 1440, y da página).
 * Formas: Figma “Diagrama / …”; linhas: “Conexão / …”.
 */

/** Estilo da forma: cores do Figma */
export type BoxKind =
  | 'home' // #dcd9f8, texto #100738
  | 'primary' // #a39aed, texto preto 80%
  | 'dark' // #281966, texto #dcd9f8
  | 'outline' // contorno #2d1b7b, texto #a39aed

export type Box = {
  x: number
  y: number
  w: number
  h: number
  label: string
  kind: BoxKind
  /** Tamanho da fonte (padrão 24) */
  fs?: number
  /** Raio da borda (padrão 6) */
  r?: number
}

export type Circle = { x: number; y: number; size: number; label: string }
export type Diamond = { x: number; y: number; w: number; h: number; label: string; fs: number; lines: number }

/** Linha: lista de pontos; `arrow` desenha a seta no último ponto */
export type Line = { points: [number, number][]; arrow?: boolean; color?: string; round?: number }

const W = 150.2

export const sitemapBoxes: Box[] = [
  { x: 619.6, y: 8396.3, w: W, h: 56.3, label: 'Home', kind: 'home' },
  { x: 78, y: 8532.1, w: W, h: 56.3, label: 'Novo Registro', kind: 'primary' },
  { x: 434.2, y: 8532.1, w: W, h: 71.1, label: 'Coleções', kind: 'primary' },
  { x: 793, y: 8532.1, w: W, h: 71.1, label: 'Histórico', kind: 'primary' },
  { x: 1151.1, y: 8532.1, w: W, h: 56.4, label: 'Perfil', kind: 'primary' },
  { x: 142, y: 8649.8, w: W, h: 56.3, label: 'Câmera', kind: 'dark' },
  { x: 142, y: 9155.4, w: W, h: 70.7, label: 'Resultado', kind: 'dark' },
  { x: 498.2, y: 8649.8, w: W, h: 56.3, label: 'Coleções Criadas', kind: 'dark' },
  { x: 498.2, y: 9084.7, w: W, h: 56.3, label: 'Criar Coleção', kind: 'dark' },
  { x: 857, y: 8649.8, w: W, h: 70.6, label: 'Histórico de Classificações', kind: 'dark' },
  { x: 1211.8, y: 8649.8, w: W, h: 56.3, label: 'Configurações', kind: 'dark' },
  // Novo Registro › Câmera
  { x: 198.7, y: 8745.9, w: W, h: 56.3, label: 'Galeria', kind: 'outline' },
  { x: 198.7, y: 8841.9, w: W, h: 56.3, label: 'Rotacionar câmera', kind: 'outline' },
  { x: 198.7, y: 8938, w: W, h: 56.3, label: 'Flash', kind: 'outline' },
  { x: 198.7, y: 9034, w: W, h: 56.3, label: 'Cancelar', kind: 'outline' },
  // Novo Registro › Resultado
  { x: 198.7, y: 9253.4, w: W, h: 56.3, label: 'Acurácia', kind: 'outline' },
  { x: 198.7, y: 9352.1, w: W, h: 56.3, label: 'Descrição', kind: 'outline' },
  { x: 198.7, y: 9454.2, w: W, h: 72.7, label: 'Concluir', kind: 'outline' },
  { x: 198.7, y: 9553.2, w: W, h: 72.7, label: 'Adicionar a coleção', kind: 'outline' },
  { x: 198.7, y: 9657.4, w: W, h: 56.3, label: 'Discordar', kind: 'outline' },
  // Coleções
  { x: 554.9, y: 8745.7, w: W, h: 70.7, label: 'Histórico da Coleção', kind: 'outline' },
  { x: 554.9, y: 8856.4, w: W, h: 70.7, label: 'Novo Registro', kind: 'outline' },
  { x: 554.9, y: 8967, w: W, h: 70.7, label: 'Atlas da coleção', kind: 'outline' },
  { x: 554.9, y: 9188.7, w: W, h: 70.7, label: 'Nome da Coleção', kind: 'outline' },
  { x: 554.9, y: 9306.8, w: W, h: 70.7, label: 'Segmento', kind: 'outline' },
  // Histórico
  { x: 913.7, y: 8745.7, w: W, h: 70.7, label: 'Última classificação', kind: 'outline' },
  { x: 913.7, y: 8856.4, w: W, h: 70.7, label: 'Filtro (semanal, Quinzenal...)', kind: 'outline' },
  { x: 913.7, y: 8967.4, w: W, h: 70.7, label: 'Resultado', kind: 'outline' },
  // Perfil › Configurações
  { x: 1211.8, y: 8745.9, w: W, h: 56.3, label: 'Privacidade', kind: 'outline' },
  { x: 1211.8, y: 8841.9, w: W, h: 56.3, label: 'Acessibilidade', kind: 'outline' },
  { x: 1211.8, y: 8938, w: W, h: 56.3, label: 'Sobre', kind: 'outline' },
  { x: 1211.8, y: 9034, w: W, h: 56.3, label: 'Métricas da IA', kind: 'outline' },
  { x: 1211.8, y: 9130.1, w: W, h: 56.3, label: 'Sair', kind: 'outline' },
]

const h = (x1: number, x2: number, y: number): Line => ({ points: [[x1, y], [x2, y]] })
const v = (x: number, y1: number, y2: number): Line => ({ points: [[x, y1], [x, y2]] })

export const sitemapLines: Line[] = [
  h(153, 509, 8497),
  h(511, 1226, 8497),
  v(695, 8461, 8497),
  v(153, 8497, 8524),
  v(509, 8496, 8524),
  v(868, 8496, 8524),
  v(1226, 8496, 8524),
  // Novo Registro
  v(106, 8596, 9190),
  h(106, 136, 8678),
  h(106, 136, 9191),
  v(163, 8712, 9062),
  h(163, 191, 8774),
  h(163, 191, 8870),
  h(163, 191, 8966),
  h(163, 191, 9062),
  // Ramo do Resultado: no Figma a linha está levemente inclinada; aqui fica vertical, como os outros ramos
  v(164, 9226, 9686),
  h(164, 191, 9282),
  h(164, 191, 9380),
  h(164, 191, 9491),
  h(164, 191, 9590),
  h(164, 191, 9686),
  // Coleções
  v(462, 8611, 9113),
  h(462, 492, 8678),
  h(462, 492, 9113),
  v(519, 8712, 9002),
  h(519, 547, 8781),
  h(519, 547, 8892),
  h(519, 547, 9002),
  v(525, 9147, 9342),
  h(525, 547, 9224),
  h(525, 547, 9342),
  // Histórico
  v(821, 8611, 8685),
  h(821, 851, 8685),
  v(878, 8726, 9001),
  h(878, 906, 8781),
  h(878, 906, 8892),
  h(878, 906, 9003),
  // Perfil
  v(1175, 8597, 9159),
  h(1175, 1206, 8678),
  h(1175, 1204, 8774),
  h(1175, 1204, 8870),
  h(1175, 1204, 8966),
  h(1175, 1204, 9062),
  h(1175, 1204, 9158),
]

const F = 121

export const flowBoxes: Box[] = [
  { x: 214.7, y: 10255.6, w: 194.6, h: 45.4, label: 'Tela de carregamento', kind: 'outline', r: 3 },
  { x: 78, y: 10391.8, w: F, h: 45.4, label: 'Login', kind: 'outline', r: 3 },
  { x: 78, y: 10482, w: F, h: 45.4, label: 'Email', kind: 'outline', r: 3 },
  { x: 78, y: 10572.3, w: F, h: 45.4, label: 'Senha', kind: 'outline', r: 3 },
  { x: 424.9, y: 10391.8, w: F, h: 45.4, label: 'Cadastro', kind: 'outline', r: 3 },
  { x: 424.9, y: 10467.3, w: F, h: 73.6, label: 'Registro de Informações', kind: 'outline' },
  { x: 424.9, y: 10572.3, w: F, h: 45.4, label: 'Login', kind: 'outline', r: 3 },
  { x: 250.8, y: 10738.1, w: F, h: 45.4, label: 'Onboarding', kind: 'outline', r: 3 },
  { x: 250.8, y: 10821.9, w: F, h: 45.4, label: 'Home', kind: 'outline', r: 3 },
  { x: 250.8, y: 10905.8, w: F, h: 45.4, label: 'Novo Registro', kind: 'outline', fs: 20, r: 3 },
  { x: 424.9, y: 10905.8, w: F, h: 45.4, label: 'Abrir câmera', kind: 'outline', r: 3 },
  { x: 581.1, y: 10898.7, w: F, h: 59.5, label: 'Registra\nimagem', kind: 'outline', fs: 20 },
  { x: 737.3, y: 10898.7, w: F, h: 59.5, label: 'Confirma registro', kind: 'outline', fs: 20 },
  { x: 893.5, y: 10899.4, w: F, h: 58.9, label: 'Segmentação de imagem', kind: 'outline', fs: 20 },
  { x: 1067.2, y: 10899.4, w: F, h: 58.9, label: 'Tela de carregamento', kind: 'outline', fs: 20 },
  { x: 1241, y: 10899.4, w: F, h: 59.5, label: 'Recebe o resultado', kind: 'outline', fs: 20 },
  { x: 544.6, y: 11259.1, w: F, h: 45.4, label: 'Discordar', kind: 'outline', r: 3 },
  { x: 737.9, y: 11259.1, w: F, h: 45.4, label: 'Concluir', kind: 'outline', r: 3 },
  { x: 931.2, y: 11259.1, w: F, h: 58.9, label: 'Adicionar a coleção', kind: 'outline', fs: 20 },
  { x: 544, y: 11343.5, w: F, h: 45.4, label: 'Referências', kind: 'outline', r: 3 },
  { x: 544, y: 11427.9, w: F, h: 58.9, label: 'Seleciona imagem', kind: 'outline', fs: 20 },
  { x: 544, y: 11525.8, w: F, h: 58.9, label: 'Observações', kind: 'outline' },
  { x: 544, y: 11623.8, w: F, h: 58.9, label: 'Conclui', kind: 'outline' },
  { x: 930.6, y: 11343.5, w: F, h: 58.9, label: 'Seleciona coleção', kind: 'outline', fs: 20 },
]

export const flowCircles: Circle[] = [
  { x: 264.9, y: 10119.8, size: 93.5, label: 'Início' },
  { x: 751.4, y: 11343.6, size: 93.5, label: 'Fim' },
  { x: 944.7, y: 11437, size: 93.5, label: 'Fim' },
  { x: 558.1, y: 11716.1, size: 93.5, label: 'Fim' },
]

export const flowDiamonds: Diamond[] = [
  { x: 238.7, y: 10345.7, w: 146.6, h: 136.3, label: 'Login/Cadastro', fs: 22, lines: 1 },
  { x: 697.5, y: 11042.7, w: 200.6, h: 136.3, label: 'Discordar/ Adicionar a coleção/ Concluir', fs: 13, lines: 3 },
]

const a = (line: Line): Line => ({ ...line, arrow: true })
/** Linha em cotovelo (cantos com raio 24): desce, atravessa e desce de novo */
const elbow = (x1: number, y1: number, x2: number, y2: number, midY: number): Line => ({
  points: [[x1, y1], [x1, midY], [x2, midY], [x2, y2]],
  arrow: true,
  round: 24,
})

export const flowLines: Line[] = [
  a(v(312, 10219, 10247)),
  a(v(312, 10309, 10339)),
  a(h(232, 207, 10414)),
  a(h(391, 416, 10414)),
  a(v(138, 10445, 10473)),
  a(v(138, 10535, 10563)),
  a(v(485, 10445, 10459)),
  a(v(485, 10549, 10564)),
  elbow(138, 10626, 311, 10730, 10675),
  elbow(485, 10626, 311, 10730, 10675),
  a(v(311, 10791, 10813)),
  a(v(311, 10875, 10897)),
  a(h(380, 417, 10928)),
  a(h(554, 573, 10928)),
  a(h(710, 729, 10928)),
  a(h(866, 885, 10929)),
  a(h(1022, 1058, 10929)),
  a(h(1196, 1232, 10929)),
  elbow(1302, 10967, 798, 11036, 11001),
  elbow(798, 11185, 605, 11251, 11219),
  { ...a(v(798, 11185, 11251)), color: '#757575' },
  elbow(798, 11185, 992, 11251, 11219),
  a(v(604, 11312, 11335)),
  a(v(604, 11397, 11420)),
  a(v(604, 11495, 11518)),
  a(v(604, 11593, 11616)),
  a(v(605, 11691, 11710)),
  a(v(798, 11312, 11337)),
  a(v(991, 11326, 11335)),
  a(v(991, 11410, 11430)),
]

/** Converte uma linha em `d` de SVG (cantos arredondados quando `round`) */
export function linePath({ points, round }: Line) {
  if (!round || points.length < 3) return 'M' + points.map((p) => p.join(' ')).join('L')
  let d = `M${points[0].join(' ')}`
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1]
    const [cx, cy] = points[i]
    const [nx, ny] = points[i + 1]
    // Trechos das pontas podem ser usados inteiros; os do meio são divididos entre dois cantos
    const r1 = Math.min(round, Math.hypot(cx - px, cy - py) / (i === 1 ? 1 : 2))
    const r2 = Math.min(round, Math.hypot(nx - cx, ny - cy) / (i === points.length - 2 ? 1 : 2))
    const ix = cx - Math.sign(cx - px) * r1
    const iy = cy - Math.sign(cy - py) * r1
    const ox = cx + Math.sign(nx - cx) * r2
    const oy = cy + Math.sign(ny - cy) * r2
    d += `L${ix} ${iy}Q${cx} ${cy} ${ox} ${oy}`
  }
  return d + `L${points[points.length - 1].join(' ')}`
}

/** Ponta de seta (duas hastes de 12,73 a 45°) no último ponto da linha */
export function arrowPath({ points }: Line) {
  const [x2, y2] = points[points.length - 1]
  const [x1, y1] = points[points.length - 2]
  const len = Math.hypot(x2 - x1, y2 - y1) || 1
  const ux = (x2 - x1) / len
  const uy = (y2 - y1) / len
  const s = 12.73
  const bx = x2 - ux * s
  const by = y2 - uy * s
  return `M${bx - uy * s} ${by + ux * s}L${x2} ${y2}L${bx + uy * s} ${by - ux * s}`
}
