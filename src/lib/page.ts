import { getCollection } from "astro:content";

export const pages = await getCollection("pages");
