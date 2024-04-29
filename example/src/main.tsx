import {
  useRoutes,
  BrowserRouter,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import { StrictMode, Suspense, useEffect, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { metadata } from "./metadata";
import routes from "~react-pages";
import "./index.css";

function MetadataProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    const route = matchRoutes(routes, location.pathname);
    if (route && metadata) {
      const path = route[0].route.path;
      const meta = metadata.find(
        (route: { path: string; title: string }) => route.path == path,
      );
      if (meta) {
        document.title = meta.title;
      } else {
        const path_ = location.pathname.startsWith("/")
          ? location.pathname.substring(1, location.pathname.length)
          : location.pathname;
        const meta_ = metadata.find(
          (route: { path: string | null }) => route.path == path_,
        );

        if (meta_) {
          document.title = meta_.title;
        } else {
          document.title = "404";
        }
      }
    }
  }, [location, metadata]);

  return <>{children}</>;
}

function App() {
  return (
    <Suspense
      fallback={
        <>
          <p>Processing page...</p>
          <svg
            width="24"
            height="24"
            stroke="#555"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="spinner_V8m1">
              <circle
                cx="12"
                cy="12"
                r="9.5"
                fill="none"
                strokeWidth="3"
              ></circle>
            </g>
          </svg>
        </>
      }
    >
      {useRoutes(routes)}
    </Suspense>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MetadataProvider>
        <App />
      </MetadataProvider>
    </BrowserRouter>
  </StrictMode>,
);
