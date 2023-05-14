const express = require('express');
const { getAdmins, getUserPerformance } = require('../controllers/management.js');
const verifyJWT = require('../middlewares/verifyJWT.js');

const router = express.Router();
// router.use(verifyJWT)
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

module.exports = router;