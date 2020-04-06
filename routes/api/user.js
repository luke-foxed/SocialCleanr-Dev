const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const { check, validationResult, oneOf } = require('express-validator');
const User = require('../../models/User');

/**
 * @route    POST api/user/update-basic
 * @desc     Update either user's email or avatar
 * @access   Private
 */

router.post('/game', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    let toggle = req.body.enabled;
    await user.update({
      $set: {
        is_gamification_enabled: toggle,
      },
    });

    res.status(200).json({ msg: 'Gamification updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Update Error' });
  }
});

/**
 * @route    POST api/user/update-basic
 * @desc     Update either user's email or avatar
 * @access   Private
 */

router.post(
  '/update-basic',
  auth,
  [
    oneOf([
      check('email').isEmail().withMessage('Please enter a valid email'),

      check('avatar').isURL().withMessage('Avatar must be a valid URL'),
    ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let { nestedErrors } = errors.errors[0];

      if (req.body.updateType === 'email') {
        return res.status(400).json({ errors: [nestedErrors[0]] });
      } else if (req.body.updateType === 'avatar') {
        return res.status(400).json({ errors: [nestedErrors[1]] });
      }
    }

    const { email, avatar } = req.body;

    try {
      let user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'No user found' }],
        });
      }

      if (req.body.updateType === 'email') {
        await user.update({
          $set: {
            email: email,
          },
        });
      } else if (req.body.updateType === 'avatar') {
        await user.update({
          $set: {
            avatar: avatar,
          },
        });
      }
      res.status(200).json({ msg: 'Account Updated' });
    } catch (err) {
      res.status(200).json({ msg: 'Error Updating Account' });
    }
  }
);

/**
 * @route    POST api/user/update-password
 * @desc     Update user password
 * @access   Private
 */

router.post(
  '/update-password',
  auth,
  [
    check(
      'password',
      'Please enter a password between 8 to 24 characters'
    ).isLength({ min: 8, max: 24 }),
    check(
      'password',
      'Password must contain at least one letter, special character and number'
    ).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{0,}$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { current_password, password } = req.body;

    try {
      let user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(current_password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Current Password Is Incorrect' }],
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await user.update({
        $set: {
          password: newPassword,
        },
      });

      res.status(200).json({ msg: 'Password Updated' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Update Error' });
    }
  }
);

/**
 * @route    DELETE api/user/delete
 * @desc     Delete user from DB
 * @access   Private
 */

router.delete('/delete', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ msg: 'Account Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Delete Error' });
  }
});

/**
 * @route    POST api/user/write-statistics
 * @desc     Write various usage stats to DB
 * @access   Private
 */

router.post('/write-statistics', auth, async (req, res) => {
  try {
    let count = req.body;

    Object.entries(count).forEach(async ([key, val]) => {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: {
          [`statistics.0.${key}`]: val || 0,
        },
      });
    });

    res.status(200).json({ msg: 'Stats written to DB' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Write Error' });
  }
});

router.post('/store-results', auth, async (req, res) => {
  try {
    let results = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        flagged_content: results,
      },
    });

    res.status(200).json({ msg: 'Stats written to DB' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Write Error' });
  }
});

router.post('/remove-content', auth, async (req, res) => {
  try {
    let contentID = req.body.content_id;

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { flagged_content: { content_id: contentID } },
    });

    res.status(200).json({ msg: 'Content Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Delete Error' });
  }
});

module.exports = router;
