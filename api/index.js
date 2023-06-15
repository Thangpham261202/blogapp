const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/connect");
const Post = require("./model/post");
const User = require("./model/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = "fgdg4t43tge67";
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));
db.connect();
app.post("/register", async (req, res) => {
  const { user, password } = req.body;
  try {
    const userDoc = await User.create({
      user,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

//login

app.post("/login", async (req, res) => {
  const { user, password } = req.body;
  const useDoc = await User.findOne({ user });
  const passDoc = bcrypt.compareSync(password, useDoc.password);
  if (passDoc) {
    //login
    jwt.sign({ user, id: useDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: useDoc._id,
        user,
      });
    });
  } else {
    res.status(400).json("lỗi mật khẩu");
  }
});
//profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, decoded) => {
    if (err) throw err;
    res.json(decoded);
  });
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  console.log(req.file);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
    console.log(info);
  });
});
app.get("/post", async (req, res) => {
  res.json(await Post.find().populate("author", ["user"]));
});
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["user"]);
  res.json(postDoc);
});
app.put("/post", upload.single("file"), async (req, res) => {
  const { id, title, summary, content } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const postUpdateDoc = await Post.findOneAndUpdate(
      { _id: id },
      {
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      },
      { new: true }
    );
    res.json(postUpdateDoc);
  });
});
app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const post = await Post.findOneAndDelete({ _id: id });
  res.json(post);
});

app.listen(4000, () => {
  console.log("thành công chạy tại cổng 4000");
});
