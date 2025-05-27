'use client'

import { OTPGenerate, OTPValid, ResetPassword } from "@/interface/server/param";
import { useRouter } from "next/navigation";
import { toAction } from "@/utils/toAction";
import { checkEmailAction, checkOtpAction, resetPasswordAction } from "@/server/action/reset-password.action";

export const useEmail = () => {
    const route = useRouter()

    const onCheckEmail = async (data: OTPGenerate) => {
        return toAction(async () => checkEmailAction(data),
            'Success Validate Generate Otp')
    }

    const onCheckOtp = async (data: OTPValid) => {
        return toAction(async () => {
                // if (response.prevData === STATUS_USER.OTP) {
                //     console.log('otp')
                //     route.push('/home')
                // }
                // if (response.prevData === STATUS_USER.RESET) {
                //     console.log('resetAction')
                //     route.push('/resetAction')
                // }
                return checkOtpAction(data)
            },
            'Success Generate Otp Please Check the Your Email Address')
    }
    const onReset = async (data: ResetPassword) => {
        return toAction(async () => {
                // if (response.prevData === STATUS_USER.OTP) {
                //     console.log('otp')
                //     route.push('/home')
                // }
                // if (response.prevData === STATUS_USER.RESET) {
                //     console.log('resetAction')
                //     route.push('/resetAction')
                // }
                return await resetPasswordAction(data)
            },
            'Success Reset Password')
    }
    return {
        onCheckEmail,
        onCheckOtp,
        onReset
    }
}
