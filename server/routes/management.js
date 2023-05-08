import express from "express";
import { getAdmins ,getUserPerformance} from "../controllers/management.js";
import verifyJWT from '../middleware/verifyJWT.js'
const router = express.Router();
// router.use(verifyJWT)
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;