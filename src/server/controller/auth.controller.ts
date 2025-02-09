import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { SignInFormSchema, SignupFormSchema } from "@/validation/auth.valid";
import { prisma } from "@/config/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/server/lib/state";
import { ErrorOTP } from "@/utils/ErrorResponse";
import { userRepository } from "@/server/controller/index";
import { ROLE, USER_STATUS } from "@/interface/Utils";
import { sendOtp } from "@/server/network/otp";
import { redirect } from "next/navigation";

export type AuthResponse = {
    msg: string,
    data: any,
    error: any,
    otpValid?: boolean,
}

export default class AuthController {
    constructor() {

    }

    async login(request: NextRequest, __: TContext): Promise<AuthResponse> {

        const json = await request.json()
        try {

            // Validate form fields
            const validatedFields = SignInFormSchema.safeParse(json)

            // If any form fields are invalid, return early
            if (!validatedFields.success) {
                return {
                    error: validatedFields.error.flatten().fieldErrors,
                    data: {},
                    otpValid: false,
                    msg: "Fail to login must validate field error"
                }
            }

            const valid = validatedFields.data
            // e.g. Hash the user's password before storing it

            // 3. Insert the user into the database or call an Auth Library's API
            const user = await prisma.users.findFirst(
                { where: { email: valid.email } }
            )

            if (!user) {
                throw new Error('User not exists!')
            }

            if (user.status !== USER_STATUS.COMPLETED) {
                throw new ErrorOTP('OTP Need To Validate', 401)
            }

            const validPassword = await bcrypt.compare(valid.password, user.password)
            if (!validPassword) {
                throw new Error('Password is incorrect')
            }
            // 4. Create user session
            await createSession(user)

            // 5. Redirect user
            const { password, ...UserDB } = user
            return {
                data: UserDB,
                msg: "Success Login",
                otpValid: true,
                error: ''
            }

        } catch (e) {

            if (e instanceof ErrorOTP) {
                return {
                    msg: e.message,
                    error: 'Fail Otp',
                    data: {},
                    otpValid: false,
                }
            }

            if (e instanceof Error) {
                return {
                    msg: e.message,
                    error: 'Something Error in Auth Service',
                    data: {},
                }
            }
            return {
                msg: 'An error occurred while creating your account.',
                error: 'Something Error in Auth Service',
                data: {},
            }
        }
    }

    async register(response: NextRequest, _context: TContext): Promise<AuthResponse> {
        const json = await response.json();
        // Validate form fields
        const validatedFields = SignupFormSchema.safeParse(json)

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                error: validatedFields.error.flatten().fieldErrors,
                data: {},
                otpValid: false,
                msg: "Fail to login must validate field error"
            }
        }

        // Call the provider or db to create a user...
        // 2. Prepare data for insertion into database
        const { name, email, password, phone, address } = validatedFields.data
        // e.g. Hash the user's password before storing it
        const hashedPassword = await bcrypt.hash(password, 10)

        // 3. Insert the user into the database or call an Auth Library's API
        const user = await userRepository.createOne({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: ROLE.USER,
        })

        if (!user) {
            return {
                msg: 'An error occurred while creating your account.',
                error: 'Something Error in Auth Service',
                data: {},
            }
        }

        // 4. Create user session
        // await createSession(user.id)
        await sendOtp({
            email: user.email,
            reason: USER_STATUS.OTP
        })

        // 5. Redirect user
        redirect('/otp')
    }

    async logout(_request: NextRequest, __: TContext): Promise<AuthResponse> {
        await deleteSession()
        return {
            msg: 'Success Logout',
            error: '',
            data: {},
        }
    }

}
