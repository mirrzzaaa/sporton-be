import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller";
import { upload } from "../middleewares/upload.midleware";
import { authentication } from "../middleewares/auth.middleware";


const router = Router();


router.post("/", authentication, upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authentication, upload.single("image"), updateProduct);
router.delete("/:id", authentication, deleteProduct);

export default router;