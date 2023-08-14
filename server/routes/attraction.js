import express from "express";
import { attractions, addAttraction, updateAttraction, deleteAttraction } from "../controllers/attractions.js";

const router = express.Router();

router.get("/", attractions);
router.post("/", addAttraction);
router.put("/:id", updateAttraction);
router.delete("/:id", deleteAttraction);


export default router;