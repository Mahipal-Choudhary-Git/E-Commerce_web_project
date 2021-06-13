import bcrypt from "bcryptjs";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";
import { generateToken } from "../utils.js";

const authRouter = Router();

authRouter.post(
    "/user/login",
    expressAsyncHandler(async (req, res) => {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
            } else res.status(401).send({ message: "Wrong Password" });
        } else res.status(401).send({ message: "Invalid Email" });
    })
);

export default authRouter;
