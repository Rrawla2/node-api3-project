const express = require('express');
const Users = require("./userDb.js");
const Posts = require("./userDb.js");

const router = express.Router();

router.use((req, res, next) => {
  console.log("userRouter")
  next();
})

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const  user = req.body 
  Users.insert(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding User"})
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = {...req.body, user_id: Number(req.params.id)}
    console.log("First New Post Text", newPost)
  Users.insert(newPost)
    .then(post => {
      if (newPost) {
        res.status(201).json(post)
      } else if (!newPost.text) {
        res.status(400).json({ message: "The text is missing from this post" })
      } else {
        res.status(404).json({ message: "Post with the specified ID does not exist" })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error saving the post" })
    })

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ error: "This user could not be retrieved" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUser, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.getUserPosts(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve User posts" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  Users.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json({ message: "The User has been removed" })
      } else {
        res.status(404).json({ message: "The User could not be found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was an error removing the User" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params
  const updates = req.body
  Users.update(id, updates)
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "The User could not be found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error saving User updates" })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      console.log("User", user)
      if (user) {
        req.user = user
        next();
      } else {
        res.status(400).json({ message: "User ID not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: "User ID could not be validated" })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body
      if(user) {
        next();
      } else if (!user) {
        res.status(400).json({ message: "Missing User data" })
      } else if (!user.name) {
        res.status(400).json({ message: "Missing required name field"})
      } else {
        res.status(500).json({ error: "User could not be validated"})
      }
}

function validatePost(req, res, next) {
  // do your magic!
  const { id } = req.params
  const body = req.body
  console.log("ID", id)
  console.log("validate body", body)
      if (body) {
        next();     
      } else if(!body || body === {}) {
        res.status(400).json({ message: "Missing the user data" })
      } else {
        res.status(500).json({ message: "Could not validate user" })
      }
}

module.exports = router;
