const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/sign-in", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user && bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign(
          { email: user.email, userId: user._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );

        res.status(200).json({
          hasError: false,
          token: token,
          expiresIn: 3600
        });
      }
      else {
        res.status(401).json({
          hasError: true,
          message: "Authenthication failed"
        });
      }
    })
    .catch(err => {
      return res.status(401).json({
        hasError: true,
        message: "Authenthication failed"
      });
    });
});

module.exports = router;
