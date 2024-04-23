import fs from "fs";
import type { UserOptions, Route } from "./types";

let pages: UserOptions["routeArray"] = [];

export function routePlugin({
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
            fs.mkdirSync(`${outDir ? outDir : "dist"}/game`, {
              recursive: true,
            });
            const template = fs.readFileSync(
              `${outDir ? outDir : "dist"}/index.html`,
              "utf8"
            );
            const generatedPage = template.replace(
              "<!-- metadata -->",
              `${page.title ? `<title>${page.title}</title>` : ""}${
                page.description
                  ? `\n    <meta name="description" content="${page.description}">`
                  : ""
              }`
            );
            fs.writeFileSync(
              `${outDir ? outDir : "dist"}/${page.path}`,
              generatedPage
            );
          });
        }, 1000);
        console.log("Build complete");
      }
    },
  };
}
