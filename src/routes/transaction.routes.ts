import { Router } from "express";
import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
} from "../controllers/transaction.controller";
import { authentication } from "../middleewares/auth.middleware";
import { upload } from "../middleewares/upload.midleware";

const router = Router();

router.post("/checkout", upload.single("image"), createTransaction);
router.get("/", authentication, getTransactions);
router.get("/:id", getTransactionById);
router.put("/:id", authentication, updateTransaction);

export default router; 