'use client'
import React, { useState } from 'react';
import { useEmail } from "@/hook/useEmail";
import { useOtpStore } from "@/store/otp";
import { validUserByOtpAction } from "@/server/action/reset-password";
import { useRouter } from "next/navigation";

export default function useOtpInput() {
    const router = useRouter();
    const { onCheckOtp, onCheckEmail } = useEmail()
    const { store, setData, reset } = useOtpStore()
    // const [ otp, setOtp ] = useState('')
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
            const response = await onCheckOtp({ email: store.email, otp: store.otp });
            if (response.success) {
                setData({ successOtp: true });
                setError(null);
                await validUserByOtpAction(store.email)
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
        await onCheckEmail({
            email: store.email,
            time: new Date(moreTime),
            reason: store.reason
        })
    };

    return { otp: store.otp, error, handleChange, handleSubmit, addOneMinute };
};
