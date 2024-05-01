interface Route {
  path: string;
  title?: string | null;
  description?: string | null;
  keywords?: string[] | null;
}

interface UserOptions {
  routeArray: Route[];
  outDir: string;
}

export { UserOptions, Route };
