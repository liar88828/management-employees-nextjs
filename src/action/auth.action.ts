'use server'
import { prisma } from "@/config/prisma";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { createSession } from "@/secure/cookies";
import { loginFormSchema, LoginFormSchemaType, registerFormSchema, RegisterFormSchemaType } from "@/schema/auth.valid";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ROLE, STATUS_USER } from "@/interface/enum";
import { toRandom } from "@/utils/toRandom";
import { nodemailerSendOtp } from "@/action/nodemailer.action";
import { ResponseAction } from "@/interface/model";

export async function authRegisterAction(formDataRaw: RegisterFormSchemaType): Promise<ResponseAction> {

    try {
        const { data, success, error } = registerFormSchema.safeParse(formDataRaw)
        // If any form fields are invalid, return early
        if (!success) {
            console.log("failed registered!");
            return {
                response: null,
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Fail Register Please Complete Your Form"
            }
        }

        // Call the provider or db to create a user...
        // 2. Prepare prevData for insertion into database

        const userDB = await prisma.users.findUnique({
            where: { email: data.email }
        })

        if (userDB) {
            return {
                message: "User Email is already exists!",
                success: false

            }
            // redirect('/login?message=User already exists!')
        }

        const userPhone = await prisma.users.findUnique({
            where: { phone: data.phone }
        })

        if (userPhone) {
            return {
                message: "User Phone is already exists!",
                success: false

            }
            // redirect('/login?message=User already exists!')
        }

        // e.g. Hash the user's password before storing it
        const hashedPassword = await bcrypt.hash(data.password, 10)
        // 3. Insert the user into the database or call an Auth Library's API
        const sendOtp = toRandom({ length: 6 });
        const user = await prisma.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                role: ROLE.USER,
                imgPass: toRandom({ length: 16, includeAlphabets: true, includeDigits: true }),
                statusEmployee: STATUS_USER.OTP,
                otpExpired: new Date(Date.now() + 60 * 1000),
                otp: sendOtp
            }
        })

        await nodemailerSendOtp(sendOtp, data.email)

        // 4. Create user session
        // await createSession(user.id)
        // await _otpGenerate({
        //     time: new Date(Date.now() + 60 * 1000),
        //     // time: new Date(Date.now() + 60 * 60 * 1000),
        //     email: user.email,
        //     reason: 'OTP'
        // })

        // 5. Redirect user
        // redirect('/sendOtp')

        return {
            success: true,
            message: "Successfully registered!",
        }
    } catch (e) {
        console.log(e)
        return {
            success: false,
            message: "Something went wrong",

        }

    }
}

export async function authLoginAction(formDataRaw: LoginFormSchemaType): Promise<ResponseAction> {
    try {
        const validatedFields = loginFormSchema.safeParse(formDataRaw)
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Validate Error",
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const valid = validatedFields.data
        const user = await prisma.users.findFirst(
            { where: { email: valid.email } }
        )

        if (!user) {
            // throw new Error('User not exists!')
            return {
                message: 'User not exists!',
                success: false
            }
        }
        if (user.statusEmployee === STATUS_USER.OTP) {
            redirect('/otp')
        }

        const validPassword = await bcrypt.compare(valid.password, user.password)
        if (!validPassword) {
            // throw new Error('Password is incorrect')
            return {
                message: 'Password is incorrect',
                success: false
            }
        }
        // 4. Create user session
        await createSession(user)

        return {
            success: true,
            message: "Login Successful!",
            response: user
        }
    } catch (e) {
        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                response: null,
                success: false,
                message: e.message,
            }
        }

        return {
            response: null,
            success: false,
            message: 'An errors occurred while creating your account.',
        }
    }

}
