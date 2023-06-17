import { hashPassword } from "../helpers/authHelper.js";
import UserModel from "../models/UserModel.js";

// | POST /api/v1/auth/register
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
