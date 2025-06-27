import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import Joi from "joi";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import database from "./models/db.js";
import AuthRouter from "./routes/AuthRouter.js";
import ProdRouter from "./routes/ProdRouter.js";

dotenv.config();
database();

const app = express();
const PORT = process.env.PORT || 8800;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(PORT);

app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProdRouter);

app.get("/test", (req, res) => {
  res.send("Hello tested!");
});

app.listen(PORT, () => {
  console.log(`App listening at  ${PORT}`);
});
