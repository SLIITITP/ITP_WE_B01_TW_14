  import express from 'express'
  import {getUser, getDashboardStats,deleteCustomers,createCutomers ,updateCutomers} from "../controllers/general.js"
  import verifyJWT from '../middleware/verifyJWT.js'
const router = express.Router();
// router.use(verifyJWT)

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);
router.delete("/user/:id", deleteCustomers);
router.post('/', createCutomers ) 
router.put('/user/:id', updateCutomers ) 
export default router;