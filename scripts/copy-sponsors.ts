import fs from "node:fs/promises";
import path from "node:path";
import { hierarchy, pack } from "d3-hierarchy";

const TEMP = path.resolve("temp");
const SRC_DATA = path.resolve("src/data");
const SRC_ASSETS = path.resolve("src/assets/sponsors");

interface Sponsor {
  name: string;
  login: string;
  avatar: string;
  amount: number;
  link: string;
  org: boolean;
}

interface CircleSponsor extends Sponsor {
  id: string;
  radius: number;
  position: { x: number; y: number };
}

function lerp(a: number, b: number, t: number) {
  if (t < 0) return a;
  return a + (b - a) * t;
}

function generateCircles(sponsors: Sponsor[]): CircleSponsor[] {
  const amountMax = Math.max(...sponsors.map((s) => s.amount));
  const RADIUS_MIN = 8;
  const RADIUS_MAX = 300;

  const items = sponsors
    .filter((s) => s.amount > 0)
    .map((sponsor, idx) => ({
      id: `sponsor-${idx}`,
      radius: 0,
      position: { x: 0, y: 0 },
      ...sponsor,
    }));

  if (items.length === 0) return [];

  const root = hierarchy({ ...items[0], children: items, id: "root" })
    .sum((d: any) => 1 + lerp(RADIUS_MIN, RADIUS_MAX, (Math.max(0.1, d.amount || 0) / amountMax) ** 0.9))
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const p = pack<any>().size([500, 500]).padding(2);
  const circles = p(root).descendants().slice(1);

  for (const circle of circles) {
    const sponsor = items.find((s) => s.id === circle.data.id);
    if (sponsor) {
      sponsor.position = { x: circle.x, y: circle.y };
      sponsor.radius = circle.r;
    }
  }

  return items;
}

async function run() {
  // Read sponsors.json
  const sponsorsJson = path.join(TEMP, "sponsors.json");
  let sponsors: Sponsor[] = [];
  try {
    const raw = await fs.readFile(sponsorsJson, "utf-8");
    sponsors = JSON.parse(raw);
  } catch {
    console.warn("⚠ sponsors.json not found in temp/");
    return;
  }

  // Copy sponsors.json to src/data/
  await fs.mkdir(SRC_DATA, { recursive: true });
  await fs.copyFile(sponsorsJson, path.join(SRC_DATA, "sponsors.json"));
  console.log("✓ Copied sponsors.json → src/data/sponsors.json");

  // Generate and write sponsors-circles.json
  const circles = generateCircles(sponsors);
  await fs.writeFile(path.join(SRC_DATA, "sponsors-circles.json"), JSON.stringify(circles, null, 2));
  console.log("✓ Generated sponsors-circles.json");

  // Copy SVG and PNG files to src/assets/sponsors/
  await fs.mkdir(SRC_ASSETS, { recursive: true });
  const files = await fs.readdir(TEMP);
  const assets = files.filter((f) => f.endsWith(".svg") || f.endsWith(".png"));
  for (const file of assets) {
    await fs.copyFile(path.join(TEMP, file), path.join(SRC_ASSETS, file));
    console.log(`✓ Copied ${file} → src/assets/sponsors/${file}`);
  }
}

run();
