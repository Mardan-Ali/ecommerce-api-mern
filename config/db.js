import mongoose from "mongoose";
import colors from "colors";

// db connection

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connected at ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error is ${error}`.bgRed.white);
  }
};

export default connectdb;
