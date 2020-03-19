const express = require('express');
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
const server = express();

server.use(express.json());
server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>See what LOTR characters are posting here!</h2><br /><h3>To see the list add /api/users to the url<h3>`);
  
});
server.get('/', (req, res) => {
  res.send(``)
})
//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`)
  next();
}

module.exports = server;
