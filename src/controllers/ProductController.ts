import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entity/Product";

class ProductController{

static listAll = async (req: Request, res: Response) => {
    //Get products from database
    const productRepository = getRepository(Product);
    const products = await productRepository.find();
  
    //Send the products object
    res.send(products);
};

static getProductById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    //Get the product from database
    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(id);
      return res.json(product);
    } catch (error) {
      res.status(404).send("product not found");
    }
};

static getProductByName = async (req: Request, res: Response) => {

    const name = req.body;
  
    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(name);
      return res.json(product);
    } catch (error) {
      res.status(404).send("product not found");
    }
};

static getProductByPrice = async (req: Request, res: Response) => {

    const price = req.body;
  
    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(price);
      return res.json(product);
    } catch (error) {
      res.status(404).send("product not found");
    }
};

static getProductByCategory = async (req: Request, res: Response) => {

    const category = req.body;
  
    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(category);
      return res.json(product);
    } catch (error) {
      res.status(404).send("product not found");
    }
};

static newProduct = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, price, description, image, countInStock, category } = req.body;
    let product = new Product();
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.countInStock = countInStock;
    product.category = category;
  
    //Validade if the parameters are ok
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    const productRepository = getRepository(Product);
    try {
      await productRepository.save(product);
    } catch (e) {
      res.status(409).send("product already exists");
      return;
    }
  
    //If all ok, send 201 response
    res.status(201).send("procduct created");
};

static editProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    //Get values from the body
    const { name, price, description, image, countInStock, category } = req.body;
  
    const productRepository = getRepository(Product);
    let product;
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("product not found");
      return;
    }
  
    //Validate the new values on model
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.countInStock = countInStock;
    product.category = category;
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
  
    //Try to safe, if fails, that means product already exists
    try {
      await productRepository.save(product);
    } catch (e) {
      res.status(409).send("product already exists");
      return;
    }

    res.status(404).send("product modified");
};

static deleteProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
  
    const productRepository = getRepository(Product);
    let product: Product;
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("product not found");
      return;
    }
    productRepository.delete(id);
  
    res.status(404).send("product deleted");
};
};

export default ProductController;
