'use server'
import bcrypt from "bcrypt";
import { ResetPasswordFormSchema } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { STATUS_USER } from "@/interface/enum";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { OTPGenerate, OTPValid, ResetPassword } from "@/interface/server/param";
import { otpValid, validOtp } from "@/schema/otp.valid";
import { toOtp } from "@/utils/toOtp";
import { ActionResponse } from "@/interface/action";
import { toDateIndoFull } from "@/utils/toDate";
import { nodemailerSendOtp } from "@/server/action/nodemailer.action";

export async function checkEmailAction(json: OTPGenerate): Promise<ActionResponse> {
    // console.log(json)
    const { success, data, error } = otpValid.safeParse(json)
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            success: false,
            prevData: null,
            message: 'Error Validate'
        }
    }

    const otp = toOtp({ length: 6 })
    // const otpValid = new Date(Date.now() + 60 * 60 * 1000)// Invalid Date
    // console.log(otpValid)
    await prisma.$transaction(async (tx) => {

        const userDB = await tx.users.findUnique({
            where: { email: data.email }
        })
        // console.log('---------------is executed---------------')

        if (!userDB) {
            throw "User Email doesn't exist"
        }

        // console.log(new Date())
        // console.log(userDB.otpExpired)
        // console.log(userDB.otpDate < new Date())

        if (userDB.otpExpired > new Date()) {
            throw `Please Wait until OTP date is end ${ toDateIndoFull(userDB.otpExpired) }`
        }

        if (data.reason === STATUS_USER.OTP) {
            console.log("OTP")
            await tx.users.update({
                where: { id: userDB.id },
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
                where: { id: userDB.id },
                data: {
                    otp,
                    otpExpired: data.time,
                    status: STATUS_USER.RESET
                    // otpCount: { increment: 1 },
                }
            })
        }

        await nodemailerSendOtp(otp, data.email)
    })

    // const cookieStore = await cookies()
    // cookieStore.set('otpSession',
    //     JSON.stringify({
    //         email: userDB.email,
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
        prevData: "Sorry OTP is not expose please check the email",
        success: true
    }

}

export async function checkOtpAction(json: OTPValid): Promise<ActionResponse> {
    const { success, data, error } = validOtp.safeParse(json)
    if (!success) {
        return {
            errors: error.flatten().fieldErrors,
            success: false,
            prevData: '',
            message: 'Error Validate'
        }
    }
    const user = await prisma.users.findFirst({
        where: {
            email: data.email,
            // otp: prevData.otp
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
        prevData: user.status,
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
                prevData: '',
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
                prevData: '',
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An errors occurred while creating your account.',
            success: false,
            prevData: '',
            // prev: { email, password }
        }
    }
}

export async function validUserByOtpAction(email: string) {
    await prisma.users.update({
        where: { email },
        data: {
            status: STATUS_USER.COMPLETED,
            otp: null
        }
    })
}
