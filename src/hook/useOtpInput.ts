'use client'
import React, { useState } from 'react';
import { useEmail } from "@/hook/useEmail";
import { useOtpStore } from "@/hook/otp";

const useOtpInput = () => {
    const { onValidate } = useEmail()
    const { store } = useOtpStore()
    const [ otp, setOtp ] = useState('')
    const [ error, setError ] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
        } else {
            const response = await onValidate({ email: store.email, otp });
            if (!response.success) {
                setError("Invalid OTP. Please try again.");
            }
        }
    };

    return { otp, error, handleChange,  handleSubmit };
};

export default useOtpInput;
