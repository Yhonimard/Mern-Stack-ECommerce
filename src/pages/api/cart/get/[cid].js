import connectMongo from "@/utils/connectMongo";
import cartSchema from "@/models/CartModels";
import { getCookie, getCookies } from "cookies-next";
import productSchema from "@/models/ProductsModels";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const cartId = req.query.cid;
  const userId = getCookies({ req, res });

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  let cart;
  try {
    cart = await cartSchema.findById(cartId).populate({
      path: "cartList.product",
      model: productSchema,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong, pls try agains" });
  }

  if (!cart) {
    return res
      .status(500)
      .json({ message: "You don't have a product in cart" });
  }

  console.log("userId", userId);

  return res.status(200).json({
    message: "fetching cart by cartId success",
    status: "success",
    result: cart.toObject({ getters: true }),
  });
}
