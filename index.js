const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Products = require("./models/schema");
const LoginUserCollection = require("./models/user");
const app = express();

const PORT = 5001;

const mongoose = require("mongoose");
const SECRET_KEY = "My_Secret_Key";

dotenv.config({ path: ".env" });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// set ejs as view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb+srv://utkarsh:9876@nodejs-practise.gqwalnv.mongodb.net/")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// Create Products
app.post("/api/product/new", async (req, res) => {
  // const { name, price, description } = req.body;
  const product = await Products.create(req.body);
  // const product = await Products.create({ name, price, description });

  res.status(201).json({
    success: true,
    product,
  });
});

// Get Products
app.get("/api/products", async (req, res) => {
  const product = await Products.find({});

  res.status(200).json({
    success: true,
    product,
  });
});

// Get Products by id
app.get("/api/product/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Products.findById(id);
  console.log(id);
  // const product = await Products.findById(mongoose.Types.ObjectId(id));

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Products
app.put("/api/product/:id", async (req, res) => {
  let product = await Products.findById(req.params.id);

  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
});


// Delete Products
app.delete("/api/product/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Signin auth

app.post("/user/sign", async (req, res) => {
  const { username, password } = await req.body;

  const payload = {
    username,
    password,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  res.json(token);
});

// signup route
app.post("/signup", async (req, res, next) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const isUserExist = await LoginUserCollection.findOne({ name: data.name });

  if (isUserExist) {
    res.send("user already exist");
  } else {
    // password hash
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashPassword;
    const userData = await LoginUserCollection.insertMany(data);
    console.log(userData);
  }
  next();
});

// login user route
app.post("/login", async (req, res) => {
  try {
    const check = await LoginUserCollection.findOne({
      name: req.body.username,
    });
    if (!check) {
      res.send("user name cannot find");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch (error) {
    res.send("wrong details");
  }
});

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (req, res) => {
  console.log(`App is started at ${PORT}`);
});
