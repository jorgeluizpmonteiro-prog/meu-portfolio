import { Suspense } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { NextCases } from './components/NextCases/NextCases'
import { projects } from './data/projects'
import { casepages } from './pages/cases'
import { Contact } from './pages/Contact/Contact'
import { Home } from './pages/Home/Home'
import { SimplePage } from './pages/SimplePage/SimplePage'

// Provisório: as páginas abaixo serão desenvolvidas nas próximas etapas.
const IN_PROGRESS = 'Esta página está sendo construída e chega em breve.'

function ProjectRoute() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug && p.status === 'published')
  if (!project) return <NotFound />
  const CasePage = casepages[project.slug]
  if (!CasePage) return <SimplePage title={project.title} text={IN_PROGRESS} />
  return (
    <Suspense fallback={<main id="conteudo" style={{ minHeight: '100vh' }} />}>
      <CasePage />
      <NextCases current={project.slug} />
    </Suspense>
  )
}

function NotFound() {
  return <SimplePage title="Página não encontrada" text="O endereço que você acessou não existe ou mudou de lugar." />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projetos/:slug" element={<ProjectRoute />} />
        <Route path="sobre" element={<SimplePage title="Sobre mim" text={IN_PROGRESS} />} />
        <Route path="contato" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
