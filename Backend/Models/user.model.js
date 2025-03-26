import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, default: "0000000000" },
    otp: { type: String, default: "" },
    otpEXPDate: { type: Date, default: () => Date.now() + 5 * 60 * 1000 },
    image: {
      type: String,
      default:
        "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png",
    },
    gender: { type: String, default: "Not selected" },
    maxHistory: { type: Number, default: 5 },
    pro: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ! generate token
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export const userModel = model("User", UserSchema);
