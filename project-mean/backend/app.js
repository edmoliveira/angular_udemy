const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');

const Post = require('./models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

mongoose.connect("mongodb://localhost:27017/project-mean").then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Database connection failed');
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, content-type, Accept"
  );
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

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

app.post('/api/posts', multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });

  post.save();

  res.status(201).json({
    message: 'Post added successfully',
    id: post._id,
    imagePath: post.imagePath
  })
});

app.put('/api/posts', multer({ storage: storage }).single("image"), (req, res, next) => {
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
    Post.updateOne({_id: req.body.id}, post)
      .then(() => {
        res.status(201).json({
          message: 'Post updated successfully',
          posts: null
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

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById({_id: req.params.id})
    .then(document => {
      res.status(200).json({
        message: 'Post obtained successfully',
        posts: document
      });
    });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.findById({_id: req.params.id})
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
        res.status(200).json({
          message: 'Post deleted successfully',
          posts: null
        });
      });
    });
  });
})

module.exports = app;
