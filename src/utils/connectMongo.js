import mongoose, { connect } from "mongoose";

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  connect(process.env.DB_URL);
};

export default connectMongo;
