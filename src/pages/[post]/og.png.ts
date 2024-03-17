import { type CollectionEntry } from "astro:content";
import { ImageResponse } from "@vercel/og";
import type { SatoriOptions } from "satori";
import { readFile } from "node:fs/promises";

import { posts } from "@/lib/post";
import { SITE_TITLE } from "@/lib/consts";

interface Props {
  params: { post: string };
  props: { post: CollectionEntry<"blog"> };
}

const Template = (post: Props["props"]["post"]) => ({
  type: "div",
  props: {
    children: [
      {
        type: "div",
        props: {
          tw: "w-[200px] h-[200px] flex rounded-3xl overflow-hidden",
          children: [
            {
              type: "img",
              props: {
                src: "https://github.com/adrian-ub.png",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          tw: "pl-10 shrink flex",
          children: [
            {
              type: "div",
              props: {
                style: {
                  fontSize: "48px",
                  fontFamily: "JetBrainsMono",
                },
                children: post.data.title,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          tw: "absolute right-[40px] bottom-[40px] flex items-center",
          children: [
            {
              type: "div",
              props: {
                tw: "text-3xl",
                style: {
                  fontFamily: "PlusJakartaSans",
                },
                children: SITE_TITLE,
              },
            },
            {
              type: "div",
              props: {
                tw: "px-2 text-3xl",
                style: {
                  fontSize: "30px",
                },
                children: "|",
              },
            },
            {
              type: "div",
              props: {
                tw: "text-3xl",
                children: "Blog",
              },
            },
          ],
        },
      },
    ],
    tw: "w-full h-full flex items-center justify-center relative px-22 text-gray-200",
    style: {
      backgroundImage: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
      fontFamily: "JetBrainsMono",
    },
  },
});

const options: SatoriOptions = {
  width: 1200,
  height: 627,
  embedFont: true,
  fonts: [
    {
      name: "JetBrainsMono",
      data: await readFile("./src/assets/font/JetBrainsMono-Bold.ttf"),
      weight: 600,
      style: "normal",
    },
    {
      name: "PlusJakartaSans",
      data: await readFile("./src/assets/font/PlusJakartaSans-Bold.ttf"),
      weight: 900,
      style: "normal",
    },
  ],
};

export async function GET({ props }: Props) {
  const { post } = props;

  return new ImageResponse(Template(post), options);
}

export async function getStaticPaths() {
  return posts
    .filter((post) => !post.data.heroImage)
    .map((post) => ({
      params: { post: post.slug },
      props: { post },
    }));
}
