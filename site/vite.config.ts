import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  resolve: { dedupe: ["react", "react-dom"] },
  // Found late otherwise, which makes Vite re-optimize mid-load and hand out a second copy of React.
  optimizeDeps: { include: ["@portabletext/react", "react-medium-image-zoom", "@vercel/speed-insights/react"] },
});
