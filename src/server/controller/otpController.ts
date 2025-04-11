'use server'
import { OTPGenerate, OTPValid } from "@/interface/server/param";
import { validGenerateOtp, validOtp } from "@/schema/validGenerateOtp";
import { prisma } from "@/config/prisma";
import { toOtp } from "@/utils/toOtp";
import nodemailer from "nodemailer";
import { createSession } from "@/secure/cookies";
import { ResponseData } from "@/interface/server/TResponse";
import { USER_STATUS } from "@/interface/enum";

export async function otpGenerate(json: OTPGenerate): Promise<ResponseData> {
    const { time, email, reason } = validGenerateOtp.parse(json)
    const user = await prisma.users.findFirst({ where: { email } })

    if (!user) {
        throw new Error("User doesn't exist")
    }

    // console.log(new Date())
    // console.log(user.otpDate)
    // console.log(user.otpDate < new Date())

    if (user.otpRegenerate > new Date()) {
        throw new Error("Please Wait until OTP date is end ")
    }

    const otp = toOtp({ length: 6 })
    const otpValid = new Date(Date.now() + 60 * 60 * 1000)// Invalid Date
    // console.log(otpValid)

    if (reason === USER_STATUS.OTP) {
        console.log("OTP")
        await prisma.users.update({
            where: { id: user.id },
            data: {
                otp,
                otpRegenerate: time,
                otpCount: { increment: 1 },
                status: USER_STATUS.OTP,
            }
        })

    } else if (reason === USER_STATUS.RESET) {
        console.log("RESET")
        await prisma.users.update({
            where: { id: user.id },
            data: {
                otp,
                otpRegenerate: time,
                otpCount: { increment: 1 },
                status: USER_STATUS.RESET
            }
        })
    }

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "🚀 Hello from Nodemailer!",
        text: `Your OTP is: ${ otp }`,
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
            <h2 style="color: #007BFF;">Hello from Nodemailer! 🎉</h2>
            <p>Here is your OTP:</p>
            <p style="font-size: 1.5rem; font-weight: bold; color: #28a745;">${ otp }</p>
            <p style="font-size: 0.9rem; color: #6c757d;">If you didn't request this email, please ignore it.</p>
        </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
        } else {
            console.log("Email sent: ", info.response);
        }
    });

    // const cookieStore = await cookies()
    // cookieStore.set('otpSession',
    //     JSON.stringify({
    //         email: user.email,
    //         otpValid
    //     })
    //     , {
    //         httpOnly: true,
    //         secure: true,
    //         expires: otpValid,
    //         sameSite: 'lax',
    //         path: '/',
    //     })

    return {
        message: "Success Generate Otp",
        data: "Sorry OTP is not expose please check the email",
        success: true
    }

}

export async function otpValidate(json: OTPValid): Promise<ResponseData> {
    const { email, otp } = validOtp.parse(json)
    const user = await prisma.users.findFirst({ where: { email } })

    if (!user) {
        throw new Error("User not found")
    }

    // if (user.otpExpired < new Date()) {
    //     throw new Error("The Otp Is Expired")
    // }

    if (user.otp !== otp) {
        throw new Error("Otp Is Not Match")
    }

    if (user.status === USER_STATUS.OTP
        || user.status === USER_STATUS.RESET
    ) {

        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                otp: null,
                status: USER_STATUS.COMPLETED
            }
        })

        await createSession(user)

    }

    return {
        message: "Success Validate Otp",
        data: user.status,
        success: true
    };
}

//
// export const sendOtp = async ({ email, reason }: Omit<OTPGenerate, 'time'>) => {
//
//     const sendEmail: OTPGenerate = {
//         email: email,
//         reason,
//         time: new Date(Date.now() + 2 * 60 * 1000),
//     };
//
//     return fetch('http://localhost:3000/api/email/otp', {
//         method: 'POST',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(sendEmail)
//     })
// }