import { ValidGenerateOtpType, ValidOtpType } from "@/validation/validGenerateOtp";

export const validGenerateOtpExample: ValidGenerateOtpType = {
    email: "example@example.com", // A valid email address
    time: new Date("2025-01-07T10:00:00Z"), // A valid date coerced into a `Date` object
    reason: "OTP", //
}

export const validOtpDataExample: ValidOtpType = {
    email: "example@example.com", // A valid email address
    otp: "123456", // A 6-character string
};