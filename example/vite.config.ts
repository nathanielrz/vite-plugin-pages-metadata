import { routePlugin, generateRoutes, Route } from "vite-plugin-pages-metadata";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";
import fs from "fs";

let routeArray: Route[] = [];

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      Pages({
        extendRoute(route) {
          if (route.path === "/") {
            return {
              ...route,
              meta: {
                title: "My website",
                description: "This is my awesome website",
              },
            };
          } else if (route.path == "about") {
            return {
              ...route,
              meta: {
                title: "About us",
              },
            };
          } else {
            return {
              ...route,
              meta: {
                title: "404",
              },
            };
          }
        },
        onRoutesGenerated(routes) {
          generateRoutes(routes, (route) => {
            routeArray.push({
              path: route.path,
              ...(route.meta &&
                route.meta.title && { title: route.meta.title }),
              ...(route.meta &&
                route.meta.description && {
                  description: route.meta.description,
                }),
            });
          });
          fs.writeFile(
            "public/metadata.json",
            JSON.stringify(routeArray, null, 2),
            (err) => {
              if (err) {
                fs.mkdir("public", () => {
                  fs.writeFileSync(
                    "public/metadata.json",
                    JSON.stringify(routeArray, null, 2)
                  );
                });
              }
            }
          );
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
