import BulletList from "@/components/ui/bullet/BulletList.astro";
import BulletListItem from "@/components/ui/bullet/BulletListItem.astro";
import Browser from "@/components/ui/Browser.astro";
import ExternalLink from "@/components/post/ExternalLink.astro";

export const components = {
  BulletList,
  BulletListItem,
  Browser,
  a: ExternalLink,
};
