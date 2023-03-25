const { Schema, model,  } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);

const productModels = model("Products", productSchema);

module.exports = productModels;
