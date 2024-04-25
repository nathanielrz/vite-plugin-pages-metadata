import { routePlugin, generateRoutes } from "vite-plugin-pages-metadata";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";

let routeArray: {
  path: string;
  title: string;
  description?: string;
}[] = [];

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      Pages({
        onRoutesGenerated: (routes) => {
          generateRoutes(routes, (route) => {
            const metadata: { title: string; description?: string } = {
              ...(route.path == "/"
                ? {
                    title: "My website",
                    description: "This is my awesome website",
                  }
                : route.path == "about"
                ? { title: "About my website" }
                : { title: "404" }),
            };
            routeArray.push({
              path: route.path,
              title: metadata.title,
              ...(metadata.description && {
                description: metadata.description,
              }),
            });
          });
        },
      }),
      routePlugin({
        routeArray,
        outDir: "dist",
        command,
      }),
    ],
  };
});
