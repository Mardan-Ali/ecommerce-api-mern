// Veryfyinng if the user ha a token
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Veryfyinng if the user has a token
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decode;
    // console.log(req.user);
    next();
  } catch (error) {
    res.send(
      {
        message: "Error is JWT Varify Middleware",
      },
      error
    );
  }
};

// Verify that user us ADMI
export const isAdmn = async (req, res, next) => {
  console.log(req);
  try {
    const user = await UserModel.findById(req.user._id);
    if (user.role !== 1) {
      return res
        .status(401)
        .send({ success: false, message: "Unathorized access" });
    }
    next();
  } catch (error) {
    res.send({
      message: "The Erorr in Admin Middleware",
      error,
    });
  }
};
