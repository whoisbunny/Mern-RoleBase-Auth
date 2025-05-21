import User from "../models/user.model";

export const isAuthanticated = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.userId);
        if (!user) throw new Error("Invalid token");
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


export const verifyRole = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
