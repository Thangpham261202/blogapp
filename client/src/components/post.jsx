import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Post({ post }) {
  return (
    <div className="post">
      <Link to={`/post/${post._id}`}>
        {<img src={"http://localhost:4000/" + post.cover} /> || <Skeleton />}
      </Link>

      <div className="texts">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/post/${post._id}`}
        >
          <h2>{post.title}</h2>
        </Link>
        <div className="info">
          <a className="author" href="">
            {post.author.user}
          </a>
          <time>{format(new Date(post.createdAt), "HH:mm , dd-MM-YYY")}</time>
        </div>
        <p className="summary">{post.summary}</p>
      </div>
    </div>
  );
}

export default Post;
