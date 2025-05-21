import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/email.service.js";
import User from "../models/user.model.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["admin", "customer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role,
      isVerified: false,
    });

    // Generate email verification token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendVerificationEmail(user, token);
    res.status(201).json({
      message:
        "Verification Email has been sent to your email, Please verify your email.",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: err.message });
  }
};

// API Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(400).json({ message: "Invalid token" });

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  Admin Login (Customer Restriction)
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to login from here" });
    }

    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Customer Login

export const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.role !== "customer") {
      return res
        .status(403)
        .json({ message: "You are not allowed to login from here" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

// get profile

export const getProfile = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User profile",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
