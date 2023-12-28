import { Router } from "express";
import CategoryController from "../controllers/CategoryController";


const router = Router();

//Get all categories
router.get("/", CategoryController.listAll);

// Get one category
router.get("/:id", CategoryController.getOneById);

// Get one category by name
router.get("/getone", CategoryController.getOneByName);

//Create a new category
router.post("/", CategoryController.newCategory);

//Edit one category
router.patch("/:id", CategoryController.editCategory);

//Delete one category
router.delete("/:id", CategoryController.deleteCategory);

export default router;