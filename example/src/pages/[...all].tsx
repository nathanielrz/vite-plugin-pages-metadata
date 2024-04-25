import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <h1>404</h1>
      <p>We failed to find that page.</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
}
