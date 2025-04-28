'use server'
import { ResetPasswordFormSchema } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { STATUS_USER } from "@/interface/enum";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { OTPGenerate, OTPValid, ResetPassword } from "@/interface/server/param";
import { validGenerateOtp, validOtp } from "@/schema/validGenerateOtp";
import { toOtp } from "@/utils/toOtp";
import nodemailer from "nodemailer";
import { ActionResponse } from "@/interface/action";

export async function checkEmailAction(json: OTPGenerate): Promise<ActionResponse> {
    const { success, data, error } = validGenerateOtp.safeParse(json)
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            success: false,
            data: '',
            message: 'Error Validate'
        }
    }
    const user = await prisma.users.findUnique({
        where: { email: data.email }
    })

    if (!user) {
        throw "User Email doesn't exist"
    }

    // console.log(new Date())
    // console.log(user.otpDate)
    // console.log(user.otpDate < new Date())

    if (user.otpExpired > new Date()) {
        throw "Please Wait until OTP date is end "
    }

    const otp = toOtp({ length: 6 })
    // const otpValid = new Date(Date.now() + 60 * 60 * 1000)// Invalid Date
    // console.log(otpValid)
    await prisma.$transaction(async (tx) => {

        if (data.reason === STATUS_USER.OTP) {
            console.log("OTP")
            await tx.users.update({
                where: { id: user.id },
                data: {
                    otp,
                    otpExpired: data.time,
                    status: STATUS_USER.OTP,
                    // otpCount: { increment: 1 },
                }
            })

        } else if (data.reason === STATUS_USER.RESET) {
            console.log("RESET")
            await tx.users.update({
                where: { id: user.id },
                data: {
                    otp,
                    otpExpired: data.time,
                    status: STATUS_USER.RESET
                    // otpCount: { increment: 1 },
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
            to: data.email,
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
                console.log("Error sending email: ", error);
                throw error.message
            } else {
                console.log("Email sent: ", info.response);
            }
        });
    })

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

export async function checkOtpAction(json: OTPValid): Promise<ActionResponse> {
    const { success, data, error } = validOtp.safeParse(json)
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            success: false,
            data: '',
            message: 'Error Validate'
        }
    }
    const user = await prisma.users.findFirst({
        where: {
            email: data.email,
            // otp: data.otp
        }
    })

    if (!user) {
        throw "User Email is  not found"
    }

    if (user.otp === null) {
        throw "Otp Is Empty Please Send Email First"
    }

    if (user.otp !== data.otp) {
        throw "Otp Is Not Match"
    }

    return {
        message: "Success Validate Otp",
        data: user.status,
        success: true
    };
}

export async function resetPasswordAction({ password, confirm, email, otp }: ResetPassword): Promise<ActionResponse> {
    try {
        // Validate form fields
        const validatedFields = ResetPasswordFormSchema.safeParse({
            password,
            confirm,
            email,
            otp
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                success: false,
                data: '',
                message: 'Error Validate'
            }
        }

        const valid = validatedFields.data

        // 3. Insert the user into the database or call an Auth Library's API
        const user = await prisma.users.findUnique(
            {
                where: {
                    email: valid.email,
                    otp: valid.otp
                }
            }
        )

        if (!user) {
            throw new Error('Otp Or User are not exists!')
        }

        // if (user.status === STATUS_USER.RESET) {
        //     // console.log('will redirect to otp')
        //     // throw new Error('User is not Registered!. please go Otp')
        //     redirect('/otp')
        // }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                status: STATUS_USER.COMPLETED,
                otp: null,
                // otpExpired: null
            }
        })
        // await createSession({ usersId: user.id, role: user.role })
        redirect('/login')
    } catch (e) {

        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                success: false,
                data: '',
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An errors occurred while creating your account.',
            success: false,
            data: '',
            // prev: { email, password }

        }
    }
}
