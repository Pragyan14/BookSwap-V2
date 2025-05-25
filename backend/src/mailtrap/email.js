import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEMail = async (email, verificationToken) => {
    const recipients = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            category: "Transactional Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Verification email sent successfully : ", response);

    } catch (error) {
        console.error("Failed to send verification email:", error);
        throw new ApiError(500,"Error sending verification email: ", error.message);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            template_uuid: "7a795865-6eaa-4676-8cf7-fd00ccc025a5",
            template_variables: {
                "company_info_name": "BookSwap",
                "name": name
            }
        })

        console.log("Welcome email sent successfully", response);


    } catch (error) {

        console.log("Error while sending Welcome email: ", error);

        throw new ApiError(500,"Error while sending welcome email: ", error.message);
    }
}

export const sendPasswordResetEmail = async(email,resetURL)=>{
    const recipients = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password reset"
        })

        console.log("Password reset email sent successfully", response);

    } catch (error) {

        console.log("Error while sending password reset email: ", error);
        throw new ApiError(500,"Error while sending password reset email: ", error.message);
    }
}

export const sendResetSuccessEmail = async(email) => {
    const recipients = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Reset your successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password reset"
        })

        console.log("Password reset success email sent successfully", response);

    } catch (error) {

        console.log("Error while sending password reset email: ", error);
        throw new ApiError(500,"Error while sending password reset email: ", error.message);
    }
}