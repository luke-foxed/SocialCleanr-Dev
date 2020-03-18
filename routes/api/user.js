const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult, oneOf, body } = require('express-validator');
const User = require('../../models/User');

router.post(
  '/update',
  auth,
  [
    oneOf([
      check('email', 'Please include a valid email').isEmail(),

      check('password')
        .isLength({ min: 8, max: 24 })
        .withMessage(
          'Please enter a password between 8 to 24 characters containing  at least one letter, special character and number'
        )
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$/)
        .withMessage(
          'Password must contain at least one letter, special character and number'
        ),

      check('avatar')
        .isURL()
        .withMessage('Avatar must be a valid URL')
    ])
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //
      let { nestedErrors } = errors.errors[0];
      if (req.body.updateType === 'email') {
        return res.status(400).json({ errors: [nestedErrors[0]] });
      }

      if (req.body.updateType === 'password') {
        return res.status(400).json({ errors: [nestedErrors[1]] });
      }

      if (req.body.updateType === 'avatar') {
        return res.status(400).json({ errors: [nestedErrors[2]] });
      }
    }

    const { email, currentPassword, password, avatar } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'No user found' }]
        });
      }

      switch (req.body.updateType) {
        case 'password':
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({
              errors: [{ msg: 'Current Password Is Incorrect' }]
            });
          }

          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);

          await user.update({
            $set: {
              password: newPassword
            }
          });

          break;

        case 'email':
          await user.update({
            $set: {
              email: email
            }
          });

          break;

        case 'avatar':
          await user.update({
            $set: {
              avatar: avatar
            }
          });

          break;
      }
      res.send(200);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
