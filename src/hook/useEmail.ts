'use client'
import { OTPGenerate, OTPValid } from "@/interface/server/param";
import { useRouter } from "next/navigation";
import { otpGenerate, otpValidate } from "@/server/controller/otpController";
import { onAction } from "@/server/action/OnAction";
import { USER_STATUS } from "@/interface/enum";

export const useEmail = () => {
    const route = useRouter()

    const onGenerate = async (data: OTPGenerate) => {
        return onAction(() => otpGenerate(data),
            'Success Generate Otp Please Check the Your Email Address')
    }

    const onValidate = async (data: OTPValid) => {
        return onAction(async () => {
                const response = await otpValidate(data)
                if (response.data === USER_STATUS.OTP) {
                    console.log('otp')
                    route.push('/home')
                }
                if (response.data === USER_STATUS.RESET) {
                    console.log('reset')
                    route.push('/reset')
                }
                return response
            },
            'Success Generate Otp Please Check the Your Email Address')
    }

    return {
        onGenerate,
        onValidate
    }
}
