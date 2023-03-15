import express from "express";
import { createPost, createUser, deletePost, deleteUser, getOneUser, getPost, getUser } from "./connect_sql";
require('dotenv').config();
const multer = require('multer')
import { clientCreateUser, clientCreatePost, clientGetUser } from "./types/tableType";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTION"
  );
});

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/wakuwaku", (req, res) => {
  res.send("wakuwaku");
});

app.post("/create-user", (req, res) => {
  const user = req.body as clientCreateUser;
  console.log("user", user)
  createUser(user).then(() => {
    return res.json({})
  })
});

app.get("/get-all-user", (req, res) => {
  getUser().then((users) => {
    const return_json = {
      data: users
    }
    return (res.json(return_json))
  })
});

app.get("/get-user", (req, res) => {
  const uid = req.query.uid as string
  getOneUser(uid).then((user) => {
    const return_json = {
      data: user
    }
    return (res.json(return_json))
  })
});

app.post("/delete-user", (req, res) => {
  const { uid } = req.body
  deleteUser(uid).then((users) => {
    const return_json = {
      data: users
    }
    return (res.json(return_json))
  })
});

app.post("/create-post", (req, res) => {
  const post = req.body as clientCreatePost
  createPost(post).then(() => {
    getPost().then((post) => {
      const posts = post
      return (res.json(posts))
    })
  })
});



app.get("/get-post", (req, res) => {
  getPost().then((posts) => {
    const return_json = {
      data: posts
    }
    return (res.json(return_json))
  })
});

app.get("/get-random-post", (req, res) => {
  getPost().then((posts) => {
    const return_json = {
      data: posts
    }
    return (res.json(return_json))
  })
});

app.post("/delete-post", (req, res) => {
  const { post_id } = req.body
  deletePost(post_id).then((users) => {
    const return_json = {
      data: users
    }
    return (res.json(return_json))
  })
});

app.listen(port, () => {
  console.log("process.env.SQLPASS", process.env.SQLPASS,)
  console.log(`port ${port} でサーバー起動中`);
});