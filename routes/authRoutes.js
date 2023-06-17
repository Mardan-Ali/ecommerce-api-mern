import express from "express";
import { registerContoller } from "../controllers/AuthController.js";
// router object
const router = express.Router();

// auth Routes

// | POST /api/v1/auth/register
router.post("/register", registerContoller);

export default router;
