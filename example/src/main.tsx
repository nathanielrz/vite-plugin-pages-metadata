import { useRoutes, BrowserRouter } from "react-router-dom";
import { MetadataProvider } from "vite-plugin-pages-metadata";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import routes from "~react-pages";
import "./index.css";
import { metadata } from "./metadata";

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
      <MetadataProvider metadata={metadata} routes={routes}>
        <App />
      </MetadataProvider>
    </BrowserRouter>
  </StrictMode>,
);
