// ! controloler for register
import { userModel } from "../Models/user.model.js";
import bcrypt from "bcrypt";
import { askQubiko } from "../Services/Langchain.service.js";
import { chatModel } from "../Models/chat.model.js";

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
    res
      .status(200)
      .json({ success: true,profile });
  } catch (error) {
    console.log("getUserProfile controller error: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};




