/*import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Cart } from "../entity/Cart";
import { Product } from "../entity/Product";

class CartController{

static addToCart = async (req: Request, res: Response) => {
    const productId = req.body;

    const userId = req.body;
    const cartRepository = getRepository (Cart);
    const productRepository = getRepository(Product);

    try{
        let cart = await cartRepository.findOne(userId);

        const productdetails = await productRepository.findOne(productId);

        

    }
}
}*/