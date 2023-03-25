const httpError = require("../models/httpError");
const userModel = require("../models/userModel");
const productModels = require("../models/productModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const signup = async (req, res, next) => {
  const { username, email, age, address, password } = req.body;

  let existingEmail;
  try {
    existingEmail = await userModel.findOne({ email: email });
  } catch (err) {
    return next(new httpError("something went wrong, pls try again", 500));
  }

  if (existingEmail) {
    return next(
      new httpError("this email have been exist, please login instead", 409)
    );
  }

  let hashPassword;

  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(new httpError("something went wrong, pls try again", 500));
  }

  const createdUser = new userModel({
    username,
    email,
    address,
    age,
    password: hashPassword,
    cart: {
      totalPrice: 0,
      cartList: [],
    },
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new httpError("something went wrong, pls try agains", 500));
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    return next(new httpError("something went wrong pls try again", 500));
  }

  res.status(201).json({
    message: "signup success",
    status: "success",
    token,
    result: { email: createdUser.email, id: createdUser.id },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await userModel.findOne({ email: email });
  } catch (err) {
    return next(
      new httpError("cant login, something went wrong pls try again", 500)
    );
  }

  if (!existingUser) {
    return next(new httpError("you dont have an account by this email", 404));
  }

  let comparePassword;

  try {
    comparePassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new httpError("something went wrong pls try again", 500));
  }

  if (!comparePassword) {
    return next(new httpError("invalid credentials, please try again", 404));
  }

  let token;

  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );
  } catch (err) {
    return next(new httpError("something went wrong pls try again", 500));
  }

  res.status(200).json({
    message: "login success",
    status: "success",
    token,
    result: { email: existingUser.email, id: existingUser.id },
  });
};

const addToCart = async (req, res, next) => {
  const userId = req.params.uid;
  const { quantity, productId } = req.body;

  if (userId !== req.userData.userId) {
    return next(new httpError("youare not allowed to change this cart", 405));
  }

  let existingUser;
  try {
    existingUser = await userModel.findById(userId);
  } catch (err) {
    return next(new httpError("something went wrong pls try again", 500));
  }

  if (!existingUser) {
    return next(
      new httpError("you dont have an accout pls signup instead", 404)
    );
  }

  let existingProduct;
  try {
    existingProduct = await productModels.findById(productId);
  } catch (err) {
    return next(new httpError("something went wrong pls try again", 500));
  }

  if (!existingProduct) {
    return next(new httpError("this product does not exist", 404));
  }

  const findProduct = existingUser.cart.cartList.find(
    (p) => p.product == productId
  );
  const cartIndex = existingUser.cart.cartList.findIndex(
    (p) => p.product == productId
  );

  if (findProduct) {
    let productItem = existingUser.cart.cartList[cartIndex];

    productItem.quantity += quantity;
    productItem.price += existingProduct.price * quantity;

    existingUser.cart.cartList[cartIndex] = productItem;
  } else {
    const productToBeAdded = {
      product: productId,
      quantity,
      price: existingProduct.price * quantity,
    };
    existingUser.cart.cartList.push(productToBeAdded);
  }

  let total = 0;
  existingUser.cart.cartList.map((c) => (total += c.price));
  existingUser.cart.totalPrice = total;

  try {
    await existingUser.save();
  } catch (err) {
    return next(new httpError("cant add product to cart pls try again", 500));
  }
  return res
    .status(201)
    .json({ message: "product have been added to cart", status: "success" });
};

const reduceCart = async (req, res, next) => {
  const userId = req.params.uid;
  const { productId, quantity } = req.body;

  if (userId !== req.userData.userId) {
    return next(new httpError("youare not allowed to change this cart", 405));
  }

  let existingUser;
  try {
    existingUser = await userModel.findById(userId);
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  if (!existingUser) {
    return next(
      new httpError("cannot find this user, pls signup instead", 404)
    );
  }

  let existingProduct;
  try {
    existingProduct = await productModels.findById(productId);
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  if (!existingProduct) {
    return next(new httpError("cannot find this product", 404));
  }

  const findCart = existingUser.cart.cartList.find(
    (c) => c.product == productId
  );

  if (!findCart) {
    return next(
      new httpError("You don't have this product list in your cart", 404)
    );
  }

  const cartIndex = existingUser.cart.cartList.findIndex(
    (c) => c.product == productId
  );

  if (findCart.quantity < 1) {
    existingUser.cart.cartList.pull(findCart);
    return res
      .status(204)
      .json({ message: "this product have been deleted on your cart" });
  } else {
    let cartItem = existingUser.cart.cartList[cartIndex];
    cartItem.quantity -= quantity;
    cartItem.price -= existingProduct.price * quantity;
  }

  try {
    await existingUser.save();
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  return res.status(201).json({
    message: "product in your cart have been reduce",
    status: "success",
  });
};

const deleteCart = async (req, res, next) => {
  const userId = req.params.uid;
  const { productId } = req.body;

  if (userId !== req.userData.userId) {
    return next(new httpError("youare not allowed to delete this cart", 405));
  }

  let existingUser;

  try {
    existingUser = await userModel.findById(userId);
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  if (!existingUser) {
    return next(
      new httpError("cannot find this user, pls signup instead", 404)
    );
  }

  let existingProduct;
  try {
    existingProduct = await productModels.findById(productId);
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  if (!existingProduct) {
    return next(new httpError("cannot find this product", 404));
  }

  const findProduct = existingUser.cart.cartList.find(
    (p) => p.product == productId
  );

  if (!findProduct) {
    return next(
      new httpError("you dont have this product on your cart list", 404)
    );
  }

  existingUser.cart.cartList.pull(findProduct);

  try {
    await existingUser.save();
  } catch (err) {
    return next(new httpError("cant delete this cart, pls try again", 500));
  }

  res.status(204);
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

const getUser = async (req, res, next) => {
  const userId = req.params.uid;

  if (userId !== req.userData.userId) {
    return next(new httpError("youare not allowed to see this cart", 405));
  }

  let existingUser;
  try {
    existingUser = await userModel
      .findById(userId)
      .populate({ path: "cart.cartList.product", model: productModels });
  } catch (err) {
    return next(new httpError("something went wrong please try again", 500));
  }

  if (!existingUser) {
    return next(
      new httpError("cannot find this user, pls signup instead", 404)
    );
  }

  return res.status(200).json({
    message: "fetching user data success",
    status: "success",
    result: existingUser.toObject({ getters: true }),
  });
};

exports.login = login;
exports.signup = signup;
exports.addToCart = addToCart;
exports.reduceCart = reduceCart;
exports.deleteCart = deleteCart;
exports.getUser = getUser;
