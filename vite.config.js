import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const workspaceRoot = dirname(fileURLToPath(import.meta.url));
const buildOutputDir = resolve(workspaceRoot, "dist");
const legacyAssetsSourceDir = resolve(workspaceRoot, "app", "assets");

function copyLegacyAssets() {
  return {
    name: "copy-legacy-assets",
    closeBundle() {
      if (!existsSync(legacyAssetsSourceDir)) return;

      mkdirSync(buildOutputDir, { recursive: true });
      cpSync(legacyAssetsSourceDir, resolve(buildOutputDir, "assets"), {
        force: true,
        recursive: true
      });
    }
  };
}

export default defineConfig({
  root: "app",
  envDir: workspaceRoot,
  plugins: [react(), copyLegacyAssets()],
  build: {
    outDir: "../dist",
    emptyOutDir: true
  }
});
