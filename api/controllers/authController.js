import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHanlder } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { userInfo } from "os";
export const signup = async (req, res, next) => {
  // console.log(req.body)
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfuly/...");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHanlder(404,"USER not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHanlder(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
