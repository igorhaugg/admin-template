const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const validateRegister = require('../validation/register');
const validateLogin = require('../validation/login');
const User = require('../models/User');
const keys = require('../config/keys');

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const { errors, validation } = validateRegister(req.body);

  // Check validation
  if (!validation) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = 'Email already exists!';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          const user = await newUser.save();
          res.json(user);
        } catch (e) {
          console.log(e);
        }
      });
    });
  });
});

// @route   POST api/users/login
// @desc    Login user / returning jwt token
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { errors, validation } = validateLogin(req.body);

  // Check validation
  if (!validation) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found!';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 * 24 },
          (err, token) => {
            return res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        errors.password = 'Password incorrect!';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { id, email, name } = req.user;
    res.json({ id, email, name });
  }
);

module.exports = router;
