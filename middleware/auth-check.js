const jwt = require("jsonwebtoken");
const httpError = require("../models/httpError");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("auth failed");

    const decodedtoken = jwt.verify(token, "somesecretkey");

    req.userData = { userId: decodedtoken.userId };
    next();
  } catch (error) {
    return next(new httpError("you are not authenticated", 403));
  }
};

module.exports = checkAuth;
