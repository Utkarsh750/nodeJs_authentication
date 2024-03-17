const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  description: String,
  price: Number,
});

module.exports = mongoose.model("Product", Product);
