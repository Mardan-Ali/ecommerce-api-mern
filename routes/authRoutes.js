import express from "express";
import {
  loginController,
  registerContoller,
} from "../controllers/AuthController.js";
// router object
const router = express.Router();

// auth Routes

// | POST /api/v1/auth/register
router.post("/register", registerContoller);
router.post("/login", loginController);

export default router;
