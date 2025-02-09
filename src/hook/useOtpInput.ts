'use client'
import React, { useState } from 'react';
import { useEmail } from "@/hook/useEmail";
import { useOtpStore } from "@/store/otp";

const useOtpInput = () => {
    const { validOTP } = useEmail()
    const { store, } = useOtpStore()
    const [ otp, setOtp ] = useState<string[]>(Array(6).fill(""));
    const [ error, setError ] = useState<string>("");

    const handleChange = (value: string, index: number) => {
        if (value.length > 1) return; // Allow only single digit

        const newOtp = [ ...otp ];
        newOtp[index] = value;
        setOtp(newOtp);
        setError("");

        // Replace subsequent values with empty strings when any square is updated
        for (let i = index + 1; i < 6; i++) {
            newOtp[i] = "";
        }
        setOtp(newOtp);

        // Automatically focus on the next input if a digit is entered
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${ index + 1 }`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${ index - 1 }`);
            prevInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        const enteredOtp = otp.join("");
        setError('');
        if (enteredOtp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
        } else {
            validOTP.mutate({ email: store.email, otp: enteredOtp });
            if (validOTP.isError) {
                setError("Invalid OTP. Please try again.");
            }
        }

    };

    return { otp, error, handleChange, handleKeyDown, handleSubmit };
};

export default useOtpInput;
