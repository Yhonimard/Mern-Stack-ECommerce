import userSchema from "@/models/UserModels";
import connectMongo from "@/utils/connectMongo";
import cartSchema from "@/models/CartModels";
import { getCookie } from "cookies-next";
import productSchema from "@/models/ProductsModels";
import mongoose from "mongoose";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 */

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "method not allowed" });

  const { productId, quantity, price } = req.body;

  const userId = getCookie("userid", { req, res });
  const userIdFromParam = req.query.uid;

  if (userIdFromParam !== userId)
    return res
      .status(400)
      .json({ message: "you not allowed to change this cart" });

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong , cant add product to cart" });
  }

  let existingUserWithCart;
  try {
    existingUserWithCart = await userSchema
      .findById(userId, "-password")
      .populate("cart");
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong, please try again" });
  }
  if (!existingUserWithCart)
    return res
      .status(404)
      .json({ message: "this user not found. could not add product to cart" });

  let existingProduct;
  try {
    existingProduct = await productSchema.findById(productId);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong, please try again" });
  }

  if (!existingProduct)
    return res.status(404).json({ message: "this product doesn't exist" });

  let existingCart;
  try {
    existingCart = await cartSchema.findById(existingUserWithCart.cart);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  if (!existingCart) {
    let newCart;
    try {
      newCart = await cartSchema.create({
        user: userId,
        totalPrice: 0,
        cartList: [{ product: productId, quantity, price }],
      });
      existingUserWithCart.cart = newCart.id;
      await existingUserWithCart.save();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "something went wrong pls try again" });
    }

    return res.status(201).json({
      status: "success",
      message: "product have been added",
      result: newCart,
    });
  }

  const findCart = existingCart.cartList.find(
    (item) => item.product == productId
  );

  const cartIndex = existingCart.cartList.findIndex(
    (item) => item.product == productId
  );

  if (findCart) {
    let productItem = existingCart.cartList[cartIndex];

    productItem.quantity += quantity;
    productItem.price += price;
    existingCart.cartList[cartIndex] = productItem;
  } else {
    const productToBeAdded = {
      product: productId,
      quantity,
      price,
    };
    existingCart.cartList.push(productToBeAdded);
  }

  try {
    await existingCart.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  return res.status(200).json({
    message: "add product to cart success",
    status: "success",
    result: existingCart.cartList.toObject({ getters: true }),
  });
};

export default handler;
