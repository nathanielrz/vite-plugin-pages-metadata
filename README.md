# vite-plugin-pages-metadata

[![npm version](https://badgen.net/npm/v/vite-plugin-pages-metadata)](https://www.npmjs.com/package/vite-plugin-pages-metadata)
[![monthly downloads](https://badgen.net/npm/dm/vite-plugin-pages-metadata)](https://www.npmjs.com/package/vite-plugin-pages-metadata)
[![types](https://badgen.net/npm/types/vite-plugin-pages-metadata)](https://github.com/nathanielrz/vite-plugin-pages-metadata/blob/main/src/types.ts)

> unofficial vite-plugin-pages enhanced build

**For use**

Make sure you have the original plugin installed [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) for the route generation, everything is on us.

We highly recommend that you keep viewports, and favicons global while title, description per-page. Right now keywords and author metas are not yet supported. Please consider creating a pull request.

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
<!doctype html>
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
import {
  routePlugin,
  generateRoutes,
  Route,
  createMetadata,
} from "vite-plugin-pages-metadata";
import react from "@vitejs/plugin-react";
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";

let routeArray: Route[] = [];

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      Pages({
        // ...
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
                title: "All posts",
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
```

### Dynamic routes

```js
// ...
import posts from "./src/api/posts";

let routeArray: Route[] = [];

posts.map((post) => {
  return routeArray.push({
    path: `/post/${post.id}`,
    title: post.title,
    description: post.summary,
  });
});

// ...
```

### Fast Refresh Support

Edit `src/main.tsx` or your entry file.

```js
// ...
import { useRoutes, useLocation, matchRoutes } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    const route = matchRoutes(routes, location.pathname);
    if (route) {
      const path = route[0].route.path;
      fetch("/metadata.json")
        .then((response) => response.json())
        .then((json) => {
          const metadata = json.find(
            (route: { path: string | undefined }) => route.path == path
          );
          document.title = metadata.title;
        });
    }
  }, [location]);
  // ...
}
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
