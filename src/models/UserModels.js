import { model, models, Schema, Types } from "mongoose";

const user = new Schema(
  {
    username: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    cart: { type: Types.ObjectId, ref: "Carts" },
  },
  { timestamps: true },
);

const userSchema = models.Users || model("Users", user);

export default userSchema;
