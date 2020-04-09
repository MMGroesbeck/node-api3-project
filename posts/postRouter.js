const express = require('express');

const PostDb = require('./postDb.js');

const router = express.Router();

// endpoints

router.get('/', (req, res) => {
  PostDb.get()
  .then(posts => {
    if (!posts) {
      res.status(404).json({ message: "No posts found." });
    } else {
      res.status(200).json(posts);
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error retrieving posts." });
  })
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  PostDb.remove(req.params.id)
  .then(count => {
    switch(count){
      case 0:
        res.status(500).json({ message: "Error: no post deleted." });
        break;
      case 1:
        res.status(200).json({ message: "Post deleted." });
        break;
      default:
        res.status(500).json({ message: "Error: multiple posts deleted." });
        break;
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error deleting post." })
  })
});

router.put('/:id', validatePostId, (req, res) => {
  PostDb.update(req.params.id, req.body)
  .then(count => {
    switch(count){
      case 0:
        res.status(500).json({ message: "Error: no post updated." });
        break;
      case 1:
        res.status(200).json({ message: "Post updated." });
        break;
      default:
        res.status(500).json({ message: "Error: multiple posts updated?" });
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error updating post." });
  })
});

// custom middleware

function validatePostId(req, res, next) {
  PostDb.getById(req.params.id)
  .then(thisPost => {
    if (thisPost) {
      req.post = thisPost;
      next();
    } else {
      res.status(404).json({ message: "invalid post id" });
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error checking for post." });
  })
}

module.exports = router;
