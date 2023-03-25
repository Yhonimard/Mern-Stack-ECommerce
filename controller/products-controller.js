const httpError = require("../models/httpError");
const productModels = require("../models/productModel");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const getProduct = async (req, res, next) => {
  let product;

  try {
    product = await productModels.find();
  } catch (error) {
    return next(
      new httpError("an error occured, cant fetching product", 500),
    );
  }

  if (!product) return next(new httpError("there are no products here"));

  res.status(200).json({
    message: "fetching data product success",
    status: "success",
    result: product.map((p) => p.toObject({ getters: true })),
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;

  let product;
  try {
    product = await productModels.findById(productId);
  } catch (err) {
    return next(
      new httpError(" an error occured, cant fetch product by this id", 500),
    );
  }

  if (!product) return next(new httpError("there is no product here", 404));

  return res.status(200).json({
    message: "fetching product by this id success",
    status: "success",
    result: product.toObject({ getters: true }),
  });
};

exports.getProduct = getProduct;
exports.getProductById = getProductById;
