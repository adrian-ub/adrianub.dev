import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import { rehypeGithubAlerts, rehypeReadingTime } from "./plugins";

import expressiveCode, { pluginFramesTexts } from "astro-expressive-code";

pluginFramesTexts.overrideTexts("es", {
    copyButtonCopied: "¡Copiado!",
    copyButtonTooltip: "Copiar al portapapeles",
    terminalWindowFallbackTitle: "Ventana de terminal",
});

export default defineConfig({
    site: "https://adrianub.dev/",
    integrations: [
        expressiveCode({
            defaultLocale: 'es',
            themes: [
                "vitesse-light",
                "vitesse-dark",
            ],
            useDarkModeMediaQuery: false,
            themeCssSelector: (theme) => {
                if (theme.type === "light") {
                    return false;
                }
                return ".dark";
            }
        }),
        mdx(),
        sitemap(),
        UnoCSS({
            injectReset: true,
        }),
    ],
    redirects: {
        "/blog/bordes-rellenables-con-tailwindcss":
            "/posts/bordes-rellenables-con-tailwindcss",
        "/blog/combinando-multiples-flujos-http-con-rxjs-observables-en-angular":
            "/posts/combinando-multiples-flujos-http-con-rxjs-observables-en-angular",
        "/blog/como-usar-tailwindcss-v2-en-laravel-8":
            "/posts/como-usar-tailwindcss-v2-en-laravel-8",
        "/blog/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular":
            "/posts/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular",
        "/blog/desplegar-nestjs-en-detash": "/posts/desplegar-nestjs-en-detash",
        "/blog/refactorizacion-guard-clauses":
            "/posts/refactorizacion-guard-clauses",

        "/bordes-rellenables-con-tailwindcss":
            "/posts/bordes-rellenables-con-tailwindcss",
        "/combinando-multiples-flujos-http-con-rxjs-observables-en-angular":
            "/posts/combinando-multiples-flujos-http-con-rxjs-observables-en-angular",
        "/como-usar-tailwindcss-v2-en-laravel-8":
            "/posts/como-usar-tailwindcss-v2-en-laravel-8",
        "/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular":
            "/posts/crear-controles-de-formulario-personalizados-usando-controlvalueaccessor-en-angular",
        "/desplegar-nestjs-en-detash": "/posts/desplegar-nestjs-en-detash",
        "/refactorizacion-guard-clauses": "/posts/refactorizacion-guard-clauses",
    },
    image: {
        remotePatterns: [
            {
                protocol: "https",
            },
        ],
    },
    markdown: {
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
            defaultColor: false,
            wrap: true,
        },
        rehypePlugins: [rehypeGithubAlerts, rehypeReadingTime],
    },
});
