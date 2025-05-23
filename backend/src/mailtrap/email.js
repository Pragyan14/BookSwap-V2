import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEMail = async(email,verificationToken) => {
    const recipients = [{email}]
    try {
        const response = mailtrapClient.send({
            from: sender,
            to:recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken)
        })

        console.log("Email sent successfully : ", response);
        
    } catch (error) {   
        throw new ApiError("Error sending verification email: ", error.data);
    }
}