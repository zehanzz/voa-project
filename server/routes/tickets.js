import express from "express";
import { tickets, addTicket } from "../controllers/tickets.js";

const router = express.Router();

router.get("/", tickets);
router.post("/", addTicket);

export default router;