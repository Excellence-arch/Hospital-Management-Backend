const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  userId: Number,
  address: String,
});

const UserModel = mongoose.model("users_tbs", userSchema);

module.exports = UserModel;