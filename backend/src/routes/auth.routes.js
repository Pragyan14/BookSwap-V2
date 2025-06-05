import { Router } from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
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
router.route("/logout").post(verifyJWT,logout)
router.route("/verify-email").get(verifyEmail)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/check-auth").get(verifyJWT, checkAuth)

export default router;