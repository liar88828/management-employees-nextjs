import { z } from "zod";

export const zodPhone = z
.string()
.regex(/^(?:\+62|08)/, {
    message: 'Phone number must start with +62 or 08.',
})
.min(10, { message: 'Phone number must be at least 10 characters long.' })
.trim()

export const zodAddress = z
.string({ required_error: "address is required" })
.min(10)
.max(100)

export const zodPassword = z
.string()
.min(8, { message: 'Be at least 8 characters long' })
.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
.regex(/[0-9]/, { message: 'Contain at least one number.' })
// .regex(/[^a-zA-Z0-9]/, {
// 	message: 'Contain at least one special character.',
// })
.trim()

export const zodEmail = z.string()
.email({ message: 'Please enter a valid email.' })
.trim()

export const zodDesc = z.string().min(1).max(200)

export const zodInt = z.number().int().nonnegative()

export const UUIDSchema = z.string().uuid()