const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const productRouter = require("./routes/product-route");
const userRoute = require("./routes/user-route");
const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res, next) => {
  return res.json({ message: "hay" });
});

app.use("/api/product", productRouter);
app.use("/api/user", userRoute);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "an unknown error occured" });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
