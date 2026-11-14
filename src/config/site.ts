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

/**
 * Formulário de contato pelo EmailJS (emailjs.com). Os três valores são públicos por natureza
 * (ficam no código do site). O modelo do e-mail usa {{from_email}}, {{subject}} e {{message}}.
 */
export const emailjs = {
  serviceId: 'service_5rng765',
  templateId: 'template_wiguhft',
  publicKey: 'abYIsrQVzxkDOt5cH',
}

export const navItems = [
  { label: 'Projetos', to: '/', match: (path: string) => path === '/' || path.startsWith('/projetos') },
  { label: 'Sobre mim', to: '/sobre', match: (path: string) => path.startsWith('/sobre') },
  { label: 'Vamos conversar', to: '/contato', match: (path: string) => path.startsWith('/contato') },
] as const
