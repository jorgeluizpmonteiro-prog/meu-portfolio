# Portfólio — Jorge Luiz

Site pessoal de portfólio, feito em **React + Vite + TypeScript** e hospedado na **Vercel**.
O design e o handoff estão no Figma (arquivo “Portfólio”, página Site).

## Como rodar

Precisa do [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente http://localhost:5173).

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Abre a versão de produção localmente |
| `npm run lint` | Verifica o código |
| `npm run tokens` | Regenera `src/styles/tokens.css` a partir de `tokens/` |

## Estrutura

```
tokens/                 Tokens exportados do Figma (base, semantic, specific)
scripts/build-tokens.mjs Converte os tokens em variáveis CSS
public/images/          Fotos e capas dos projetos
src/
  styles/tokens.css     Variáveis geradas (não editar à mão)
  styles/global.css     Base, fontes e valores ainda sem token
  config/site.ts        Nome, LinkedIn, currículo, foto
  data/projects.ts      Lista de projetos da página inicial
  components/           Header, NavBar, Button, ButtonIcon, ProjectCard, Icon…
  pages/                Home (P.01) e páginas provisórias
```

## Tokens do Figma

Os arquivos em `tokens/` são a exportação das variáveis do Figma. Quando mudar algo no Figma,
exporte de novo, substitua os arquivos e rode `npm run tokens`. Os temas claro e escuro
vêm dos modos `light` e `dark` da coleção semantic.

As páginas do portfólio (Início, Sobre mim, Contato) usam só os tokens.
As apresentações dos projetos (cases) usam as cores e fontes próprias de cada apresentação.

## Como atualizar o conteúdo

- **Projetos:** edite `src/data/projects.ts`. Projeto com `status: 'soon'` aparece como “Em breve”.
  Com mais de 3 projetos, o botão “Ver mais projetos” aparece sozinho.
- **Capas:** `public/images/projects/<slug>/cover.jpg` (exportação 2× da camada “Project image”, 758 × 504).
- **Foto:** `public/images/avatar.png` (exportação 2× de “Avatar — Jorge Luiz”, 144 × 144).
- **Currículo:** coloque o PDF em `public/` e preencha `cvUrl` em `src/config/site.ts`.

## Publicar na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório do GitHub.
2. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`).
3. Cada `git push` na branch principal publica uma nova versão.

O arquivo `vercel.json` faz todas as rotas (ex.: `/sobre`) abrirem o app.
