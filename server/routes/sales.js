import express from "express";
import { getSales } from "../controllers/sales.js";
import verifyJWT from '../middleware/verifyJWT.js'
const router = express.Router();
// router.use(verifyJWT)
router.get("/sales", getSales);

export default router;