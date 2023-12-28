import { Router } from "express";
import ProductController from "../controllers/ProductController";

const router = Router();

router.get("/", ProductController.listAll);
router.get("/:id", ProductController.getProductById);
router.get("/getprod-name", ProductController.getProductByName);
router.get("/getprod-price", ProductController.getProductByPrice);
router.get("/getprod-category", ProductController.getProductByCategory);
router.post("/", ProductController.newProduct);
router.patch("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;