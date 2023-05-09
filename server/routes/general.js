const express = require('express');
const {
  getUser,
  getDashboardStats,
  deleteCustomers,
  createCutomers,
  updateCutomers
} = require('../controllers/general.js');
const verifyJWT = require('../middlewares/verifyJWT.js');

const router = express.Router();
// router.use(verifyJWT)

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.delete("/user/:id", deleteCustomers);
router.post('/', createCutomers ) 
router.put('/user/:id', updateCutomers ) 

module.exports = router;