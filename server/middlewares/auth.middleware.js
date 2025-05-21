import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthanticated = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.userId);
        if (!user) throw new Error("Invalid token");
        if (!user?.isVerified) {
          return res
            .status(401)
            .json({ message: "Please verify your email first" });
        }
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "Not authorized, no token" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
