const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginUserCollection = new mongoose.model("user", LoginSchema);

module.exports = loginUserCollection;
