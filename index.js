const cluster = require("cluster");
const crypto = require("crypto");
const Worker = require("worker_threads").Worker;
process.env.UV_THREADPOOL_SIZE = 1;

//is file running in master mode (initial boot)

//im a child, im going to act like a server and do nothing else
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  //define what worker should to do when send data
  const worker = new Worker(function () {
    //we're using this so this refers to the onmessage prop within the scope
    //this function is called
    //if we used arrow function it would refer to scope where it was created
    //perform computationally heavy work
    this.on("message") = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      //communicates work back to main app
      postMessage(counter);
    };
  });
  //whenever worker sends message back to app, the below will be called
  worker.on("message") = function (myCounter) {
    console.log(myCounter);
  };
  //send function to worker
  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(4000);
