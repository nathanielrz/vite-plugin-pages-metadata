import { Link } from "react-router-dom";
import posts from "../api/posts";

export default function Posts() {
  return (
    <>
      <h2>All posts</h2>
      <p>A few posts as an example where the meta is used dynamically.</p>
      {posts.map(
        (post: { id: string; title: string; summary: string }, index) => {
          return (
            <div className="post-container">
              {index + 1}.
              <Link key={post.id} to={`/post/${post.id}`}>
                <div>
                  <h3>{post.title}</h3>
                </div>
              </Link>
            </div>
          );
        },
      )}
    </>
  );
}
