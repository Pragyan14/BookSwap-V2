import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js"
import { sendVerificationEMail } from "../mailtrap/email.js"

const signup = asyncHandler(async (req,res) => {
    const {fullname,email,password} = req.body;

    if (!email || !password || !fullname) {
        throw new ApiError(400,"All fields required")
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(409,"User already existed")
    }

    const verificationToken = Math.floor(10000 + Math.random() * 900000).toString();
    
    const user = await User.create({
        email,
        password,
        fullname,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })
    
    
    const createdUser = await User.findById(user._id).select("-password")
    
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    
    const token = generateToken(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite:'strict',
        maxAge: 7*24*60*60*1000
    }

    await sendVerificationEMail(createdUser.email,verificationToken);

    return res
    .status(201)
    .cookie("token",token,options)
    .json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const login = asyncHandler(async (req,res) => {
    res.send("LOGIN ROUTE")
})

const logout = asyncHandler(async (req,res) => {
    res.send("LOGOUT ROUTE")
})

export {signup,login,logout}