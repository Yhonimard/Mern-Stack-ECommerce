import userSchema from "@/models/UserModels";
import connectMongo from "@/utils/connectMongo";

/**
 *
 * @param {import("next").NextApiRequest} req
 * @param {*import("next").NextApiResponse} res
 *
 */

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "method not allowed" });

  const userId = req.query.uid;

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  let findUser;
  try {
    findUser = await userSchema.findById(userId, "-password").populate("cart");

    // .populate({
    //   path: "cart",
    //   populate: {
    //     path: "cartList.product",
    //   },
    // });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong pls try again" });
  }

  if (!findUser)
    return res.status(404).json({ message: "this user not found" });

  res.status(200).json({
    status: "success",
    message: "fetching user data by id success",
    result: findUser.toObject({ getters: true }),
  });
}
