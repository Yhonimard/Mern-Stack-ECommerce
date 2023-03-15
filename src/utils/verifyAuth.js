import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_KEY;

  if (!secret || secret.length === 0)
    throw new Error("the env variable JWT_KEY is not set.");
  return secret;
};

const verifyAuth = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );

    return verified.payload;
  } catch (error) {
    throw new Error("your token has expired");
  }
};
export default verifyAuth;
