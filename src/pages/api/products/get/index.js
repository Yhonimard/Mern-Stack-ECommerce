import productSchema from "@/models/ProductsModels";
import connectMongo from "@/utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 */

const handler = async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "method not allowed" });

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "fetching data failed, something went wrong " });
  }

  let products;
  try {
    products = await productSchema.find({});
  } catch (error) {
    console.log(error);
    return res.status(500).json("fetching data failed");
  }
  res.status(201).json({
    status: "success",
    message: "fetching data success",
    result: products.map((p) => p.toObject({ getters: true })),
  });
};
export default handler;
