import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js"
// import { sendVerificationEMail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/email.js"
import crypto from 'crypto';
import { nodemailerSendPasswordResetEmail, nodemailerSendResetSuccessEmail, nodemailerSendVerificationEmail, nodemailerSendWelcomeEmail } from "../mail/email.js"

const signup = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!email || !password || !fullname) {
        throw new ApiError(400, "All fields required")
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User already existed")
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

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const token = generateToken(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    // await sendVerificationEMail(createdUser.email, verificationToken);
    await nodemailerSendVerificationEmail(createdUser.email, verificationToken);

    return res
        .status(201)
        .cookie("token", token, options)
        .json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        }).select("-password")

        if (!user) {
            throw new ApiError(400, "Invalid or expired verification code ");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await nodemailerSendWelcomeEmail(user.email, user.fullname)

        return res
            .status(200)
            .json(
                new ApiResponse(200, user, "User verified successfully")
            )


    } catch (error) {
        console.log("Error while verifying email");

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

        await nodemailerSendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

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

        await nodemailerSendResetSuccessEmail(user.email);

        return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"))
    } catch (error) {
        console.log("Error in resetPassword: ", error);
        throw new ApiError(400, "Error in resetPassword:", error)
    }
})

const checkAuth = asyncHandler(async (req, res) => {
    try {
        console.log(req.userId);
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(400).json({ success: false, message: "User not found" });
        return res.status(200).json(new ApiResponse(200, user))

    } catch (error) {

        console.log("Error in check auth: ", error);
        res.status(400).json({ success: false, message: error.message })

    }
})

export { signup, login, logout, verifyEmail, forgetPassword, resetPassword, checkAuth }