'use client'

import { OTPGenerate, OTPValid, ResetPassword } from "@/interface/server/param";
import { useRouter } from "next/navigation";
import { onAction } from "@/server/action/OnAction";
import { checkEmailAction, checkOtpAction, resetPasswordAction } from "@/server/action/reset-password";

export const useEmail = () => {
    const route = useRouter()

    const onCheckEmail = async (data: OTPGenerate) => {
        return onAction(async () => checkEmailAction(data),
            'Success Generate Otp Please Check the Your Email Address')
    }

    const onCheckOtp = async (data: OTPValid) => {
        return onAction(async () => {
                // if (response.data === STATUS_USER.OTP) {
                //     console.log('otp')
                //     route.push('/home')
                // }
                // if (response.data === STATUS_USER.RESET) {
                //     console.log('reset')
                //     route.push('/reset')
                // }
                return checkOtpAction(data)
            },
            'Success Generate Otp Please Check the Your Email Address')
    }
    const onReset = async (data: ResetPassword) => {
        return onAction(async () => {
                // if (response.data === STATUS_USER.OTP) {
                //     console.log('otp')
                //     route.push('/home')
                // }
                // if (response.data === STATUS_USER.RESET) {
                //     console.log('reset')
                //     route.push('/reset')
                // }
                return await resetPasswordAction(data)
            },
            'Success Generate Otp Please Check the Your Email Address')
    }
    return {
        onCheckEmail,
        onCheckOtp,
        onReset
    }
}
