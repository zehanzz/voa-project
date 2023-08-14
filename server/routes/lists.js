import express from "express";
import {
    addList,
    deleteList,
    getList,
    getLists,
    updateList
} from "../controllers/lists.js";

const router = express.Router();

router.get("/", getLists);
router.get("/:id", getList);
router.post("/", addList);
router.delete("/:id", deleteList);
router.put("/:id", updateList);



export default router;