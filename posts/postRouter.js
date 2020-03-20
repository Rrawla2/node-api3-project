const express = require('express');
const Posts = require("./postDb");
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Posts.get()
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({ error: "The posts could not be retrieved" })
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.getById(id)
    .then(post => {
      console.log("Post", post)
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(400).json({ message: "User Post not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User Post could not be validated" })
    })
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Posts.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json({ message: "The Post has been removed" })
      } else {
        res.status(404).json({ message: "The Post could not be found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error removing the Post" })
    })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const updates = req.body
  Posts.update(id, updates)
    .then(post=> {
      if(post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The Post could not be found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error saving Post updates" })
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Posts.getById(id)
    .then(post => {
      console.log("Post", post)
      if (post) {
        next();
      } else {
        res.status(400).json({ message: "User Post not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User Post could not be validated" })
    })
}

module.exports = router;
