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
  pages/                Home (P.01), Contato (P.04) e páginas provisórias
  pages/cases/          Páginas de case (Inova+YQ, Vizu) e o “palco” que posiciona tudo nas medidas do Figma
  assets/cases/<slug>/  Imagens, ícones e fundos exportados do Figma para cada case
api/contact.ts          Função da Vercel que envia o e-mail do formulário
shared/contact.ts       Validação do formulário (usada no site e na função)
```

## Tokens do Figma

Os arquivos em `tokens/` são a exportação das variáveis do Figma. Quando mudar algo no Figma,
exporte de novo, substitua os arquivos e rode `npm run tokens`. Os temas claro e escuro
vêm dos modos `light` e `dark` da coleção semantic.

As páginas do portfólio (Início, Sobre mim, Contato) usam só os tokens.
As apresentações dos projetos (cases) usam as cores e fontes próprias de cada apresentação.

## Páginas de case

Cada case é uma página própria em `src/pages/cases/<slug>/` e é registrada em
`src/pages/cases/index.ts`. As apresentações do Figma têm 1440 px de largura e são composições livres;
cada seção vira um palco (`Stage`) em que os elementos usam as coordenadas do Figma numa unidade que
escala com a tela. No celular a composição é a mesma do desktop, só que reduzida.
O Vizu é uma composição única (um só palco de 1440 × 20655), porque o fundo e as decorações passam
de uma seção para outra.
Para aparecer com o header do case, o projeto em `src/data/projects.ts` precisa de `logo` e `year`.
Nas páginas de case, um botão fixo no centro da base da tela leva de volta ao topo.

Textos, títulos, cards, diagramas e paletas são código. Ficam como imagem só os assets: mockups,
telas do app, fotos, ilustrações, ícones e texturas de fundo.

## Como atualizar o conteúdo

- **Projetos:** edite `src/data/projects.ts`. Projeto com `status: 'soon'` aparece como “Em breve”.
  Com mais de 3 projetos, o botão “Ver mais projetos” aparece sozinho.
- **Capas:** `public/images/projects/<slug>/cover.webp` (exportação 2× da camada “Project image”, 758 × 504).
- **Foto:** `public/images/avatar.png` (exportação 2× de “Avatar — Jorge Luiz”, 144 × 144).
- **Currículo:** coloque o PDF em `public/` e preencha `cvUrl` em `src/config/site.ts`.

## Formulário de contato (e-mail)

A página `/contato` envia o formulário para a função `api/contact.ts`, que manda o e-mail pelo
[Resend](https://resend.com). O botão “Responder” do e-mail já vai para quem escreveu.

Configuração (uma vez só):

1. Crie uma conta em [resend.com](https://resend.com) **com o e-mail que vai receber as mensagens**.
2. Em **API Keys**, crie uma chave (permissão “Sending access”) e copie.
3. Na Vercel, em **Settings → Environment Variables**, adicione:
   - `RESEND_API_KEY` = a chave copiada
   - `CONTACT_TO_EMAIL` = o e-mail que recebe as mensagens (o mesmo da conta do Resend)
4. Em **Deployments**, abra o último deploy e clique em **Redeploy** para valer.

Sem domínio próprio, o Resend só entrega para o e-mail da própria conta, e o remetente aparece
como `onboarding@resend.dev`. Com um domínio verificado no Resend, defina também
`CONTACT_FROM_EMAIL` (ex.: `Portfólio <contato@seudominio.com>`).

A função só roda na Vercel; no `npm run dev` o envio mostra a mensagem de erro do formulário.

## Publicar na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório do GitHub.
2. A Vercel detecta o Vite sozinha (build `npm run build`, saída `dist`).
3. Cada `git push` na branch principal publica uma nova versão.

O arquivo `vercel.json` faz todas as rotas (ex.: `/sobre`) abrirem o app.
