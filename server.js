const express = require('express');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());

//middleware
server.use(logger);

//endpoint routers
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

//basic endpoint
server.get('/', (req, res) => {
  const message = process.env.MESSAGE || "API running locally.";
  res.status(200).json({ api: "up", message });
});

//custom middleware definitions

function logger(req, res, next) {
  console.log(`Method: ${req.method}\nRequest URL: ${req.originalUrl}\nTimestamp: ${Date.now()}`);
  next();
}

module.exports = server;
