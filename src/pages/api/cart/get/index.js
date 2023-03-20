import cartSchema from "@/models/CartModels";
import connectMongo from "@/utils/connectMongo";
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "method not allowed" });
  }

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  let cart;
  try {
    cart = await cartSchema.find();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  return res.status(200).json({
    message: "fetching data success",
    status: "success",
    result: cart.map((c) => c.toObject({ getters: true })),
  });
}
