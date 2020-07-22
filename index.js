const cluster = require("cluster");

//is file running in master mode (initial boot)
if (cluster.isMaster) {
  //if so, fork it

  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  //if not execute code
} else {
  //im a child, im going to act like a server and do nothing else
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000);
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(4000);
}
