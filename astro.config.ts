import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import critters from "astro-critters";
import { expressiveCode, pageFind } from "./integrations";
import rehypeExternalLinks from "rehype-external-links";
import { rehypeGithubAlerts, rehypeReadingTime } from "./plugins";

// https://astro.build/config
export default defineConfig({
  site: "https://adrianub.dev",
  redirects: {
    "/blog/bordes-rellenables-con-tailwindcss":
      "/bordes-rellenables-con-tailwindcss",
    "/blog/combinando-multiples-flujos-http-con-rxjs-observables-en-angular":
      "/combinando-multiples-flujos-http-con-rxjs-observables-en-angular",
    "/blog/como-usar-tailwindcss-v2-en-laravel-8":
      "/como-usar-tailwindcss-v2-en-laravel-8",
    "/blog/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular":
      "/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular",
    "/blog/desplegar-nestjs-en-detash": "/desplegar-nestjs-en-detash",
    "/blog/refactorizacion-guard-clauses": "/refactorizacion-guard-clauses",
  },
  markdown: {
    rehypePlugins: [
      rehypeReadingTime,
      [
        rehypeGithubAlerts,
        {
          titles: {
            note: "Nota",
            tip: "Consejo",
            important: "Importante",
            warning: "Advertencia",
            caution: "Precaución",
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
          content: {
            type: "text",
            value: " ↗",
          },
        },
      ],
    ],
  },
  integrations: [
    expressiveCode(),
    UnoCSS({
      injectReset: true,
    }),
    icon(),
    mdx(),
    pageFind(),
    sitemap(),
    partytown(),
    critters(),
  ],
});
