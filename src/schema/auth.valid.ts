import { z } from "zod";
import { zodEmail, zodPassword, zodPhone } from "@/schema/zod.valid";
import { Users } from "@prisma/client";

export const registerFormSchema: z.ZodType<
    Pick<Users, 'name' | 'email' | 'phone'>
    & { password: string, confirm: string }
> = z.object({
    confirm: z.string().min(2),
    email: zodEmail,
    name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),//.trim()
    password: zodPassword,
    phone: zodPhone,
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

export const loginFormSchema = z.object({
    email: zodEmail,
    password: zodPassword,
})
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>
