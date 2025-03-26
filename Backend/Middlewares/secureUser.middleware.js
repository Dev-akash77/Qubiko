import jwt from "jsonwebtoken";
import { userModel } from "../Models/user.model.js";

export const secureUser = async (req, res, next) => {
  const token = req.header("Authorization");

  // ! if token un available then show a error
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }

  try {
    const jwt_token = token.replace("Bearer", "").trim();
    const jwToken = jwt.verify(jwt_token, process.env.JWT_SECRET);

    // ! find currentUser via jwtToken
    const current_user = await userModel
      .findById(jwToken.id)
      .select("-password");

    if (!current_user) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    req.user = current_user;

    next();
    
  } catch (error) {
    console.log("secureUser middleware error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
