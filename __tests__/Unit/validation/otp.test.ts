import { describe, expect, test } from "vitest"
import { validGenerateOtp, validOtp } from "../../../src/validation/validGenerateOtp";
import { validGenerateOtpExample, validOtpDataExample } from "../../../src/assets/otp.example";

describe('OTP Tests Validation', () => {

    test("validGenerateOtp validation", () => {
        const data = validGenerateOtp.parse(validGenerateOtpExample)
        expect(data).toEqual(validGenerateOtpExample)
    })

    test("validOtp validation", () => {
        const data = validOtp.parse(validOtpDataExample)
        expect(data).toEqual(validOtpDataExample)
    })

})
