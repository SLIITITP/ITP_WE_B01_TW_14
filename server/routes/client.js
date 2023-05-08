import express from "express";
import verifyJWT from '../middleware/verifyJWT.js'
import {
  getProducts,
  getCustomers,
  getTransactions,
  
} from "../controllers/client.js";

const router = express.Router();

// router.use(verifyJWT)

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);

export default router;