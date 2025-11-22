import express from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { deleteaccout } from "../controllers/deleteaccout.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/deleteaccout",deleteaccout);

export default router;