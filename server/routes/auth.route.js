import express from "express";
import {
  adminLogin,
  customerLogin,
  getProfile,
  register,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { isAuthanticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);

router.get("/verify-email", verifyEmail);

router.post("/login", customerLogin);
router.post("/admin-login", adminLogin);

router.get("/profile", isAuthanticated, getProfile);

export default router;
