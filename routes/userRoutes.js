const express = require("express")
const router = express.Router();

const UserController = require("../controllers/userControllers.js");

router.post("/register", UserController);

export default router;
