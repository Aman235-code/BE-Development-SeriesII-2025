import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "User already registered",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPass,
    });
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
    });
  } catch (error) {
    console.log(error);
  }
};
