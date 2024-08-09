import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import { rehypeGithubAlerts, rehypeReadingTime } from "./plugins";

export default defineConfig({
	site: "https://adrianub.dev/",
	integrations: [
		mdx(),
		sitemap(),
		UnoCSS({
			injectReset: true,
		}),
	],
	redirects: {
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
