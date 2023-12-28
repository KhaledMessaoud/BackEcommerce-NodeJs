import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Category } from "../entity/Category";

class CategoryController{

static listAll = async (req: Request, res: Response) => {
    //Get categories from database
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
  
    //Send the categories object
    res.send(categories);
};

static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    //Get the category from database
    const categoryRepository = getRepository(Category);
    try {
      const category = await categoryRepository.findOneOrFail(id);
      return res.json(category);
    } catch (error) {
      res.status(404).send("Category not found");
    }
};

static getOneByName = async (req: Request, res: Response) => {

    const name = req.body;
  
    //Get the category from database
    const categoryRepository = getRepository(Category);
    try {
      const category = await categoryRepository.findOneOrFail(name);
      return res.json(category);
    } catch (error) {
      res.status(404).send("Category not found");
    }
};

static newCategory = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name } = req.body;
    let category = new Category();
    category.name = name;
  
    //Validade if the parameters are ok
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    //Try to save. If fails, the category is already exists
    const categoryRepository = getRepository(Category);
    try {
      await categoryRepository.save(category);
    } catch (e) {
      res.status(409).send("category already exists");
      return;
    }
  
    //If all ok, send 201 response
    res.status(201).send("category created");
};

static editCategory = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    //Get values from the body
    const { name } = req.body;
  
    const categoryRepository = getRepository(Category);
    let category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("category not found");
      return;
    }
  
    //Validate the new values on model
    category.name = name;
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    //Try to safe, if fails, that means category already exists
    try {
      await categoryRepository.save(category);
    } catch (e) {
      res.status(409).send("category already exists");
      return;
    }

    res.status(404).send("category modified");
};

static deleteCategory = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    const categoryRepository = getRepository(Category);
    let category: Category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("category not found");
      return;
    }
    categoryRepository.delete(id);
  
    res.status(404).send("category deleted");
};
};

export default CategoryController;

