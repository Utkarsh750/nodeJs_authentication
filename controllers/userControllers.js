const UserModel = require("../models/newUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// class UserController {
//     static userRegistration = async (req, res) =>

const UserController = async (req, res) => {
  const { name, email, password, confirm_passsword, tc } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user) {
    res.send({ status: "failed", message: "email already exist" });
  } else {
    if (name && email && password && confirm_passsword && tc) {
      if (password === confirm_passsword) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            name: name,
            email: email,
            tc: tc,
            password: hashPassword,
          });
          await doc.save();
          res.send({ status: "success", message: "You are Registered!!" });
        } catch (error) {
          res.send({ status: "failed", message: "unable to register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "passowrd and confirm_password doesn't match",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  }
};

export default UserController;
