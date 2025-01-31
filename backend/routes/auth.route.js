const express = require("express");
const { signUP, signIn, signOut, google, resetPassword, verifyOTP} = require("../controllers/auth.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();



router.post("/signup", signUP)
      .post("/signin", signIn)
      .post("/google", google)
      .get("/signout", signOut)
      .post("/reset-password", verifyToken, resetPassword)
      .post("/verify-OTP", verifyOTP);



module.exports = router;
