const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log("Database connected...")
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  connect
}
