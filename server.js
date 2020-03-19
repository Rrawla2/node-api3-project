const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>See what LOTR characters are posting here!</h2>`);
  
});
server.get('/', (req, res) => {
  res.send(`To see the list add /api/users to the url`)
})
//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`)
  next();
}

module.exports = server;
