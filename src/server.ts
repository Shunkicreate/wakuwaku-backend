import express from "express";
import { createPost, createUser, getPost, getUser } from "./connect_sql";
require('dotenv').config();

const app: express.Express = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const port = process.env.PORT || 8080;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/wakuwaku", (req: express.Request, res: express.Response) => {
  res.send("wakuwaku");
});

app.post("/create-user", (req: express.Request, res: express.Response) => {
  console.log(req)
  console.log(req.body)
  const { name, profile_message } = req.body;
  createUser(name, profile_message)
  return res.json({name, profile_message})
});

app.get("/get-user", (req: express.Request, res: express.Response) => {
  getUser().then((users) => {
    console.log('accessed get-user')
    const return_json = {
      data: users
    }
    return(res.json(return_json))
  })
});

app.get("/create-post", (req: express.Request, res: express.Response) => {
  createPost().then(() => {
    getPost().then((res) => {
      const posts = res
      return posts
    })
  })
});

app.get("/get-post", (req: express.Request, res: express.Response) => {
  getPost()
});

app.listen(port, () => {
  console.log("process.env.SQLPASS", process.env.SQLPASS,)
  console.log(`port ${port} でサーバー起動中`);
});