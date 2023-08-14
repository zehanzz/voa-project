import express from "express";
import { parking, addParking, updateParking, deleteParking } from "../controllers/parking.js";

const router = express.Router();

router.get("/", parking);
router.post("/", addParking);
router.put("/:id", updateParking);
router.delete("/:id", deleteParking);

export default router;