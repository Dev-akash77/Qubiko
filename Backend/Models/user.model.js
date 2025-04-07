import { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, default: "0000000000" },
    otp: { type: String, default: "" },
    otpEXPDate: { type: Date, default: ""},
    image: {
      type: String,
      default:""
    },
    gender: { type: String, default: "Not selected" },
    maxHistory: { type: Number, default: 5 },
    pro: { type: Boolean, default: false },
    plan:{type:String,default:"free"}
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
