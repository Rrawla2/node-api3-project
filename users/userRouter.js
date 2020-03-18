const express = require('express');
const Users = require("./userDb.js");
const Posts = require("./userDb.js");

const router = express.Router();

router.use((req, res, next) => {
  console.log("userRouter")
  next();
})

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params
  Users.getById(id)
    .then(user => {
      console.log(user)
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
    .then(user => {
      if(!user) {
        res.status(400).json({ message: "Missing User data" })
      } else if (!user.name) {
        res.status(400).json({ message: "Missing required name field"})
        next();
      }
      })
    .catch(err => {
      res.status(500).json({ error: "User could not be validated"})
    })
}

function validatePost(req, res, next) {
  // do your magic!

}

module.exports = router;
