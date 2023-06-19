import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
// |1: POST /api/v1/auth/register
export const registerContoller = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.send({
        success: false,
        message: "Please Enter the all information",
      });
    }
    // checking either the user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(201).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hasing Password
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);

    // Saving User
    const user = await new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registerd successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering",
      error,
    });
  }
};

// |2: POST /api/v1/auth/login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(password);

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Please enter your email addres and Password",
      });
    }
    // Check if the user registered
    const user = await UserModel.findOne({ email });
    // console.log(user);
    // console.log("Now PASSWORD", user.password);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User is not registered" });
    }
    // Check password is correct
    const confirmpassword = await comparePassword(password, user.password);
    // console.log(confirmpassword);

    if (!confirmpassword) {
      return res
        .status(404)
        .send({ success: false, message: "Password is incorrect" });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "User Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Controler",
      error: error,
    });
  }
};

// 3: GET /api/v1/auth/test
export const testController = async (req, res) => {
  res.send("Protected Route Acccessed");
};
