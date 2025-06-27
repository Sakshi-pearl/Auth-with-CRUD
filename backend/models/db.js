import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_url = process.env.MONGOOSE;
console.log(`Mongoose url ${mongo_url}`);

function database() {
  mongoose
    .connect(mongo_url)
    .then(() => {
      console.log("Database connected successfully!");
    })
    .catch((err) => {
      console.log("failed to connect!");
      console.log(err);
    });
}

export default database;
