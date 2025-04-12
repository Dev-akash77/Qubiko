import express from "express";
import {
  registerController,
  logiController,
  getUserProfile,
  editProfile,
  sending_otp_email,
  verify_otp,
  resetPassword,
  PaymentRazorPay,
  verifyRazorPay,
  generateImage,
} from "../Controllers/user.controller.js";
import { secureUser } from "../Middlewares/secureUser.middleware.js";
import { upload } from "./../Middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", logiController);
router.get("/profile", secureUser, getUserProfile);
router.post("/img", generateImage); //! image generate
router.post("/profile-update", upload.single("image"), secureUser, editProfile);
router.post("/register-otp", secureUser, sending_otp_email);
router.post("/verify-otp", secureUser, verify_otp);
router.post("/reset-password", secureUser, resetPassword);
router.post("/payment", secureUser, PaymentRazorPay);
router.post("/payment-verify", secureUser, verifyRazorPay);

export const userRouter = router;
