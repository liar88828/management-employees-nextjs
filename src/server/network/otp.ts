import { OTPGenerate } from "@/interface/server/param";

export const sendOtp = async ({ email, reason }: Omit<OTPGenerate, 'time'>) => {

    const sendEmail: OTPGenerate = {
        email: email,
        reason,
        time: new Date(Date.now() + 2 * 60 * 1000),
    };

    return fetch('http://localhost:3000/api/email/otp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendEmail)
    })
}