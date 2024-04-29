import { ReactNode, useEffect } from "react";
import { useLocation, matchRoutes } from "react-router-dom";
import { Route } from "../types";

function MetadataProvider({
  children,
  routes,
  metadata,
}: {
  children: ReactNode;
  routes: any;
  metadata: Route[];
}) {
  const location = useLocation();

  useEffect(() => {
    const route = matchRoutes(routes, location.pathname);
    if (route) {
      const path = route[0].route.path;
      const meta = metadata.find((route) => route.path == path);
      if (meta && meta.title) {
        document.title = meta.title;
      } else {
        const path_ = location.pathname.startsWith("/")
          ? location.pathname.substring(1, location.pathname.length)
          : location.pathname;
        const meta_ = metadata.find(
          (route: { path: string | null }) => route.path == path_,
        );

        console.log(path_);

        if (meta_ && meta_.title) {
          document.title = meta_.title;
        } else {
          document.title = "404";
        }
      }
    }
  }, [location, metadata]);

  return <>{children}</>;
}

export default MetadataProvider;
