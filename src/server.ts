import express from "express";
import { conn, queryDatabase } from "./connect_sql";
require('dotenv').config();

const app: express.Express = express();
const port = process.env.PORT || 8080;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, world!");
});

app.get("/wakuwaku", (req: express.Request, res: express.Response) => {
  res.send("wakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwakuwaku");
});

app.get("/connect", (req: express.Request, res: express.Response) => {
  conn.connect(
    function (err) {
      if (err) {
        console.log("!!! Cannot connect !!! Error:");
        console.log(err)
        // throw err;
      }
      else {
        console.log("Connection established.");
        queryDatabase();
      }
    });

  res.send("");
});

app.listen(port, () => {
  console.log("process.env.SQLPASS", process.env.SQLPASS,)
  console.log(`port ${port} でサーバー起動中`);
});