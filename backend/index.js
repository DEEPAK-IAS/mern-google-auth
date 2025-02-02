const express = require("express");
const mongodb = require("./db/index");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
mongodb.connect();
app.use(express.json())
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; 
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message
  });
})

const PORT = process.env.PROT || 3000;
app.listen(PORT, () => console.log(`server running on port no ${PORT}`));