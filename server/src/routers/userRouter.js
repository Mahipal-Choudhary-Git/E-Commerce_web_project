import { Router } from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";
import productData from "../productData.js";
import { generateToken } from "../utils.js";

const userRouter = Router();
userRouter.get(
    "/users/seed",
    expressAsyncHandler(async (req, res) => {
        await userModel.remove({});
        const createdUser = await userModel.insertMany(productData.users);

        res.send({ createdUser });
    })
);

userRouter.post(
    "/users",
    expressAsyncHandler(async (req, res) => {
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser),
        });
    })
);

export default userRouter;
