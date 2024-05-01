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

const pages: Route[] = [
  {
    path: "/",
    title: "My website",
    description: "This is my awesome website",
    keywords: ["Website", "Awesome"],
  },
  { path: "posts", title: "All posts" },
  { path: "*", title: "404" },
];

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      Pages({
        onRoutesGenerated() {
          generateRoutes(pages, (page) => {
            routeArray.push({
              path: page.path,
              ...(page && page.title && { title: page.title }),
              ...(page &&
                page.description && {
                  description: page.description,
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
