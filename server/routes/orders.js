import express from "express";
import { orders } from "../controllers/orders.js";

const router = express.Router();

router.get("/", orders);

export default router;