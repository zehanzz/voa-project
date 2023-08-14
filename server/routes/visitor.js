import express from "express";
import { visitors } from "../controllers/visitor.js";

const router = express.Router();

router.get("/", visitors);

export default router;