/**
 * Lista de projetos da página inicial.
 *
 * Para publicar um novo case:
 * 1. adicione (ou edite) o projeto aqui, com o `slug` que vira o endereço /projetos/<slug>;
 * 2. coloque a capa em public/images/projects/<slug>/cover.webp;
 * 3. mude `status` para 'published' quando a página do case estiver pronta.
 *
 * Projetos com status 'soon' aparecem com “Em breve” e sem link.
 * Os 3 primeiros ficam em destaque; os demais aparecem abaixo e o botão
 * “Ver mais projetos” passa a ser exibido automaticamente.
 */
import inovaLogo from '../assets/cases/inova-yq/logo.svg'
import vizuLogo from '../assets/cases/vizu/logo.svg'

export type ProjectStatus = 'published' | 'soon'

export type Project = {
  slug: string
  title: string
  /** Texto provisório (D-12): Jorge vai enviar as descrições finais. */
  description: string
  category: string
  cover: string
  coverAlt: string
  status: ProjectStatus
  /** Logo e ano mostrados no header da página do case (Header Type=Project). */
  logo?: string
  year?: string
}

const PROVISIONAL_DESCRIPTION =
  'Do desafio à solução: conheça o processo e as decisões de design deste projeto.'

// Ordem de exibição na página inicial: do mais importante para o menos.
export const projects: Project[] = [
  {
    slug: 'design-tokens',
    title: 'Design Tokens',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Design System',
    cover: '/images/projects/design-tokens/cover.webp',
    coverAlt: 'Documentação de Design Tokens: valor hexadecimal, token base e token semântico ligados por setas',
    status: 'soon',
  },
  {
    slug: 'tiddo',
    title: 'Tiddo',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/tiddo/cover.webp',
    coverAlt: 'Mãos segurando um celular com o aplicativo Tiddo',
    status: 'soon',
  },
  {
    slug: 'vizu',
    title: 'Vizu',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/vizu/cover.webp',
    coverAlt: 'Telas do aplicativo Vizu em celulares',
    status: 'published',
    logo: vizuLogo,
    year: '2025',
  },
  {
    slug: 'inova-yq',
    title: 'Inova+YQ',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/inova-yq/cover.webp',
    coverAlt: 'Telas do Inova+YQ em um notebook e um celular',
    status: 'published',
    logo: inovaLogo,
    year: '2025',
  },
]

export const FEATURED_COUNT = 3
