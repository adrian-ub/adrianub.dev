import type { InferGetStaticParamsType, InferGetStaticPropsType } from 'astro'
import fs from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from '@vercel/og'
// eslint-disable-next-line antfu/no-import-node-modules-by-path
import { paths } from '../../../node_modules/astro-vitesse/src/utils/routing'

export async function getStaticPaths() {
  return paths.map(({ params, props }) => {
    return { params, props }
  })
}

interface Props {
  params: InferGetStaticParamsType<typeof getStaticPaths>
  props: InferGetStaticPropsType<typeof getStaticPaths>
}

export async function GET({ props }: Props) {
  const logo = await fs.readFile(path.resolve('src/assets/logo-dark.png'))

  const html = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'black',
        color: 'white',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '40px',
              width: '50%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    position: 'relative',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    backgroundColor: 'black',
                    alignItems: 'center',
                    padding: '0.8rem',
                    borderRadius: '.375rem',
                    filter: 'drop-shadow(white -1px -1px 2px)',
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: logo.buffer,
                        style: {
                          filter: 'none',
                        },
                      },
                    },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    marginTop: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                  },
                  children: [
                    {
                      type: 'h1',
                      props: {
                        style: {
                          fontSize: '4rem',
                          fontWeight: 'bold',
                          marginBottom: '20px',
                        },
                        children: props.entry.data.title,
                      },
                    },
                    {
                      type: 'p',
                      props: {
                        style: {
                          fontSize: '1.8rem',
                          color: '#888',
                          lineHeight: '1.75rem',
                        },
                        children: props.entry.data.description || 'Artículos sobre Angular, NestJS, componentes web y más cosas relacionadas con el desarrollo web...',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // TODO: enable when configure cover image in frontmatter
        // {
        //   type: 'div',
        //   props: {
        //     style: {
        //       width: '50%',
        //       height: '100%',
        //       position: 'relative',
        //       overflow: 'hidden',
        //       display: 'flex',
        //     },
        //     children: [
        //       {
        //         type: 'div',
        //         props: {
        //           style: {
        //             position: 'absolute',
        //             top: 0,
        //             right: 0,
        //             bottom: 0,
        //             left: 0,
        //             transform: 'skew(-10deg) translateX(20%)',
        //             display: 'flex',
        //           },
        //           children: [
        //             {
        //               type: 'img',
        //               props: {
        //                 src: '',
        //                 style: {
        //                   position: 'absolute',
        //                   top: '0',
        //                   left: '30%',
        //                   width: '100%',
        //                   height: '100%',
        //                   objectFit: 'cover',
        //                 },
        //               },
        //             },
        //           ],
        //         },
        //       },
        //     ],
        //   },
        // },
      ],
    },
  }

  return new ImageResponse(html)
}
