import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <h2>About us</h2>
      <p>
        This is a demonstration of what you can do with{" "}
        <Link to="https://github.com/nathanielrz/vite-plugin-pages-metadata">
          vite-plugin-pages-metadata
        </Link>
        , made in 5 minutes, it will work on development server and builds, it
        is completely static but on development it will use SSR. We highly
        recommend multi-page exports since it is supported by more website
        crawlers that can't read metadata properly.
      </p>
    </>
  );
}
