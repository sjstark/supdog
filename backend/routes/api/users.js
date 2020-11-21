const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//
// ─── MIDDLEWARE FUNCTIONS ───────────────────────────────────────────────────────
//

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters in length.')
    .not()
    .isEmail()
    .withMessage('First name cannot be an email.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters in length.')
    .not()
    .isEmail()
    .withMessage('Last name cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

//
// ─── SIGN UP ────────────────────────────────────────────────────────────────────
//
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, firstName, lastName, image} = req.body;

    let profilePicURL = null;
    if (image) profilePicURL = image;

    const user = await User.signup({ email, username, password, firstName, lastName, profilePicURL  });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

module.exports = router
