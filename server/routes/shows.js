import express from "express";
import { shows, addShow, updateShow, deleteShow } from "../controllers/shows.js";

const router = express.Router();

router.get("/", shows);
router.post("/", addShow);
router.put("/:id", updateShow);
router.delete("/:id", deleteShow);

export default router;