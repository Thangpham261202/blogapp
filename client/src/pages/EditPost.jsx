import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams, Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();
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
  const { id } = useParams();
  const [title, setTitle] = useState("chào");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) =>
      response.json().then((data) => {
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      })
    );
  }, []);
  async function editpost(e) {
    const data2 = new FormData();
    data2.set("id", id);
    data2.set("title", title);
    data2.set("summary", summary);
    data2.set("content", content);
    if (files?.[0]) {
      data2.set("file", files?.[0]);
    }
    console.log(data2.get("title"));
    e.preventDefault();
    const reponse = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data2,
      credentials: "include",
    });
    if (reponse.ok) {
      navigate(`/post/${id}`);
    }
  }
  return (
    <form className="form-post" onSubmit={editpost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        onChange={(e) => setContent(e)}
        modules={modules}
        value={content}
        formats={formats}
      ></ReactQuill>
      <button>Chỉnh sửa bài viết bài viết</button>
    </form>
  );
}

export default EditPost;
