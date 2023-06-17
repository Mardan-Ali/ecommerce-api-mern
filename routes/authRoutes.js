import express from "express";
import { registerContoller } from "../controllers/AuthController";
// router object
router = express.Router();

// auth Routes
router.post("/register", registerContoller);

export default router;
