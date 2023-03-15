import productSchema from "@/models/ProductsModels";
import connectMongo from "@/utils/connectMongo";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 */

const handler = async (req, res) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "method not allowed" });

  const id = req.query.id;

  try {
    await connectMongo();
  } catch (error) {
    return res.status(500).json("fetching data failed , something went wrong");
  }

  let products;

  try {
    products = await productSchema.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  if (!products)
    return res
      .status(404)
      .json({ message: "could not find products by its id" });

  return res.status(200).json({
    status: "success",
    message: "fetching user data success",
    result: products.toObject({ getters: true }),
  });
};

export default handler;
