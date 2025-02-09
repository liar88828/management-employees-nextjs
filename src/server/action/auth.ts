'use server'
import { prisma } from "@/config/prisma";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";
import { createSession } from "@/server/lib/state";
import {
    ForgetFormSchema,
    FormFail,
    FormState,
    FormStateRegister,
    ResetFormSchema,
    SignInFormSchema,
    SignupFormSchema
} from "@/validation/auth.valid";
import { userRepository } from "@/server/controller";
import { ROLE, USER_STATUS } from "@/interface/Utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { sendOtp } from "@/server/network/otp";
import { checkPassword } from "../lib/password";
import { PropertyMap } from "@/interface/types";

export async function signUp(state: FormStateRegister, formData: FormData): Promise<FormStateRegister> {
    // Validate form fields
    const addressRaw = formData.get('address') ?? ''
    const emailRaw = formData.get('email') ?? ''
    const nameRaw = formData.get('name') ?? ''
    const passwordRaw = formData.get('password') ?? ''
    const phoneRaw = formData.get('phone') ?? ''
    const confirmRaw = formData.get('confirm') ?? ''

    const failForm: PropertyMap<FormFail> = {
        address: addressRaw,
        email: emailRaw,
        name: nameRaw,
        phone: phoneRaw,
    }

    const validatedFields = SignupFormSchema.safeParse({
        address: addressRaw,
        confirm: confirmRaw,
        email: emailRaw,
        name: nameRaw,
        password: passwordRaw,
        phone: phoneRaw,
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            prev: failForm,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Fail Register Please Complete Your Form"
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
            prev: failForm,
            message: 'An error occurred while creating your account.',
        }
    }

    // 4. Create user session
    // await createSession(user.id)
    await sendOtp({
        email: user.email,
        reason: 'OTP'
    })

    // 5. Redirect user
    redirect('/otp')

}

export async function signIn(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {

        // Validate form fields
        const validatedFields = SignInFormSchema.safeParse({
            email,
            password,
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {

                errors: validatedFields.error.flatten().fieldErrors,
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
        // console.log(user.isValidate)
        if (user.status === USER_STATUS.OTP) {
            // console.log('will redirect to otp')
            // throw new Error('User is not Registered!. please go Otp')
            redirect('/otp')
        }

        const validPassword = await bcrypt.compare(valid.password, user.password)

        if (!validPassword) {
            throw new Error('Password is incorrect')

        }
        // 4. Create user session
        await createSession(user)

        // 5. Redirect user
        if (user.role === 'ADMIN') {
            redirect('/admin')
        } else if (user.role === 'USER') {
            redirect('/profile')
        }

    } catch (e) {

        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An error occurred while creating your account.',
            // prev: { email, password }

        }
    }

}

export async function forget(state: FormState, formData: FormData) {
    const email = formData.get('email') as string;
    try {

        // Validate form fields
        const validatedFields = ForgetFormSchema.safeParse({
            email,
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const valid = validatedFields.data

        // 3. Insert the user into the database or call an Auth Library's API
        const user = await prisma.users.findFirst(
            { where: { email: valid.email } }
        )

        if (!user) {
            throw new Error('User not exists!')
        }

        await sendOtp({
            email: user.email,
            reason: 'RESET'
        })

        redirect('/otp')

    } catch (e) {

        if (isRedirectError(e)) {
            redirect('/otp')
        }

        if (e instanceof Error) {
            return {
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An error occurred while creating your account.',
            // prev: { email, password }

        }
    }

}

export async function reset(state: FormState, formData: FormData) {
    const password = formData.get('password') as string;
    const confirm = formData.get('confirm') as string;
    const email = formData.get('email') as string;
    try {
        // Validate form fields
        const validatedFields = ResetFormSchema.safeParse({
            password,
            confirm,
            email,
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const valid = validatedFields.data

        // 3. Insert the user into the database or call an Auth Library's API
        const user = await prisma.users.findFirst(
            { where: { email: valid.email } }
        )

        if (!user) {
            throw new Error('User not exists!')
        }

        if (user.status === USER_STATUS.RESET) {
            // console.log('will redirect to otp')
            // throw new Error('User is not Registered!. please go Otp')
            redirect('/otp')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.users.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                status: USER_STATUS.COMPLETED
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
                message: e.message,
                // prev: { email, password }
            }
        }
        return {
            message: 'An error occurred while creating your account.',
            // prev: { email, password }

        }
    }

}

export async function changeProfile(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        address: formData.get('address'),
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
        confirm: formData.get('confirm'),
        phone: formData.get('phone'),
        id: formData.get('id'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { name, email, password, phone, address, id } = validatedFields.data

    const userDB = await userRepository.findByIdValid(id)

    await checkPassword(password, userDB.password)

    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Auth Library's API
    const user = await userRepository.updateOne(
        {
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: ROLE.USER,
        },
        userDB.id
    )

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    // 4. Create user session
    await createSession(user)

    // 5. Redirect user
    redirect('/profile')
}
