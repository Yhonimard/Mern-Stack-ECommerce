const { Schema, model, Types } = require("mongoose")


const userSchema = new Schema(
  {
    username: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    cart: {
      totalPrice: { type: Number, default: 0 },
      cartList: [{
        product: { type: Types.ObjectId, ref: "Products" },
        quantity: { type: Number },
        price: { type: Number }
      }] 
    },
  },
  { timestamps: true }
)

const userModel = model("Users", userSchema)

module.exports = userModel