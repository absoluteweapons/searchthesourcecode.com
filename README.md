# searchthesourcecode.com

This site is built with [Eleventy](https://www.11ty.dev/docs/) using the following stack:

- [Nunjucks](https://mozilla.github.io/nunjucks/) (Template language used in Eleventy)
- [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/) (Module bundler)

---

## Developing locally

### Install dependencies

```bash
npm install
```

### Run the site locally

```bash
npm run dev
```

## Commands

### Development

- `npm run webpack:dev`: Compiles Tailwind CSS and Typescript in development mode and listens for changes to CSS and TypeScript files
- `npm run eleventy:dev`: Spins up local environment of eleventy and listens for changes to Nunjucks files and other assets
- `npm run dev`: Concurrently runs `webpack:dev` and `eleventy:dev` to spin up local environment

### Production

- `npm run webpack:prod`: Compiles Tailwind CSS and Typescript ready for production
- `npm run eleventy:prod`: Compiles Nunjucks files ready for production
- `npm run build`: Command used to run `webpack:prod` and `eleventy:prod`
