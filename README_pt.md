# blog-nuxt

## 🎃 Olá, estranho

Parabéns — você encontrou uma joia escondida: um lugar onde pode ter um site inteiramente seu.

Escrever artigos, fazer anotações, compartilhar reflexões e sua bio — está tudo aqui, com um cantinho do céu digital só seu. 🌞

As pessoas chamam isso de “blog”, mas prefiro dar ao meu site um nome próprio: `Mood Town`. Para mim é mais uma pequena cidade — um recipiente para humores, pensamentos, experiências e criação. Cada artigo é uma casa; cada página, um canto; cada recurso, uma comodidade. Construí essa cidade com o coração e cuido dela com carinho. Espero que seja acolhedora e envolvente — um lugar onde as pessoas queiram ficar, conectar-se e compartilhar.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> |
  <a href="./README.md">English</a> |
  <a href="./README_ko.md">한국어</a> |
  <a href="./README_fr.md">Français</a> |
  <a href="./README_de.md">Deutsch</a> |
  <a href="./README_ja.md">日本語</a> |
  <a href="./README_ru.md">Русский</a> |
  <a href="./README_es.md">Español</a> |
  <strong>Português</strong> |
  <a href="./README_it.md">Italiano</a> |
  <a href="./README_vi.md">Tiếng Việt</a> |
  <a href="./README_ar.md">العربية</a>
</p>

![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3-F7C545?logo=pinia&logoColor=333)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Mock Ready](https://img.shields.io/badge/API-Mock%20Ready-0F172A)

Frontend de blog pessoal em Nuxt 4 com páginas de artigos, arquivo, sobre, cartas, página de chuva, formulário de assinatura, modo escuro, mídias locais e uma camada de API mock-first substituível por um backend real com pouco atrito.

Se o projeto ajudar, deixe uma estrela — facilita a descoberta e mantém o trabalho ativo.

## Visão geral do projeto

Este repositório é um template de blog orientado ao frontend e uma implementação de referência. Foca em:

- experiência de site pessoal com muito conteúdo e visuais próprios
- desenvolvimento mock-first e depois entrega ao backend
- carregamento de dados compatível com SSR Nuxt
- leitura de artigos, comentários, música, assinatura e páginas temáticas
- layouts para desktop e mobile

Rotas atuais:

- `/` início
- `/article` arquivo
- `/[articleId]` detalhe do artigo
- `/about` sobre
- `/envelope` cartas
- `/rain` dia de chuva
- `/subscribe` assinatura

## Destaques

- Arquitetura Nuxt 4 + Vue 3 + Pinia
- Modo escuro em página inteira
- Lista de artigos, detalhe, busca, filtros e “carregar mais”
- Markdown com destaque de sintaxe e mídia embutida
- Lista e envio de comentários
- Imagens locais, logo, avatar e mp3
- Contrato de API mock pensado para troca de backend
- Bootstrap SSR das informações do site para título e meta

## Capturas de tela

### Início

![Home](./docs/screenshots/index.jpg)

### Início escuro

![Home Dark](./docs/screenshots/index-dark.jpg)

### Variante 1

![Home Variant 1](./docs/screenshots/index-1.jpg)

### Variante 2

![Home Variant 2](./docs/screenshots/index-2.jpg)

### Variante 3

![Home Variant 3](./docs/screenshots/index-3.jpg)

### Variante 4

![Home Variant 4](./docs/screenshots/index-4.jpg)

### Variante 5

![Home Variant 5](./docs/screenshots/index-5.jpg)

### Arquivo

![Archive](./docs/screenshots/article.jpg)

### Arquivo escuro

![Archive Dark](./docs/screenshots/article-dark.jpg)

### Detalhe do artigo

![Article Detail](./docs/screenshots/articleInfo.jpg)

### Detalhe do artigo escuro

![Article Detail Dark](./docs/screenshots/articleInfo-dark.jpg)

### Sobre

![About](./docs/screenshots/about.jpg)

### Sobre escuro

![About Dark](./docs/screenshots/about-dark.jpg)

### Chuva

![Rain](./docs/screenshots/rain.jpg)

### Assinatura

![Subscribe](./docs/screenshots/subscribe.jpg)

## Stack tecnológica

- Nuxt 4
- Vue 3
- Pinia
- TypeScript
- SCSS
- `@nuxtjs/color-mode`
- `marked`
- `highlight.js`
- `viewerjs`
- `parallax-js`

## Estrutura do projeto

```text
blog-nuxt
├── assets/              # Estilos globais, fontes, variáveis de tema
├── components/          # UI compartilhada: Header, Footer, Comment, ArticleContent
├── composables/         # Wrappers de API e cliente HTTP
├── config/              # Constantes e helpers de configuração
├── docs/                # Docs da API, capturas, material de handoff
├── layouts/             # Layouts Nuxt
├── mixin/               # Mixins legados ainda usados em algumas páginas
├── mock/                # Dados mock locais e handlers
├── pages/               # Páginas de rotas Nuxt
├── plugins/             # Bootstrap do app e comportamento em runtime
├── public/              # Ativos estáticos públicos, imagens, áudio, logos
├── server/              # Extensões de servidor quando necessário
├── stores/              # Stores Pinia
├── types/               # Tipos compartilhados de API e app
└── utils/               # Helpers de assets e imagens, utilitários
```

## Desenvolvimento local

### Instalação

```bash
npm install
```

### Servidor de desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Visualizar build de produção

```bash
npm run preview
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste:

```env
NUXT_PUBLIC_USE_MOCK=true
NUXT_PUBLIC_API_BASE_URL=http://localhost:7001
```

Significado:

- `NUXT_PUBLIC_USE_MOCK=true`: handlers mock locais em `mock/index.ts`
- `NUXT_PUBLIC_USE_MOCK=false`: chamar o backend real
- `NUXT_PUBLIC_API_BASE_URL`: apenas o host do backend, sem `/api/v1`

## Integração com o backend

O projeto já está estruturado para handoff. Processo recomendado:

1. Implementar a API documentada em [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md) ou [`docs/api.md`](./docs/api.md).
2. Manter caminhos e nomes de campos iguais.
3. Retornar o envelope padrão `{ code, message, data }`.
4. Sempre incluir `pagination.total` em listas.
5. Quando o backend estiver pronto: `NUXT_PUBLIC_USE_MOCK=false`.
6. Apontar `NUXT_PUBLIC_API_BASE_URL` para o host do backend.

Notas importantes:

- `composables/http.ts` concatena `baseUrl + path`; `NUXT_PUBLIC_API_BASE_URL` deve ser algo como `http://localhost:7001`.
- Para evitar mudanças no frontend, erros de negócio podem vir em HTTP `200` com JSON `code` e `message`.
- Avatares de comentário são nomes de arquivo locais como `3.jpg`, resolvidos para `/image/comment/3.jpg`.
- A página de detalhe renderiza principalmente `mdcontent`.

## Documentos de API

- Contrato em chinês: [`docs/API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Contrato em inglês: [`docs/api.md`](./docs/api.md)

## Camada Mock

O mock não é um extra só para demo: é a fonte de contrato atual para o backend real:

- handlers: [`mock/index.ts`](./mock/index.ts)
- wrapper tipado de API: [`composables/api.ts`](./composables/api.ts)
- tipos de resposta: [`types/api.ts`](./types/api.ts)

Se o backend seguir esses contratos, o frontend pode desligar o mock com segurança.

## Licença, uso e isenção de responsabilidade

Publicado sob a licença MIT — veja [`LICENSE`](./LICENSE).

- Compartilhado principalmente para aprendizado, pesquisa e referência técnica.
- Não use o projeto para atividades ilegais, fraudulentas, invasivas ou prejudiciais.
- Antes de implantação pública ou comercial, substitua conteúdo pessoal, informações legais, marca, mídia e recursos de terceiros por material conforme.
- O software é fornecido “como está”, sem garantias. Conformidade, operação e proteção de dados são de sua responsabilidade.
