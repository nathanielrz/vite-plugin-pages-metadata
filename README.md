# vite-plugin-pages-metadata

[![npm version](https://badgen.net/npm/v/vite-plugin-pages-metadata)](https://www.npmjs.com/package/vite-plugin-pages-metadata)
[![monthly downloads](https://badgen.net/npm/dm/vite-plugin-pages-metadata)](https://www.npmjs.com/package/vite-plugin-pages-metadata)
[![types](https://badgen.net/npm/types/vite-plugin-pages-metadata)](https://github.com/nathanielrz/vite-plugin-pages-metadata/blob/main/src/types.ts)

> unofficial vite-plugin-pages enhanced build

**For use**

Make sure you have the original plugin installed [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) for the route generation, everything is on us.

### Getting Started

Installation process.

```bash
npm install -D vite-plugin-pages
npm install -D vite-plugin-pages-metadata
```

### Vite config

Edit your `vite.config.ts`

```js
import { defineConfig } from "vite";
import { routePlugin } from "vite-plugin-pages-metadata";

let routeArray: {
  path: string,
  title: string,
  description?: string,
}[] = [];

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      Pages({
        // ...
        onRoutesGenerated: (routes) => {
          routes.forEach((route) => {
            const titles =
              route.path == "/"
                ? "Homepage"
                : route.path == "*"
                ? "404"
                : route.path == "about"
                ? "About us"
                : "Error";
            if (!route.children) {
              routeArray.push({
                path: route.path,
                title: titles,
                description: "",
              });
            } else if (
              route.children.path &&
              route.children.path.substring(0, 1) !== ":"
            ) {
              routeArray.push({
                path: route.path,
                title: titles,
              });
            }
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
```

### Dynamic routes

```js
// ...
import posts from "./src/api/posts";

let routeArray: {
  path: string,
  title: string,
  description?: string,
}[] = [];
posts.map((post) => {
  return routeArray.push({
    path: `/post/${post.id}`,
    title: post.title,
    description: post.summary,
  });
});

// ...
```

### routeArray

- **Type:** `Route[] or { path: string; title: string; description?: string; }`
- **Default:** `[]`

Connect your generated routes from vite-plugin-pages to the plugin.

### outDir

- **Type:** `string`
- **Default:** `dist`

The name where your build assets are stored after a build.

## License

MIT License © 2024 [Nathaiel](https://github.com/nathanielrz)
