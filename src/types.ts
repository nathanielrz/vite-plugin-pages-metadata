interface Route {
  path: string;
  title: string;
  description?: string;
}

interface UserOptions {
  routeArray: Route[];
  outDir: string;
}

export { UserOptions, Route };
