const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");

const app = express();

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
    'Access-Control-Allow-Headers','Authorization,Origin, X-Requested-With, content-type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");

  next();
});

app.use('/api/posts', postsRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
