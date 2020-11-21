const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//
// ─── SIGN UP ────────────────────────────────────────────────────────────────────
//
router.post(
  '',
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
