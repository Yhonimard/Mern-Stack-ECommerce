import { model, models, Schema, Types } from "mongoose";

const cart = new Schema(
  {
    user: { type: Types.ObjectId, ref: "Users", required: true },
    totalPrice: { type: Number, default: 0 },
    cartList: [
      {
        product: { type: Types.ObjectId, ref: "Products" },
        quantity: { type: Number },
        price: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true },
);

const cartSchema = models.Carts || model("Carts", cart);

export default cartSchema;
