// import { required } from "joi";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
});

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
