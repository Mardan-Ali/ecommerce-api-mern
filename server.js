// SERVER FILE
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";

//Configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//DB Connection
connectdb();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Test API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

//SERVER LISTENING
app.listen(port, () => {
  console.log(
    `The Server is running in ${process.env.DEV_MODE} mode on ${port}`.bgCyan
      .white
  );
});
