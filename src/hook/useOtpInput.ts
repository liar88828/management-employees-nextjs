'use client'
import React, { useState } from 'react';
import { useOtpStore } from "@/store/otp";
import { checkEmailAction, checkOtpAction, validOtpAction } from "@/action/reset-password.action";
import { useRouter } from "next/navigation";

export default function useOtpInput() {
    const router = useRouter();
    const { store, setData, reset } = useOtpStore()
    const [ error, setError ] = useState<string | null>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ otp: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (store.otp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
        } else {
            const response = await checkOtpAction({ email: store.email, otp: store.otp });
            if (response.success) {
                setData({ successOtp: true });
                setError(null);
                await validOtpAction(store.email)
                reset()
                router.push('/login')
            } else {
                setData({ successOtp: false });
                setError("Invalid OTP. Please try again.");
            }
        }
    };
    const addOneMinute = async () => {
        // let myTime = store.time ?? 0
        let moreTime = Date.now() + 62 * 1000
        setData({ time: moreTime })
        await checkEmailAction({
            email: store.email,
            time: new Date(moreTime),
            reason: store.reason
        })
    };

    return { otp: store.otp, error, handleChange, handleSubmit, addOneMinute };
};
