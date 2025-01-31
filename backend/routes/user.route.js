const express = require("express");
const verifiToken = require("../utils/verifyToken");
const {getUsers, updateUser, deleteUser, getSingleUser, uploadAvatar, downloadAvatar} = require("../controllers/user.controller")

const router = express.Router();


router.patch("/:id", verifiToken, updateUser)
      .delete("/:id", verifiToken, deleteUser)
      .get("/all", getUsers)
      .get("/download/avatar/:id", downloadAvatar)
      .post("/upload", uploadAvatar)
      .post("/:id",getSingleUser);



module.exports = router;