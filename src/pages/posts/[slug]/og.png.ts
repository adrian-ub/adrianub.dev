import type { CollectionEntry } from 'astro:content'
import svgTemplate from './_template.svg?raw'
import { getPosts } from '@/utils/posts'
import sharp from 'sharp'


export async function getStaticPaths() {
    const posts = await getPosts()
    return posts.map((post) => {
        return {
            params: { slug: post.slug },
            props: {
                post,
            },
        }
    })
}

export async function GET({ props: { post: { data: { title } } } }: {
    params: { slug: string },
    props: {
        post: CollectionEntry<'posts'>
    }
}) {
    const lines = title.trim().split(/(.{0,30})(?:\s|$)/g).filter(Boolean)

    const data: Record<string, string> = {
        line1: lines[0],
        line2: lines[1],
        line3: lines[2],
    }
    const svg = svgTemplate.replace(/\{\{([^}]+)\}\}/g, (_, name) => data[name] || '')



    return new Response(await sharp(Buffer.from(svg)).resize(1200 * 1.1, 630 * 1.1)
        .png().toBuffer())
}
