'use client'
import React from "react";
import { useOtpStore } from "@/store/otp";
import { CountdownButton } from "@/app/(auth)/otp/countdown";
import { OtpForm } from "@/app/(auth)/otp/OtpForm";

export default function Page() {
    const { store } = useOtpStore()

    return (
        <div className="flex items-center justify-center pt-20 ">
            <div className=" p-8 rounded shadow-md w-full max-w-sm">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">OTP Validation</h2>
                    { store.email && (
                        <p className={ '~text-sm/base text-base-content/50' }>
                            Was send this email { store.email }. please check the mail box
                        </p>
                    ) }
                </div>
                <CountdownButton/>
                <OtpForm/>
            </div>
        </div>
    );
};

