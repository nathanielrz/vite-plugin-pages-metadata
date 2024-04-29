import {
  routePlugin,
  generateRoutes,
  Route,
  createMetadata,
} from "vite-plugin-pages-metadata";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";
import posts from "./src/api/posts";

let routeArray: Route[] = [];

posts.map((post) => {
  return routeArray.push({
    path: `/post/${post.id}`,
    title: post.title,
    description: post.summary,
  });
});

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
          } else if (route.path == "posts") {
            return {
              ...route,
              meta: {
                title: "All Posts",
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
          createMetadata(routeArray);
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
