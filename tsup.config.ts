import { defineConfig } from "tsup";
import { raw } from "esbuild-raw-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  shims: true,
  clean: true,
  outDir: "dist",
  esbuildPlugins: [raw({ ext: [".js"] })],
});
