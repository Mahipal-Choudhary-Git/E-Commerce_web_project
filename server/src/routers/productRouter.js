import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import productModel from "../models/productModel.js";
import productData from "../productData.js";

const productRouter = Router();

productRouter.get(
    "/products",
    expressAsyncHandler(async (req, res) => {
        const products = await productModel.find({});
        res.send(products);
    })
);

productRouter.get(
    "/product/:id",
    expressAsyncHandler(async (req, res) => {
        const product = await productModel.findById(req.params.id);
        if (product) res.send(product);
        else res.status(404).send({ message: "Product Not Found" });
    })
);

productRouter.get(
    "/products/seed",
    expressAsyncHandler(async (req, res) => {
        const createdProducts = await productModel.insertMany(
            productData.products
        );
        res.send({ createdProducts });
    })
);

export default productRouter;
