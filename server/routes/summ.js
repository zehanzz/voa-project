import express from "express";
import { summ } from "../controllers/summ.js";

const router = express.Router();

router.get("/:date", summ);

export default router;