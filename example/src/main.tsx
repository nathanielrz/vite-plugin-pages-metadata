import {
  useRoutes,
  BrowserRouter,
  useLocation,
  matchRoutes,
} from "react-router-dom";
import { StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import routes from "~react-pages";
import "./index.css";

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
      <App />
    </BrowserRouter>
  </StrictMode>
);
