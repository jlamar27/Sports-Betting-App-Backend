// import connection, grab schema and model
const { Schema, model } = require("../connection/db")
const mongoose = require('mongoose');

// define user schema
const userSchema = new mongoose.Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  virtualMoney: {
      type: Number,
      default: 1000 // Initial virtual money assigned to the user
  }
});


// define user model
const User = model("User", userSchema)

// export User
module.exports = User