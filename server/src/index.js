import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import authRouter from "./routers/authRouter.js";
import orderRouter from "./routers/orderRouter.js";

// create express instance
const app = express();
// for cors policy
app.use(cors());
// for parsing reqst body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to database
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//api routes
app.use("/api", orderRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);

//authetication routes
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("server is ready");
});

// error handling
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port);
