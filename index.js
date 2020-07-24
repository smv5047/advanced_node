const cluster = require("cluster");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1;

//is file running in master mode (initial boot)
if (cluster.isMaster) {
  //if so, fork it

  cluster.fork();
  cluster.fork();

  //if not execute code
} else {
  //im a child, im going to act like a server and do nothing else
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(4000);
}
