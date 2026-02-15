import { Router } from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller";
import { upload } from "../middleewares/upload.midleware";
import { authentication } from "../middleewares/auth.middleware";

const router = Router();

router.post("/", authentication, upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", authentication, upload.single("image"), updateCategory);
router.delete("/:id", authentication, deleteCategory);

export default router;
