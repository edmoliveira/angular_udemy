const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, content-type, Accept"
  );
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();

  res.status(201).json({
    message: 'Post added successfully',
    posts: null
  })
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
  Post.deleteOne({_id: req.params.id})
  .then(() => {
    res.status(200).json({
      message: 'Post deleted successfully',
      posts: null
    });
  });
})

module.exports = app;
