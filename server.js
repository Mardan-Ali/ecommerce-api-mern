// SERVER FILE
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";

//Configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);
//DB Connection
connectdb();

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
