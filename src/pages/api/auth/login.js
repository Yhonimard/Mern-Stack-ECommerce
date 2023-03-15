import userSchema from "@/models/UserModels";
import connectMongo from "@/utils/connectMongo";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 *
 *
 */

const login = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "method not allowed" });

  try {
    await connectMongo();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "cant login, something went wrong" });
  }

  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await userSchema.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "could not login , pls try again email" });
  }

  if (!existingUser)
    return res
      .status(422)
      .json({ message: "invalid credentials, please signup instead" });

  let checkPassword;
  try {
    checkPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "could not login , please try again" });
  }

  if (!checkPassword)
    return res
      .status(404)
      .json({ message: "invalid credentials, please signup instead" });

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY
    );
  } catch (error) {
    return res.status(500).json({ message: "signup failed, please try again" });
  }

  res.status(201).json({
    message: "login succeed",
    status: "success",
    result: {
      email: existingUser.email,
      id: existingUser.id,
    },
    token,
  });
};

export default login;
