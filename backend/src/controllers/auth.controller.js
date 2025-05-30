import dotenv from 'dotenv';
dotenv.config();
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js"
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mail/email.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something want wrong while generating access and refresh token:", error);
    }
}

const signup = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!email || !password || !fullname) {
        throw new ApiError(400, "All fields required")
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User already existed")
    }

    const user = await User.create({
        email,
        password,
        fullname
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const verificationToken = jwt.sign(
        { email: createdUser.email },
        process.env.EMAIL_VERIFICATION_SECRET,
        { expiresIn: '30m' }
    );

    await sendVerificationEmail(createdUser.email, `${process.env.CLIENT_URL}/verify-email?verificationToken=${verificationToken}`);
    // console.log(verificationToken);
    

    // const options = {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'strict',
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const verifyEmail = asyncHandler(async (req, res) => {

    const { verificationToken } = req.query;

    try {

        if (!verificationToken) throw new ApiError(401, "Error in getting verification token");

        const decodedToken = jwt.verify(verificationToken, process.env.EMAIL_VERIFICATION_SECRET);

        const user = await User.findOne({ email: decodedToken.email }).select("-password");

        if (!user) throw new ApiError(404, "User not found");

        if (user.isVerified) {
            return res.status(200).json(new ApiResponse(200, null, "Email already verified"));
        }

        user.isVerified = true;
        await user.save();

        await sendWelcomeEmail(user.email, user.fullname)

        return res.status(200).json(new ApiResponse(200, null, "Email verified, please log in."));

    } catch (error) {
        throw new ApiError(400, "Invalid or expired verification link");
    }

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "Invalid user credentials")
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials")
        }

        const token = generateToken(user._id);

        user.lastLogin = new Date();
        await user.save();

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("token", token, options)
            .json(
                new ApiResponse(200,
                    {
                        user: {
                            ...user._doc,
                            password: undefined,
                        },
                    },
                    "User logged in successfully"
                )
            )

    } catch (error) {
        console.log("Error in login : ", error);
        res.status(400).json({ success: false, message: error.message })
    }
})

const logout = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, "User does not exist")
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        return res.status(200).json(new ApiResponse(200, null, "Password reset link sent to your email"))

    } catch (error) {
        console.log("Error in forgetPassword", error);
        res.status(400).json({ success: false, message: error.message });
    }
})

const resetPassword = asyncHandler(async (req, res) => {

    try {
        const { newPassword } = req.body;
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })

        if (!user) {
            throw new ApiError(400, "Invalid or expired reset token");
        }

        user.password = newPassword;
        user.resetPasswordExpiresAt = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        await sendResetSuccessEmail(user.email);

        return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"))
    } catch (error) {
        console.log("Error in resetPassword: ", error);
        throw new ApiError(400, "Error in resetPassword:", error)
    }
})

const checkAuth = asyncHandler(async (req, res) => {
    try {
        // console.log(req.userId);
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(400).json({ success: false, message: "User not found" });
        return res.status(200).json(new ApiResponse(200, user))

    } catch (error) {

        console.log("Error in check auth: ", error);
        res.status(400).json({ success: false, message: error.message })

    }
})

export { signup, login, logout, verifyEmail, forgetPassword, resetPassword, checkAuth }