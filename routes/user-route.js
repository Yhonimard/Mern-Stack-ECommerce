const express = require("express");
const checkAuth = require("../middleware/auth-check");
const {
  signup,
  login,
  addToCart,
  reduceCart,
  deleteCart,
  getUser,
} = require("../controller/user-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(checkAuth);

router.post("/cart-add/:uid", addToCart);
router.post("/cart-reduce/:uid", reduceCart);
router.delete("/cart-delete/:uid", deleteCart);
router.get("/:uid", getUser);

const userRoute = router;
module.exports = userRoute;
