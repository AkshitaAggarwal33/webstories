import express from "express";
import { signup, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signup);

export default router;