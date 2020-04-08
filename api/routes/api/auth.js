const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

/**
 * @route    GET api/auth/
 * @desc     Authenticates user and returns selected DB values
 * @access   Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .select('-twitter_token')
      .select('-twitter_token_secret')
      .select('-facebook_token');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route    POST api/auth-passport/login
 * @desc     Finds matching user in DB and returns JWT on success
 * @access   Public
 */

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        console.log('NO USER FOUND');
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log('PASSWORD NOT MATCH');
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

/**
 * @route    POST api/auth-passport/register
 * @desc     Creates new user and generates JWT on success
 * @access   Public
 */

router.post(
  '/register',
  [
    check('name', 'Please provide a name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password between 8 to 24 characters'
    ).isLength({ min: 8, max: 24 }),
    check(
      'password',
      'Password must contain at least one letter, special character and number'
    ).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$/)
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'This User already exists, try logging in' }]
        });
      }

      // generate random number for random avatar
      let randNum = Math.floor(Math.random() * 11);
      let colors = ['63db83', '63c1db', 'db63ab', 'dbaf63'];
      let randCol = colors[Math.floor(Math.random() * colors.length)];

      let avatar = `https://api.adorable.io/avatars/face/eyes${randNum}/nose${randNum}/mouth${randNum}/${randCol}/300`;

      user = new User({
        name,
        email,
        password,
        avatar,
        statistics: [
          {
            custom_scans: 0,
            automated_scans: 0,
            images_cleaned: 0,
            flagged_text: 0,
            flagged_age: 0,
            flagged_clothing: 0,
            flagged_gesture: 0
          }
        ]
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
