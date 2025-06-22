'use server'
import bcrypt from "bcrypt";
import { ResetPasswordFormSchema } from "@/schema/auth.valid";
import { prisma } from "@/config/prisma";
import { STATUS_USER } from "@/interface/enum";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { OTPGenerate, OTPValid, ResetPassword } from "@/interface/server/param";
import { otpValid, validOtp } from "@/schema/otp.valid";
import { toRandom } from "@/utils/toRandom";
import { toDateIndoFull } from "@/utils/toDate";
import { nodemailerSendOtp } from "@/action/nodemailer.action";
import { ResponseAction } from "@/interface/model";


export async function checkEmailAction(json: OTPGenerate): Promise<ResponseAction> {
    // console.log(json)
    const { success, data, error } = otpValid.safeParse(json)
    if (!success) {
        return {
            response: null,
            errors: error.flatten().fieldErrors,
            success: false,
            message: 'Error Validate'
        }
    }

    const otp = toRandom({ length: 6 })
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
                    statusUser: STATUS_USER.OTP,
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
                    statusUser: STATUS_USER.RESET
                    // otpCount: { increment: 1 },
                }
            })
        }

        await nodemailerSendOtp(otp, data.email)
    })

    return {
        response: null,
        message: "Success Generate Otp",
        success: true
    }

}

export async function checkOtpAction(json: OTPValid): Promise<ResponseAction> {
    const { success, data, error } = validOtp.safeParse(json)
    if (!success) {
        return {
            response: null,
            errors: error.flatten().fieldErrors,
            success: false,
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
        success: true
    };
}

export async function resetPasswordAction({ password, confirm, email, otp }: ResetPassword): Promise<ResponseAction> {
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
            return {
                message: 'Otp Or User are not exists!',
                success: false
            }
        }

        // if (user.statusEmployee === STATUS_USER.RESET) {
        //     // console.log('will redirect to otp')
        //     // throw new Error('User is not Registered!. please go Otp')
        //     redirect('/otp')
        // }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                statusUser: STATUS_USER.COMPLETED,
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
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An errors occurred while creating your account.',
            success: false,
            // prev: { email, password }
        }
    }
}

export async function validOtpAction(email: string) {
    await prisma.users.update({
        where: { email },
        data: {
            statusUser: STATUS_USER.COMPLETED,
            otp: null
        }
    })
}
