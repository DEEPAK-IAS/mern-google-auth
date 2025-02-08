const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user.model");
const errorHandler = require("../utils/errorHandler");
const sendOTPEmail = require("../config/nodeMailer.config.js");
const { generateOTP } = require("../utils/generateOTP");

async function signUP(req, res, next) {
  try {
    const { username, email, password, avatar } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
      avatar: avatar,
    }).save();
    const { password: _, ...rest } = newUser._doc;
    res.status(200).json({
      success: true,
      data: {
        user: rest,
      },
    });
  } catch (err) {
    if (err.message.includes("duplicate key"))
      return next(errorHandler(409, "duplicate key"));
    next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return next(errorHandler(404, "user not found..."));
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) return next(errorHandler(401, "Unauthorized..."));
    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    const { password: _, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", access_token)
      .json({
        success: true,
        data: {
          user: rest,
        },
      });
  } catch (err) {
    next(err);
  }
}

async function signOut(req, res, next) {
  try {
    res.status(200).clearCookie("access_token").json({
      success: true,
      message: "User has been logged out",
    });
  } catch (err) {
    next(err);
  }
}

async function google(req, res, next) {
  try {
    const { username, email, avatar } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user && user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    if (user) {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      const { password: _, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", accessToken)
        .json({
          success: true,
          data: {
            user: rest,
          },
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await new User({
        username: username,
        email: email,
        password: hashedPassword,
        avatar: avatar,
      }).save();

      const accessToken = jwt.sign(
        { id: newUser.id },
        process.env.JWT_SECRET_KEY
      );
      const { password: _, ...rest } = newUser._doc;
      res
        .status(201)
        .cookie("access_token", accessToken, { httpOnly: true })
        .json({
          success: true,
          data: {
            user: rest,
          },
        });
    }
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return next(errorHandler(400, "email is required"));

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "user not found"));

    const OTP = generateOTP();
    user.otp = OTP;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    sendOTPEmail(email, OTP);
    res.status(200).json({
      success: true,
      message: "OTP has been sent successfully to email",
    });
  } catch (err) {
    next(err);
  }
}

async function verifyOTP(req, res, next) {
  const { otp, password, email } = req.body;
  if (!email || !otp || !password) return next(errorHandler(400, "All fields are required"));
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "user not found..."));

    if (Date.now() > user.otpExpires) return next(errorHandler(400, "OTP expired"));
    if (otp != user.otp) return next(errorHandler(401, "Unauthorized.."));

    const newPassword = bcryptjs.hashSync(password, 10);
    user.password = newPassword;
    user.otp = undefined;  
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  signUP,
  signIn,
  signOut,
  google,
  resetPassword,
  verifyOTP,
};
