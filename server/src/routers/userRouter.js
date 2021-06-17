import { Router } from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import data from "../sampleData.js";
import userModel from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = Router();

userRouter.get(
    "/users/seed",
    expressAsyncHandler(async (req, res) => {
        // await userModel.remove({});
        const createdUsers = await userModel.insertMany(data.users);
        res.send({ createdUsers });
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

userRouter.get(
    "/users/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const loggedUser = await userModel.findById(req.user._id);
        const requestedUser = await userModel.findById(req.params.id);
        if (loggedUser.isAdmin) {
            res.send(requestedUser);
        } else {
            if (req.params.id === req.user._id) {
                res.send(requestedUser);
            } else res.status(404).send({ message: "Not Permitted" });
        }
    })
);

userRouter.patch(
    "/users/:id",
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const userToUpdate = await userModel.findById(req.body._id);
        if (userToUpdate) {
            if (req.body.name) {
                userToUpdate.name = req.body.name;
            } else if (req.body.password) {
                userToUpdate.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await userToUpdate.save();
            res.send({ message: "User Updated", user: updatedUser });
        } else {
            res.status(404).send({ message: "User Not Found" });
        }
    })
);

export default userRouter;
