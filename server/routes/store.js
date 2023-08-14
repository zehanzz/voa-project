import express from "express";
import { store, addStore, updateStore, deleteStore } from "../controllers/store.js";

const router = express.Router();

router.get("/", store);
router.post("/", addStore);
router.put("/:id", updateStore);
router.delete("/:id", deleteStore);

export default router;