const express = require('express');

const UserDb = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  UserDb.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({ message: "Error retrieving users." });
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  UserDb.getUserPosts(req.params.id)
  .then(posts => {
    if(posts){
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: `No posts found for ${req.user.name}.`});
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error retrieving posts." });
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware:

function validateUserId(req, res, next) {
  UserDb.getById(req.params.id)
  .then(thisUser => {
    if (thisUser) {
      req.user = thisUser;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error checking for user." });
  })
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" })
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
