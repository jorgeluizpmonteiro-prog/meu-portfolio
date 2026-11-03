export const site = {
  name: 'Jorge Luiz',
  role: 'Product Designer',
  /** Foto do header (Figma: Header › “Avatar — Jorge Luiz”, node 106:7580). */
  avatar: '/images/avatar.webp',
  linkedinUrl: 'https://www.linkedin.com/in/jorgeluizpmonteiro',
  /**
   * Currículo em PDF (D-02). Enquanto for null, o botão CV fica escondido.
   * Quando o arquivo existir: coloque em public/ (ex.: public/curriculo-jorge-luiz.pdf)
   * e troque para '/curriculo-jorge-luiz.pdf'.
   */
  cvUrl: null as string | null,
}

export const navItems = [
  { label: 'Projetos', to: '/', match: (path: string) => path === '/' || path.startsWith('/projetos') },
  { label: 'Sobre mim', to: '/sobre', match: (path: string) => path.startsWith('/sobre') },
  { label: 'Vamos conversar', to: '/contato', match: (path: string) => path.startsWith('/contato') },
] as const
