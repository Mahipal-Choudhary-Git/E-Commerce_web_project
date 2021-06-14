import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = Router();

orderRouter.post(
    "/order",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).send({ message: "Cart is Empty" });
        } else {
            const order = new orderModel({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            res.status(201).send({
                message: "New Order Created",
                order: createdOrder,
            });
        }
    })
);

orderRouter.get(
    "/order/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await orderModel.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "Order Not Found" });
        }
    })
);

export default orderRouter;
