const express = require('express');
const  getSales  = require('../controllers/sales.js');
const verifyJWT = require('../middlewares/verifyJWT.js');
const router = express.Router();
// router.use(verifyJWT)
router.get("/sales", getSales);

module.exports = router;