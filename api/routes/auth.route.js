import express from "express";
import {
    google,
    signin,
    signup,
    signOut,
} from "../controller/auth.controller.js";
const router = express.Router();
//creating routes
router.post("/signup", signup);
router.post("/signin", signin);

export default router;
