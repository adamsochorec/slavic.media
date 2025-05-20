# Slavic Media

## Who?

Developed by [Adam Sochorec](https://www.linkedin.com/in/adamsochorec) with consultation from teachers at [EASV](https://www.easv.dk) as part of a Bachelor's project in Fall 2024.

## Why?

The previous PHP-based static website was outdated in terms of performance and scalability. It lacked integration with industry-standard tools and frameworks for deployment and testing.

## When?

Developed between September and December 2024, further developments and updates are on an ongoing basis.

## What?

A landing page for a creative multimedia studio, showcasing projects, industry-related knowledge, tips, and case studies. It also serves as a repository for client projects, mounted on platforms like [`clients.slavic.media`](https://clients.slavic.media) and [`store.slavic.media`](https://store.slavic.media) for digital product sales. Additionally, it functions as a lead-generation tool, establishing credibility and connecting with potential customers.

## How?

Built using modern, lightweight frameworks within and beyond the MEVN stack: MongoDB, Express.js, Vue.js (Nuxt), and Node.js, all written in TypeScript. The site includes [Tailwind CSS](https://tailwindcss.com) and [PrimeVue](https://www.primevue.org) components, supplemented by a custom component library aligned with the company brand identity. Some pages are dynamically rendered from a database, while others remain static. Images and videos are served via [Vimeo](https://vimeo.com) and [Cloudflare](https://www.cloudflare.com) CDNs. API documentation is auto-generated with [Swagger.io](https://swagger.io).

![Cover 1](https://github.com/user-attachments/assets/6155e6c6-2793-4161-af29-bc6317d47e4b)

| Feature  | URL                                                               |
| -------- | ----------------------------------------------------------------- |
| Frontend | [slavic.media](https://slavic.media)                              |
| API      | [api.slavic.media](https://api.slavic.media/docs)                 |
| CDN      | [cdn.slavic.media](https://cdn.slavic.media/img/thumbnail/public) |

## Documentation

To check out docs, visit [api.slavic.media/docs](https://api.slavic.media/docs/).

## Frontend Setup

```sh
cd frontend
yarn install ## Install Node
yarn dev ## Compile and Hot-Reload for Development
yarn build ## Type-Check, Compile and Minify for Production
```

## Backend Setup

```sh
cd backend
npm install ## Install Node
npm run dev ## Compile and Hot-Reload for Development
```

## API Setup

```sh
cd backend
npm run start-dev ## Compile and Hot-Reload for Development
```
