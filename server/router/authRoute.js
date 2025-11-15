// package
import { Router } from "express";
const router = Router();

import authController from "../controllers/authController.js";
import fetchuser from "../middleware/fetchuser.js";


// routes
router.get("/", fetchuser, authController.get);
router.post("/otp", authController.SendOTP);
router.post("/otp/verify", authController.VerifyOTP);
router.post("/signup", authController.SignUp);  
router.post("/login", authController.Login);  
router.get("/logout", fetchuser, authController.Logout);  
export default router;