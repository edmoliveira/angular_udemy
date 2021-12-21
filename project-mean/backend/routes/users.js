const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');
const https = require('https');

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
        axios
          .post(
            'https://localhost:44370/users/authentications/sign-in/1',
            {
              userNameOrEmail: user.email,
              password: user.password
            },
            {
              httpsAgent: new https.Agent({
                rejectUnauthorized: false
              })
            }
          )
          .then(resp => {
            const response = resp.data;

            if(response.wasAuthorized){

              const token = jwt.sign(
                { email: user.email, userId: user._id },
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
              );

              res.status(200).json({
                hasError: false,
                token: token,
                tokenHub: response.token,
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
          .catch(error => {
            res.status(401).json({
              hasError: true,
              message: "Authenthication failed"
            });
          })
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
