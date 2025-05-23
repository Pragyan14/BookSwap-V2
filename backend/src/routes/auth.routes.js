import { Router } from "express";   
import { login, logout, signup } from "../controllers/auth.controller.js";

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

export default router;