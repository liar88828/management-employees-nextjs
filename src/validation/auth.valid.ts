import { z } from "zod";
import { zodAddress, zodEmail, zodPassword, zodPhone } from "@/validation/zod.valid";
import { PropertyMap } from "@/interface/types";

export type FormStateRegister = {
    prev: PropertyMap<FormFail>
    errors?: {
        address?: string[]
        email?: string[]
        name?: string[]
        password?: string[]
        phone?: string[]
        confirm?: string[]
    }
    message: string
} | undefined


export type FormState = {
    errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
    }
    message?: string
} | undefined

export const SignupFormSchema = z.object({
    address: zodAddress,
    confirm: z.string(),
    email: zodEmail,
    id: z.string().uuid().optional(),
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
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
    confirm: z.string(),
    email: zodEmail,
    password: zodPassword,
})
.refine((data) => data.password === data.confirm,
    {
        message: "Passwords don't match",
        path: [ "confirm" ],
    });

export type FormFail = {
    address: string
    email: string
    name: string
    phone: string
};

export type SignUpFormSchemaType = z.infer<typeof SignupFormSchema>
export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>
export type ForgetFormSchemaType = z.infer<typeof ForgetFormSchema>
export type ResetFormSchemaType = z.infer<typeof ResetFormSchema>
