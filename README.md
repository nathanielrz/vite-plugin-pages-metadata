# vite-plugin-pages-metadata

<a href="https://www.npmjs.com/package/vite-plugin-pages-metadata"><img src="https://badgen.net/npm/v/vite-plugin-pages-metadata" alt="version" /></a>
<a href="https://www.npmjs.com/package/vite-plugin-pages-metadata"><img src="https://badgen.net/npm/dm/vite-plugin-pages-metadata" alt="types" /></a>
<a href="https://github.com/nathanielrz/vite-plugin-pages-metadata/blob/main/src/types.ts"><img src="https://badgen.net/npm/types/vite-plugin-pages-metadata" alt="types" /></a>

> unofficial vite-plugin-pages enhanced build

**For use**

Make sure you have the original plugin installed [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) for the route generation, everything is on us.

Since we are in early release we only support title and description others like, favicon, author, or keywords aren't yet added, consider sending a pull request.

### Getting Started

Installation process.

```bash
npm install -D vite-plugin-pages
npm install -D vite-plugin-pages-metadata
```

### Index.html

Replace your current metadata with a comment similar to EJS.

Example of `index.html` located in the root directory.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/ico" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- metadata -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Vite config

Edit your `vite.config.ts`

```js
import { routePlugin, generateRoutes } from "vite-plugin-pages-metadata";
import { defineConfig } from "vite";

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
          generateRoutes(routes, (route) => {
            const metadata: { title: string, description?: string } = {
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

MIT License © 2024 [Nathaniel](https://github.com/nathanielrz)
