import React, { useEffect, useState, lazy, Suspense } from "react";
import Loading from "../loading/loading";
import Post from "../components/post";
function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((data) => {
        setPosts(data);
      });
    });
    setLoading(false);
  }, []);
  const postReverse = [...posts].reverse();
  console.log(postReverse);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {postReverse.length > 0 &&
        postReverse.map((post) => (
          <Post key={post.id} post={post} />
          /*  <Suspense fallback={<div>Loading...</div>}>
          </Suspense> */
        ))}
    </>
  );
}

export default IndexPage;
