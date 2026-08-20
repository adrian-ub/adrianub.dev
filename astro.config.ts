import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import nimbus, { defineConfig as defineNimbusConfig } from "@cloudflare/nimbus-docs";
import { tableScroll } from "@cloudflare/nimbus-docs/markdown";

const nimbusConfig = defineNimbusConfig({
  site: "https://adrianub.dev",
  title: "Adrián UB",
  description: "Portafolio de Adrián UB",
  locale: "es",
  github: "https://github.com/adrian-ub/adrianub.dev",
  editPattern:
		"https://github.com/adrian-ub/adrianub.dev/edit/main/{path}",
  socialImageAlt: "Portafolio de Adrián UB",
  sidebar: {
    items: [
      {
        label: "Blog",
        autogenerate: {
          collection: "posts",
        }
      },
      {
        label: "Notas",
        autogenerate: {
          collection: "notes",
        }
      }
    ]
  },
  homeLabel: "Inicio",
});

export default defineConfig({
  output: "static",
  // Tailwind v4 via its Vite plugin (the integration Astro recommends for
  // Tailwind v4 — replaces the PostCSS plugin, which doesn't build under
  // Astro 7's Vite 8 bundler).
  vite: {
    plugins: [tailwindcss()],
  },
  // Hover-prefetch link targets so full-page navigations feel instant without
  // a client-side router.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  integrations: [
    nimbus(nimbusConfig, {
      // Authoring rules are opt-in by design — your repo, your taste. The
      // two below are the load-bearing pair: frontmatter has to validate
      // against the content schema for the page to render properly, and
      // broken internal links are 404s for your readers. Add the others
      // (heading hierarchy, code-block language, style, etc.) when you're
      // ready to enforce them — see `nimbus-docs lint --help`.
      rules: {
        "nimbus/frontmatter-shape": "error",
        "nimbus/internal-link": "error",
      },
      // Wrap wide tables so they scroll instead of overflowing the page
      // (styled by `.nb-table-scroll` in src/styles/prose.css).
      markdown: {
        hastPlugins: [tableScroll()],
      },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: "--font-inter",
      weights: [100, 200, 300, 400, 500, 600, 700, 800],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: "--font-geist-mono",
    }
  ]
});
