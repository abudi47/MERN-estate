import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import User from "../models/user.model.js";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid token"));
    req.user = user;
    next();
  });
};


export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      console.log("No token provided");
      return next(errorHandler(401, "Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found");
      return next(errorHandler(404, "User not found"));
    }

    if (user.role !== "admin") {
      console.log("Access denied. User is not admin");
      return next(errorHandler(403, "Access denied. Admins only."));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    if (error.name === "JsonWebTokenError") {
      return next(errorHandler(403, "Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(errorHandler(403, "Token expired"));
    }
    next(error);
  }
};
