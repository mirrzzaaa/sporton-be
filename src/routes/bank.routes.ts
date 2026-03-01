import { Router } from "express";
import { authentication } from "../middleewares/auth.middleware";
import {
    createBank,
    getBanks,
    getBankById,
    updateBank,
    deleteBank,
} from "../controllers/bank.controller";

const router = Router();

router.post("/", authentication, createBank);
router.get("/", getBanks);
router.get("/:id", getBankById);
router.put("/:id", authentication, updateBank);
router.delete("/:id", authentication, deleteBank);

export default router;
