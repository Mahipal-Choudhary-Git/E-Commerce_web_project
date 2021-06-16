import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { isAuth } from "../utils.js";

const orderRouter = Router();

orderRouter.get(
    "/order",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await userModel.findById(req.user._id);
        if (user.isAdmin) {
            const orders = await orderModel.find();
            res.send(orders);
        } else {
            const orders = await orderModel.find({ user: req.user._id });
            res.send(orders);
        }
    })
);

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

orderRouter.patch(
    "/order/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await orderModel.findById(req.params.id);
        if (order) {
            if (req.body.paymentResult) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = req.body.paymentResult;
            }
            const updatedOrder = await order.save();
            res.send({ message: "Order Updated", order: updatedOrder });
        } else {
            res.status(404).send({ message: "Order Not Found" });
        }
    })
);

export default orderRouter;
