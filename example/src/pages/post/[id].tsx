import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import posts from "../../api/posts";

export default function Post() {
  const [post, setPost] = useState<any | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const post = posts.find((post) => post.id == id);
    if (post) {
      setPost(post);
    }
  }, [id]);

  return (
    <>
      {post ? (
        <>
          <h2>Post - {post.title}</h2>
          <p>
            <b>Summary</b>: {post.summary}
          </p>
        </>
      ) : (
        <>
          <p>Post not found!</p>
        </>
      )}
    </>
  );
}
