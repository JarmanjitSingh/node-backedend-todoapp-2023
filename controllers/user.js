import { user } from "../models/user.js";
import { compare, hash } from "bcrypt";
import { cookieAndTokenfunction } from "../utils/feature.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await user.findOne({ email });

    if (isExist)
      return next(new ErrorHandler("User Already Exist with this email.", 404));

    const hashedPassword = await hash(password, 10);

    const userCreated = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    if (userCreated) {
      console.log(userCreated._id);

      cookieAndTokenfunction(userCreated, res, "Registered successfully", 201);
    } else {
      res.json({
        success: false,
        message: "something went wrong while creating the new User.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await user.findOne({ email }).select("+password"); //because select false in schema

    if (!userExist)
      return next(new ErrorHandler("Account not found with this email.", 401));

    const passwordMatched = await compare(password, userExist.password);

    if (!passwordMatched)
      return next(new ErrorHandler("Invalid email or password.", 401));

    cookieAndTokenfunction(userExist, res, "login successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ success: true, message: "User logged out." });
};
