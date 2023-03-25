const express = require("express");
const { getProduct, getProductById } = require(
  "../controller/products-controller",
);
const router = express.Router();

router.get("/", getProduct);

router.get("/:pid", getProductById);


const productRouter = router;
module.exports = productRouter;
