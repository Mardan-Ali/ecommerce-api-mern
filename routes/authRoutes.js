import express from "express";
import { isAdmn, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  loginController,
  registerContoller,
  testController,
} from "../controllers/AuthController.js";
// router object
const router = express.Router();

// auth Routes

// | POST /api/v1/auth/register
router.post("/register", registerContoller);

//LOGIN || POST
router.post("/login", loginController);

// TEST Route
router.get("/test", requireSignIn, isAdmn, testController);
export default router;
