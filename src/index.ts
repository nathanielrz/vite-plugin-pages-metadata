import fs from "fs";
import path from "path";
import type { UserOptions, Route } from "./types";
import MetadataProvider from "./components/MetadataProvider";
import prettier from "prettier";

let pages: UserOptions["routeArray"] = [];

function routePlugin({
  routeArray,
  outDir,
  command,
}: {
  routeArray: UserOptions["routeArray"];
  outDir: UserOptions["outDir"];
  command?: "build" | "serve";
}) {
  return {
    name: "vite-plugin-pages-metadata",
    closeBundle() {
      if (command === "build") {
        routeArray.forEach((route: Route) => {
          let filename;
          if (route.path == "/") {
            filename = "index.html";
          } else if (route.path == "*") {
            filename = "404.html";
          } else {
            filename = `${route.path}${
              route.path.substring(route.path.length - 5, route.path.length) ==
              ".html"
                ? ""
                : ".html"
            }`;
          }

          if (filename !== null) {
            pages.push({
              path: filename,
              ...(route.title ? { title: route.title } : { title: filename }),
              ...(route.description
                ? { description: route.description }
                : { description: "" }),
              ...(route.keywords
                ? { keywords: route.keywords }
                : { keywords: [] }),
            });
          }
        });
        setTimeout(() => {
          pages.sort((a, b) => {
            if (a.path == "index.html") return 1;
            if (b.path == "index.html") return -1;
            return 0;
          });
          pages.map((page: Route) => {
            const filePath = `${outDir ? outDir : "dist"}/${page.path}`;
            const template = fs.readFileSync(
              `${outDir ? outDir : "dist"}/index.html`,
              "utf8",
            );
            const generatedPage = template.replace(
              "<!-- metadata -->",
              `${page.title ? `<title>${page.title}</title>` : ""}${
                page.description
                  ? `\n    <meta name="description" content="${page.description}">`
                  : ""
              }${page.keywords && page.keywords.length > 0 ? `\n    <meta name="keywords" content="${page.keywords.join(", ")}" />` : ""}`,
            );
            const subdirectory = path.dirname(filePath);
            if (!fs.existsSync(subdirectory)) {
              fs.mkdirSync(subdirectory, { recursive: true });
            }
            fs.writeFileSync(filePath, generatedPage);
          });
        }, 1000);
        console.log("Build complete");
      }
    },
  };
}

function generateRoutes(
  routes: { path: string; children?: any }[],
  callback: (route: Route) => void,
) {
  routes.forEach((route) => {
    if (!route.children) {
      callback(route);
    } else if (
      route.children.path &&
      route.children.path.substring(0, 1) !== ":"
    ) {
      callback(route);
    }
  });
}

async function createMetadata(routeArray: Route[]) {
  routeArray.forEach((route) => {
    if (route.path.startsWith("/") && route.path !== "/") {
      route.path = route.path.substring(1);
    }
  });
  const data = prettier.format(
    `export const metadata = ${JSON.stringify(routeArray)}`,
    { parser: "typescript" },
  );
  fs.writeFile("src/metadata.ts", await data, (err) => {
    if (err) {
      fs.mkdir("src", async () => {
        fs.writeFileSync("src/metadata.ts", await data);
      });
    }
  });
}

export {
  routePlugin,
  generateRoutes,
  createMetadata,
  MetadataProvider,
  UserOptions,
  Route,
};
