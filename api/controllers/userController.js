import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";
export const test = (req, res) => {
  res.json({
    msg: "hola madrid...",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.role !== "admin" && req.params.id !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    if (req.user.role !== "admin") {
      res.clearCookie("access_token");
    }
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error.message);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      if (!listings) {
        return res
          .status(404)
          .json({ success: false, message: "No listings found" });
      }
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return next(errorHandler(404, "No users found"));
    }

    // Remove passwords from all users
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    next(error);
  }
};
