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
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware definitions

function logger(req, res, next) {
  console.log(`Method: ${req.method}\nRequest URL: ${req.originalUrl}\nTimestamp: ${Date.now()}`);
  next();
}

module.exports = server;
