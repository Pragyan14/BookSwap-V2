import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE} from "./emailTemplates.js";
import { ApiError } from "../utils/ApiError.js";
import { transporter } from "./nodemailer.config.js"

export const sendVerificationEmail = async (email, verificationURL) => {
    try {
        const response = await transporter.sendMail({
            from: '"BookSwap" <noreply_BookSwap@gmail.com>',
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationURL}", verificationURL), // HTML body
        })

        console.log("Verification email sent successfully : ", response.response);

    } catch (error) {
        console.log("Failed to send verification email:", error);
        throw new ApiError(500, "Error while sending verification email");
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: '"BookSwap" <noreply_BookSwap@gmail.com>',
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })

        console.log("Password reset email sent successfully", response.response);

    } catch (error) {

        console.log("Error while sending password reset email: ", error);
        throw new ApiError(500, "Error while sending password reset email: ", error);
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: '"BookSwap" <noreply_BookSwap@gmail.com>',
            to: email,
            subject: "Password reset successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })

        console.log("Password reset success email sent successfully", response.response);

    } catch (error) {

        console.log("Error while sending password reset success email: ", error);
        throw new ApiError(500, "Error while sending password reset success email: ", error);
    }
}

export const sendWelcomeEmail = async (email,name) => {
    try {
        const response = await transporter.sendMail({
            from: '"BookSwap" <noreply_BookSwap@gmail.com>',
            to: email,
            subject: "Welcome to BookSwap",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        })

        console.log("Welcome email sent successfully", response.response);

    } catch (error) {

        console.log("Error while sending welcome email: ", error);
        throw new ApiError(500, "Error while sending welcome email: ", error);
    }
}