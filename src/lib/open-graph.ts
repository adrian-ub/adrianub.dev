import sharp from "sharp";
import { SITE_TITLE } from "./consts";
import { readFile } from "node:fs/promises";
import satori, { type SatoriOptions } from "satori";
import type { CollectionEntry } from "astro:content";

import { ImageResponse } from "@vercel/og";

export type OgData = CollectionEntry<"blog">;

/**
 * Opengraph template to generate svg
 */
const Template = ({
  title,
  image = "https://github.com/adrian-ub.png",
}: {
  title: string;
  date: Date;
  image?: string;
}) => {
  const html = {
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
                  src: image,
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
                  children: title,
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
                  tw: "text-blue-600 text-3xl",
                  style: {
                    fontFamily: "PlusJakartaSans",
                  },
                  children: "Dzmitry Kozhukh",
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
      tw: "w-full h-full flex items-center justify-center relative px-22 bg-gray-900",
      style: {
        fontFamily: "JetBrainsMono",
      },
    },
  };

  return html;
};

/**
 * generate opengraph image with satori and return a buffer
 *
 * @param text
 */
const generateOgImage = async (
  text: string = SITE_TITLE,
  date: Date = new Date()
) => {
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

  return new ImageResponse(Template({ title: text, date }), options);
};

export default generateOgImage;
