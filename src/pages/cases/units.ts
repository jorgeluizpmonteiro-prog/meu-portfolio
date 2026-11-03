/** Converte uma medida do Figma (px a 1440) para a unidade do palco dos cases (--u). */
export const u = (n: number) => `calc(${n} * var(--u))`
