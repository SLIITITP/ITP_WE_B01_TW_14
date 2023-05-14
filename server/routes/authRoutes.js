const express = require ('express');
const router = express.Router();
const { login, refresh, logout } = require ('../controllers/authController.js');
const loginLimiter = require ('../middlewares/logginLimiter.js');

router.route('/')
  .post(loginLimiter, login);

router.route('/refresh')
  .get(refresh);

router.route('/logout')
  .post(logout);

  module.exports = router;
