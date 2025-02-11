'use client'
import React, { useState } from 'react';
import { useEmail } from "@/hook/useEmail";
import { useOtpStore } from "@/store/otp";

const useOtpInput = () => {
    const { validOTP } = useEmail()
    const { store } = useOtpStore()
    const [ otp, setOtp ] = useState('')
    const [ error, setError ] = useState<string>("");


    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        setError('');
        if (otp.length !== 6) {
            setError("Please enter a 6-digit OTP.");
        } else {
            validOTP.mutate({ email: store.email, otp });
            if (validOTP.isError) {
                setError("Invalid OTP. Please try again.");
            }
        }

    };

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setOtp(e.target.value)
    }

    return { otp, error, handleChange,  handleSubmit };
};

export default useOtpInput;
