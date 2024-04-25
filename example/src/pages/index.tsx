import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h2>vite-plugin-pages-metadata</h2>
      <p>
        The perfect package when it comes to rendering metadata aside with
        vite-plugin-pages. <Link to="/about">Learn more...</Link>
      </p>
      <div className="btn-container">
        <a href="https://www.github.com/nathanielrz/vite-plugin-pages-metadata">
          <button>GitHub</button>
        </a>
        <a href="https://www.npmjs.com/package/vite-plugin-pages-metadata">
          <button>npm</button>
        </a>
      </div>
    </>
  );
}
