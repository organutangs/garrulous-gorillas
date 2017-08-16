const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/mongo');
const router = express.Router();

const User = require('../models/user');

router.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(422).json({
      success: false,
      msg: `Missing username/password`
    });
    return false;
  }
  
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  
  User.getUserByUsername(newUser.username, (err, user) => {
    if (err) throw err;
    if (user) {
      res.status(409).json({
        success: false,
        msg: `Username ${req.body.username} is not available`
      });
    } else {
      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: `Failed to register new user: ${newUser.username}`
          });
        } else if (user) {
          res.json({
            success: true,
            msg: `New user ${newUser.username} is registered`
          });
        }
      });
    }
  });
});

router.post('/login', (req, res) => {
  User.getUserByUsername(req.body.username, (err, user) => {
    if (err) throw err;
    if (user) {
      User.comparePassword(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          let token = jwt.sign({
            id: user._id,
            username: user.username
          }, config.secret, { expiresIn: '1h' });
          res.json({
            success: true,
            username: user.username,
            user_id: user._id,
            token: token
          });
        } else {
          res.status(401).json({
            success: false,
            msg: 'Wrong password'
          });
        }
      });
    } else {
      res.status(401).json({
        success: false,
        msg: `Username ${req.body.username} not found`
      });
    }
  });
});

router.get('/secret', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json('Secret path for authorized users');
});

module.exports = router;