const fs = require('fs');

const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const error = MIME_TYPE_MAP[file.mimetype] ? null : new Error('Incorrect mime type');

    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });

  post.save();

  Post.count()
    .then(count => {
      res.status(201).json({
        message: 'Post added successfully',
        id: post._id,
        imagePath: post.imagePath,
        total: count
      })
    });
});

router.put('', checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  let imgUrl = req.body.imagePath;
  let deletePath = null;

  if(imgUrl == null) {
    const url = req.protocol + '://' + req.get("host");

    imgUrl = url + "/images/" + req.file.filename;

    deletePath = url + '/';
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imgUrl
  });

  const funcUpdate = () => {
    Post.updateOne({_id: req.body.id, creator: req.userData.userId}, post)
      .then(() => {
        return Post.count();
      })
      .then(count => {
        res.status(201).json({
          message: 'Post updated successfully',
          id: post._id,
          imagePath: post.imagePath,
          total: count
        });
      });
  }

  if(deletePath != null) {
    Post.findById({_id: req.body.id})
    .then(document => {
      const filePath = 'backend/' + document.imagePath.replace(deletePath, '');

      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({
            message: 'Post was not updated!',
            posts: null
          });
        }

        funcUpdate();
      });
    });
  }
  else {
    funcUpdate();
  }
});

router.get('/:id', checkAuth, (req, res, next) => {
  console.log(req.userData.userId);
  Post.findById({_id: req.params.id, creator: req.userData.userId})
    .then(document => {
      res.status(200).json({
        message: 'Post obtained successfully',
        posts: document
      });
    });
});

router.get('', checkAuth, (req, res, next) => {
  const pageSize = parseInt(req.query.pagesize);
  const currentPage = parseInt(req.query.page);
  const postQuery = Post.find()

  let documents;

  if(pageSize > 0 && currentPage > 0) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery
    .then(docs => {
      documents = docs;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents,
        total: count,
        userId: req.userData.userId
      });
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
  Post.findById({_id: req.params.id, creator: req.userData.userId})
  .then(document => {
    const url = req.protocol + '://' + req.get("host") + '/';

    const filePath = 'backend/' + document.imagePath.replace(url, '');

    fs.unlink(filePath, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Post was not deleted!',
          posts: null
        });
      }

      Post.deleteOne({_id: req.params.id})
      .then(() => {
        return Post.count();
      })
      .then(count => {
        res.status(200).json({
          message: 'Post deleted successfully',
          posts: null,
          total: count
        });
      });
    });
  });
})

module.exports = router;
