import { model, models, Schema } from "mongoose";

const product = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const productSchema = models.Products || model("Products", product);
// models.Products
export default productSchema;
