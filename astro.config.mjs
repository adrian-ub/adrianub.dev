// @ts-check
import { defineConfig } from 'astro/config'

import autoImport from 'astro-auto-import'
import vitesse from 'astro-vitesse'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://adrianub.dev',
  integrations: [
    UnoCSS(),
    vitesse({
      title: 'Adrián UB',
      description: 'Portafolio de Adrián UB',
      defaultLocale: 'root',
      locales: {
        root: {
          lang: 'es',
          label: 'Español',
        },
      },
      logo: {
        replacesTitle: true,
        alt: 'Adrián UB',
        dark: './src/assets/logo-dark.svg',
        light: './src/assets/logo-light.svg',
      },
      social: {
        github: 'https://github.com/adrian-ub',
        twitter: 'https://twitter.com/adrianub',
        mastodon: 'https://mastodon.social/@adrianub',
      },
      navBar: [
        {
          label: 'Blog',
          slug: 'posts',
          icon: 'i-ri-article-line',
          labelClass: 'lt-md:hidden',
          iconClass: 'md:hidden',
        },
        {
          label: 'Proyectos',
          slug: 'projects',
          icon: 'i-ri-lightbulb-line',
          labelClass: 'lt-md:hidden',
          iconClass: 'md:hidden',
        },
        {
          label: 'Patrocinadores',
          slug: 'sponsors-list',
          icon: 'i-ri-heart-line',
          labelClass: 'lt-md:hidden',
          iconClass: 'md:hidden',
        },
        {
          label: 'Twitter',
          link: 'https://twitter.com/adrianub',
          hideLabel: true,
          icon: 'i-ri-twitter-x-fill',
          wrapperClass: 'lt-md:hidden',
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        },
        {
          label: 'GitHub',
          link: 'https://github.com/adrian-ub/astro-vitesse',
          hideLabel: true,
          icon: 'i-uil-github-alt',
          wrapperClass: 'lt-md:hidden',
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        },
        {
          label: 'RSS',
          link: '/rss.xml',
          hideLabel: true,
          icon: 'i-la-rss-square',
          wrapperClass: 'lt-md:hidden',
          attrs: {
            target: '_blank',
            rel: 'noopener',
            style: 'font-size:1.25rem; margin: 0 -0.125rem;',
          },
        },
      ],
      subNavBar: [
        {
          label: 'Blog',
          slug: 'posts',
        },
        {
          label: 'Notas',
          slug: 'notes',
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
        Head: './src/components/astro-vitesse/Head.astro',
      },
    }),
    autoImport({
      imports: [
        'astro-vitesse/components/ListPosts.astro',
        'astro-vitesse/components/SubNav.astro',
        './src/components/LinkWithIcon.astro',
        './src/components/BulletList.astro',
        './src/components/BulletListItem.astro',
        './src/components/SponsorButton.astro',
      ],
    }),
  ],
})
