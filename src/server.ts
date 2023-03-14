import express from "express";
import { createPost, createUser, deleteUser, getPost, getUser } from "./connect_sql";
require('dotenv').config();
import { clientUser, clientPost } from "./types/tableType";

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/wakuwaku", (req, res) => {
  res.send("wakuwaku");
});

app.post("/create-user", (req, res) => {
  const user = req.body as clientUser;
  console.log("user", user)
  createUser(user).then(() => {
    return res.json({  })
  })
});

app.get("/get-user", (req, res) => {
  getUser().then((users) => {
    const return_json = {
      data: users
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
  const post = req.body as clientPost
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

app.listen(port, () => {
  console.log("process.env.SQLPASS", process.env.SQLPASS,)
  console.log(`port ${port} でサーバー起動中`);
});