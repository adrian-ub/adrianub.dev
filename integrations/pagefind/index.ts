import type { AstroIntegration } from "astro";

import { fileURLToPath } from "node:url";
import { dirname, relative } from "node:path";
import { spawn } from "node:child_process";

export function pageFind(): AstroIntegration {
  return {
    name: "pagefind",
    hooks: {
      "astro:build:done": ({ dir }) => {
        const targetDir = fileURLToPath(dir);
        const cwd = dirname(fileURLToPath(import.meta.url));
        const relativeDir = relative(cwd, targetDir);
        return new Promise<void>((resolve) => {
          spawn("npx", ["-y", "pagefind", "--site", relativeDir], {
            stdio: "inherit",
            shell: true,
            cwd,
          }).on("close", () => resolve());
        });
      },
    },
  };
}
