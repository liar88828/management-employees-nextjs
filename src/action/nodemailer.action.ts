'use server'
import { transporter } from "@/config/nodemail";
import { mailOtpTemplate } from "@/utils/otpTemplate";

export async function nodemailerSendOtp(otp: string, email: string) {
    transporter.sendMail(mailOtpTemplate(otp, email),
        (error, info) => {
            if (error) {
                console.log("Error sending email: ", error);
                throw error.message
            } else {
                console.log("Email sent: ", info.response);
            }
        });
}
