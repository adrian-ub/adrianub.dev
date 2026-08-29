/**
 * MDX globals registry — components available inside MDX without `import`.
 * Wired via `<Content components={components} />` in `[...slug].astro`.
 * Add new components here as you build (or install) them.
 */

import { Aside } from "./components/ui/aside";
import { BaselineStatus } from "@astro-community/astro-embed-baseline-status";
import Render from "./components/Render.astro";
import { Card } from "./components/ui/card";
import { CardGrid } from "./components/ui/card-grid";
import { LinkCard } from "./components/ui/link-card";
import { LinkWithIcon } from "./components/ui/link-with-icon";
import { PackageManagers } from "./components/ui/package-managers";
import SocialLinks from "./components/SocialLinks.astro";
import SponsorButton from "./components/SponsorButton.astro";
import { Step, Steps } from "./components/ui/steps";
import { Tabs, TabItem } from "./components/ui/tabs";
import TilLanding from "./components/TilLanding.astro";

export const components = {
  Aside,
  BaselineStatus,
  Card,
  CardGrid,
  LinkCard,
  LinkWithIcon,
  PackageManagers,
  Render,
  SocialLinks,
  SponsorButton,
  Step,
  Steps,
  TabItem,
  Tabs,
  TilLanding,
};
