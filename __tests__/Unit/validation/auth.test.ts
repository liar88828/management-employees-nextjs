import { describe, expect, test } from "vitest"
import {
    ForgetFormSchema,
    ResetFormSchema,
    SignInFormSchema,
    SignupFormSchema
} from "../../../src/validation/auth.valid";
import { forgetExample, resetExample, signInExample, signUpExample } from "../../../src/assets/auth.example";

describe('Test auth validation', () => {

    describe('validation signup', () => {
        test("Sign up valid test SUCCESS", () => {
            const data = SignupFormSchema.parse(signUpExample)
            expect(data).toEqual(signUpExample)
        })

        test("Sign up valid test FALSE ", () => {
            signUpExample.confirm = 'false'
            const data = SignupFormSchema.safeParse(signUpExample)
            expect(data).not.toEqual(signUpExample)
        })
    })

    describe('validation signIn', () => {
        test("signIn valid test SUCCESS", () => {
            const data = SignInFormSchema.safeParse(signInExample)
            expect(data.data).toEqual(signInExample)
        })

        test("signIn valid test FALSE ", () => {
            signInExample.password = 'false'
            const data = SignInFormSchema.safeParse(signInExample)
            // @ts-ignore
            expect(data?.error.flatten().fieldErrors).toEqual({
                "password": [
                    "Be at least 8 characters long",
                    "Contain at least one number.",
                ],
            })
        })
    })

    describe('validation Forget', () => {
        test("forget valid test SUCCESS", () => {
            const data = ForgetFormSchema.safeParse(forgetExample)
            expect(data.data).toEqual(forgetExample)
        })

        test("forget valid test FALSE ", () => {
            forgetExample.email = 'false'
            const data = ForgetFormSchema.safeParse(forgetExample)
            // @ts-ignore
            expect(data?.error.flatten().fieldErrors).toEqual(
                {
                    "email": [ "Please enter a valid email.", ]
                })
        })
    })

    describe('validation reset', () => {
        test("reset valid test SUCCESS", () => {
            const data = ResetFormSchema.safeParse(resetExample)
            expect(data.data).toEqual(resetExample)
        })

        test("reset valid test FALSE ", () => {
            resetExample.email = 'false'
            resetExample.password = 'false'
            const data = ResetFormSchema.safeParse(resetExample)
            // @ts-ignore
            expect(data?.error.flatten().fieldErrors).toEqual(
                {
                    "confirm": [
                        "Passwords don't match",
                    ],
                    "email": [
                        "Please enter a valid email.",
                    ],
                    "password": [
                        "Be at least 8 characters long",
                        "Contain at least one number.",
                    ],
                })
        })
    })

})
