interface Route {
  path: string;
  title?: string | null;
  description?: string | null;
}

interface UserOptions {
  routeArray: Route[];
  outDir: string;
}

export { UserOptions, Route };
