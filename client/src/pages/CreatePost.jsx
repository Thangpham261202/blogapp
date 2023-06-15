import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const navigate = useNavigate();
  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    console.log(data.getAll("file"));
    const reponse = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (reponse.ok) {
      navigate("/");
    }
  }

  return (
    <form className="form-post" onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="summary"
        placeholder="Summary"
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        onChange={(e) => setContent(e)}
        modules={modules}
        formats={formats}
      ></ReactQuill>
      <button>Tạo bài viết</button>
    </form>
  );
}

export default CreatePost;
