// Bundles the blob runtime to a small script that loads before first paint.
import { build } from "esbuild";
await build({
  entryPoints: ["scripts/blob-runtime.js"],
  outfile: "public/blob.js",
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  logLevel: "warning",
});
