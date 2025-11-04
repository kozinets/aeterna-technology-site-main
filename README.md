# Aeterna Technology Experience

The corporate landing experience for **Aeterna Technology** is built with [Next.js 14](https://nextjs.org/) and showcases a futuristic ecosystem spanning AI, networking, cryptography, biomedicine, robotics, and orbital infrastructure.

## Scripts

```bash
npm run dev     # start the development server
npm run build   # create a production build
npm run start   # run the production server
npm run lint    # static analysis with ESLint
```

## Structure

- `app/` – root layout and the primary landing page composition.
- `components/` – reusable UI blocks (Hero, Programs, Insights, AccessPortal, Header, Footer, MegaMenu).
- `app/globals.css` – global styles, CSS variables, and animation primitives.
- `tailwind.config.ts` – Tailwind configuration wired to the supplied color palette.

## Design Highlights

- Implements the mandated grayscale corporate palette with solid layering and motion accents.
- Mega navigation, animated hero sections, and modular content grids highlight the breadth of Aeterna Technology's portfolio.
- Access tiers, research highlights, and partnership messaging emphasize enterprise readiness and gated experiences.

## Installing Dependencies

Install packages using the standard command:

```bash
npm install
```

If Tailwind or PostCSS tooling fails to install in restricted environments, run the explicit developer dependency command:

```bash
npm install -D autoprefixer postcss tailwindcss
```

If the environment lacks access to `registry.npmjs.org`, configure a private registry mirror or offline cache before installing.
