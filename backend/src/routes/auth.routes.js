import { Router } from "express";
import { login, logout, signup, verifyEmail, forgetPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// router.get("/signup",(req,res)=>{
//     res.send("LOGIN SIGNUP")
// })

// router.get("/login",(req,res)=>{
//     res.send("LOGIN ROUTE")
// })

// router.get("/logout",(req,res)=>{
//     res.send("LOGIN LOGOUT")
// })

router.route("/login").post(login)
router.route("/signup").post(signup)
router.route("/logout").post(logout)
router.route("/verify-email").post(verifyEmail)
router.route("/forget-password").post(forgetPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/check-auth").get(verifyJWT, checkAuth)

export default router;