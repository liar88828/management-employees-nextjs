import { z } from "zod";
import { zodAddress, zodEmail, zodPassword, zodPhone } from "@/schema/zod.valid";
import { PropertyMap } from "@/interface/types";
import { ActionResponse } from "@/interface/action";

export const SignupFormSchema = z.object({
    address: zodAddress,
    confirm: z.string().min(2),
    email: zodEmail,
    id: z.string().uuid().optional(),
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),//.trim()
    password: zodPassword,
    phone: zodPhone,

})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });

export const SignInFormSchema = z.object({
    email: zodEmail,
    password: zodPassword,
})

export const ForgetFormSchema = z.object({
    email: zodEmail,
})

export const ResetFormSchema = z.object({
    confirm: z.string().min(2),
    email: zodEmail,
    password: zodPassword,
})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });

export const ResetPasswordFormSchema = z.object({
    confirm: z.string().min(2),
    email: zodEmail,
    otp: z.string().min(6),
    password: zodPassword,
})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });

export type FormStateRegister = ActionResponse<
        PropertyMap<{
            address: string
            email: string
            name: string
            phone: string
        }>,
        {
            address?: string[]
            email?: string[]
            name?: string[]
            password?: string[]
            phone?: string[]
            confirm?: string[]
        }
    >
    | undefined

export type FormStateLogin =
    ActionResponse<
        PropertyMap<{
            email: string
            password: string
        }>,
        {
            name?: string[]
            email?: string[]
            password?: string[]
        }
    >
    | undefined

export type SignUpFormSchemaType = z.infer<typeof SignupFormSchema>
export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>
export type ForgetFormSchemaType = z.infer<typeof ForgetFormSchema>
export type ResetPasswordFormSchemaType = z.infer<typeof ResetPasswordFormSchema>
export type ResetFormSchemaType = z.infer<typeof ResetFormSchema>
