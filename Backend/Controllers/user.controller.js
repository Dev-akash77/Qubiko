import { userModel } from "../Models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";
// ! controloler for register

import bcrypt from "bcrypt";
import { sendEmail } from "../Config/nodemailer.js";
import { imageGeneration } from "../Tools/generateImage.tool.js";

// ! register controller'
export const registerController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    // ! if any required fields are empty then error happen
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing" });
    }

    // ! if password are less than 6 then error happen
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Please add strong password",
      });
    }

    // ! if user is allready exist then error happen
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (error) {
    console.log("Register controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! login contriller
export const logiController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = await existingUser.generateToken();

    res
      .status(200)
      .json({ success: true, message: "Login successfully", token });
  } catch (error) {
    console.log("login controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! get user Profile data

export const getUserProfile = async (req, res) => {
  try {
    const profile = req.user;
    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.log("getUserProfile controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// !edit profile data
export const editProfile = async (req, res) => {
  try {
    const { name, number, email, gender } = req.body;
    const userId = req.user._id;
    const imagefile = req.file;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Missing Details", success: false });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    let imageUrl = user.image;

    // ! Only upload if image was updated
    if (imagefile) {
      const result = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: "image",
        folder: "Qubiko_User",
      });

      imageUrl = result.secure_url;
    }

    // ! Update user fields
    user.name = name;
    user.number = number;
    user.email = email;
    user.gender = gender;
    user.image = imageUrl;

    await user.save();

    res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log("editProfile controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! sending otp
export const sending_otp_email = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    // ! if email is invalid
    if (!email || email !== user.email) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // !generate random otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // ! expire time set to 5 minutes from now
    const otpEXPDate = Date.now() + 5 * 60 * 1000;

    // !save user
    user.otp = otp;
    user.otpEXPDate = otpEXPDate;
    await user.save();

    // !send otp in email
    await sendEmail(
      email,
      "Your Qubiko AI OTP Code",
      `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      `
      <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9ff;">
    
        <h2 style="text-align: center; color: #4F46E5;">🔐 OTP Verification</h2>
        <p style="font-size: 16px; color: #333;">Hello 👋,</p>
        <p style="font-size: 16px; color: #333;">
          You requested an OTP to verify your identity. Use the code below to proceed:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; background: #4F46E5; color: #fff; padding: 15px 25px; border-radius: 8px;">
            ${otp}
          </span>
        </div>
    
        <p style="font-size: 14px; color: #666;">
          This OTP is valid for <strong>5 minutes</strong>. Please do not share this code with anyone.
        </p>
    
        <p style="font-size: 14px; color: #666;">
          If you didn’t request this, you can safely ignore it.
        </p>
    
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;" />
    
        <p style="text-align: center; font-size: 14px; color: #aaa;">
          Sent with 💙 by Qubiko AI<br/>
          <a href="https://qubiko.vercel.app" style="color: #4F46E5; text-decoration: none;">Visit Qubiko.ai</a>
        </p>
      </div>
      `
    );

    res.status(200).json({ success: true, message: "OTP send succesfully" });
  } catch (error) {
    console.log("sending_otp_email controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! verify otp
export const verify_otp = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;
    const user = await userModel.findById(userId);

    // ! validation for otp
    if (!otp || otp.toString() !== user.otp) {
      return res.status(400).json({ success: false, message: "incorrect OTP" });
    }

    // ! OTP expiration check
    if (Date.now() > user.otpEXPDate) {
      return res.status(400).json({
        success: false,
        message: "Your OTP has expired.",
      });
    }

    // !save user
    user.otp = "";
    user.otpEXPDate = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log("verify_otp controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ! reset password
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const userId = req.user._id;
    const user = await userModel.findById(userId);

    if (!password || password.toString().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Add strong password",
      });
    }

    // ! Hash the new password and save
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    console.log("resetPassword controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// !razorpay instence
const razorPayInstance = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

// ! razorpay paymen
export const PaymentRazorPay = async (req, res) => {
  try {
    const { id, plan, price } = req.body;

    if (!plan || plan === "free") {
      return res.status(400).json({
        success: false,
        message: "Free plan cannot be upgraded",
      });
    }

    const option = {
      amount: price*100,
      currency: process.env.CURRENCY || "INR",
      receipt: id,
    };

    const order = await razorPayInstance.orders.create(option);
    res
    .status(200)
    .json({ success: true, message: "Order Created Successfully", order,plan });
  } catch (error) {
    console.log("PaymentRazorPay controller erorr", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

 

// !verify payment
export const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id ,plan} = req.body;
    const orderinfo = await razorPayInstance.orders.fetch(razorpay_order_id);

    if (!orderinfo) {
      return res
        .status(400)
        .json({ success: false, message: "Order not verify" });
    }
    
    if (orderinfo.status == "paid") {
      await userModel.findByIdAndUpdate(orderinfo.receipt, {
        pro: true,
        plan:plan,
        maxHistory:10,
      });
      res.status(200).json({ success: true, message: "Payment Successful" });
    } else {
      res.status(200).json({ success: false, message: "Payment Failed" });
    }

  } catch (error) {
    console.log("verifyRazorPay controller erorr", error);
    res.status(400).json({ success: false, message: error.message });
  }
};



// !get image
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
 const response = await imageGeneration(prompt);

    res.status(200).json({ success: true, response });
  } catch (error) {
    console.log("sending_otp_email controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};