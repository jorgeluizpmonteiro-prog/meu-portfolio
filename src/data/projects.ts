/**
 * Lista de projetos da página inicial.
 *
 * Para publicar um novo case:
 * 1. adicione (ou edite) o projeto aqui, com o `slug` que vira o endereço /projetos/<slug>;
 * 2. coloque a capa em public/images/projects/<slug>/cover.jpg;
 * 3. mude `status` para 'published' quando a página do case estiver pronta.
 *
 * Projetos com status 'soon' aparecem com “Em breve” e sem link.
 * Os 3 primeiros ficam em destaque; os demais aparecem abaixo e o botão
 * “Ver mais projetos” passa a ser exibido automaticamente.
 */
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
}

const PROVISIONAL_DESCRIPTION =
  'Do desafio à solução: conheça o processo e as decisões de design deste projeto.'

export const projects: Project[] = [
  {
    slug: 'inova-yq',
    title: 'Inova+YQ',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/inova-yq/cover.jpg',
    coverAlt: 'Telas do Inova+YQ em um notebook e um celular',
    status: 'published',
  },
  {
    slug: 'vizu',
    title: 'Vizu',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/vizu/cover.jpg',
    coverAlt: 'Telas do aplicativo Vizu em celulares',
    status: 'published',
  },
  {
    slug: 'tiddo',
    title: 'Tiddo',
    description: PROVISIONAL_DESCRIPTION,
    category: 'Product Design',
    cover: '/images/projects/tiddo/cover.jpg',
    coverAlt: 'Mãos segurando um celular com o aplicativo Tiddo',
    status: 'soon',
  },
]

export const FEATURED_COUNT = 3
