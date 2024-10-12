import rss from '@astrojs/rss'

import config from 'virtual:vitesse/user-config'
// eslint-disable-next-line antfu/no-import-node-modules-by-path
import { paths } from '../../node_modules/astro-vitesse/src/utils/routing'

export async function GET(context: { site: string }) {
  const posts = paths.filter(a => a.params.slug?.startsWith('posts/')).map(a => a.props.entry)
  return rss({
    title: config.title.es,
    description: `${config.title.es} Blog`,
    site: context.site,
    customData: `
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
      <title>${config.title.es}</title>
      <url>https://github.com/adrian-ub.png</url>
      <link>${context.site}</link>
    </image>
    <copyright>CC BY-NC-SA 4.0 2021 © ${config.title.es}</copyright>
    `,
    items: posts.map(post => ({
      title: post.data.title,
      author: config.title.es,
      description: post.data.description,
      pubDate: new Date(post.data.date!),
      link: post.slug,
    })),
  })
}
