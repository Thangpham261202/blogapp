import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../components/UserContext";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
function PostPage() {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) =>
      response.json().then((data) => {
        setPost(data);
      })
    );
    setLoading(false);
  }, []);
  async function deletePost() {
    const reponse = await fetch(`http://localhost:4000/post/${id}`, {
      method: "DELETE",
      body: id,
    });
    if (reponse.ok) {
      navigate("/");
    }
  }
  if (!post) {
    return <div></div>;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="post-page">
      <h2>{post.title}</h2>
      <div className="info">
        <a className="author" href="">
          Tác giả :{post.author.user}
        </a>
        <time>{format(new Date(post.createdAt), "HH:mm , dd-MM-YYY")}</time>
        {userInfo.id === post.author._id && (
          <Link to={`/edit/${post._id}`} className="edit">
            <BiEdit />
            Chỉnh sửa bài viết
          </Link>
        )}
        {userInfo.id === post.author._id && (
          <Link onClick={deletePost} className="delete">
            <RiDeleteBin6Fill />
            Xóa bài viết
          </Link>
        )}
      </div>
      <img src={"http://localhost:4000/" + post.cover} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default PostPage;
