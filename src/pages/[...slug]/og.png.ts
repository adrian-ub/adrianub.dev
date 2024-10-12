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
  const logo = await fs.readFile(path.resolve('src/assets/profile.png'))

  const html = {
    type: 'div',
    props: {
      style: {
        backgroundColor: '#0D0F14',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        height: '100%',
        fontSize: '2rem',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      children: [
        {
          type: 'img',
          props: {
            style: {
              position: 'absolute',
              top: '1.5rem',
              borderRadius: '50%',
            },
            width: '80',
            src: logo.buffer,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-3.5rem',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '26px',
              paddingBottom: '24px',
              width: '90%',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '4rem',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap',
                  },
                  children: props.entry.data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    marginTop: '6px',
                    fontSize: '2rem',
                    color: '#b3b3b3',
                    whiteSpace: 'pre-wrap',
                    textAlign: 'center',
                  },
                  children: props.entry.data.description,
                },
              },
            ],
          },
        },
        {
          type: 'p',
          props: {
            style: {
              position: 'absolute',
              bottom: '0',
              borderBottom: '2px solid white',
              fontSize: '26px',
            },
            children: 'adrianub.dev',
          },
        },
      ],
    },
  }

  return new ImageResponse(html)
}
