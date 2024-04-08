import express from "express";
const router = express.Router();

import UserController from "../controllers/userControllers.js";

router.post("/register", UserController);

export default router;
