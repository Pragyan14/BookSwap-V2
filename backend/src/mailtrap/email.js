import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEMail = async (email, verificationToken) => {
    const recipients = [{ email }]
    try {
        const response = mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        })

        console.log("Email sent successfully : ", response);

    } catch (error) {
        throw new ApiError("Error sending verification email: ", error.data);
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

        throw new Error("Error while sending Welcome email: ", error);
    }
}