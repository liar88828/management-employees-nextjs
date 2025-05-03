'use client'
import React, { useState } from "react";
import { useOtpStore } from "@/store/otp";
import { useEmail } from "@/hook/useEmail";

export default function ResetCheckOtp() {
    const { onCheckOtp } = useEmail()
    const { store, setData } = useOtpStore()
    const [ messageError, setMessageError ] = useState<string | null>()
    const onValidateForm = async () => {
        try {
            setData({ loading: true });
            setMessageError(null)
            if (store.otp.length !== 6) {
                // setData({
                //     message: "Please enter a 6-digit OTP.",
                //     error: true
                // });
                setMessageError("Please enter a 6-digit OTP.")

            } else {
                const response = await onCheckOtp({ email: store.email, otp: store.otp });
                if (response.success) {
                    setData({ successOtp: true });
                } else {
                    setMessageError(response.message)
                    setData({ successOtp: false });
                }
            }
        } catch (e) {
            console.error(e);
            setMessageError(e as string)
            setData({ successOtp: false });

        } finally {
            setData({
                loading: false
            });
        }
    };

    return (
        <div className="card card-bordered bg-base-200">
            <div className="card-body">
                <h2 className="card-title">Check Otp
                    { store.successOtp && <span className={ 'text-success' }>Is True</span> }
                </h2>
                { store.email && (
                    <p className={ '~text-sm/base text-base-content/50' }>
                        Was send this email { store.email }. please check the mail box
                    </p>
                ) }
                <div>
                    <div className="form-control w-full">
                        <input
                            type="text"
                            value={ store.otp }
                            onChange={ (e) => setData({ otp: e.target.value }) }
                            className="input input-bordered w-full"
                            placeholder="Enter otp number ex: 123456"
                        />

                        { store.errorOtp && <p className="text-red-500 text-sm mt-1">{ store.errorOtp }</p> }
                        { messageError && <p className="text-error text-sm mt-1">{ messageError }</p> }
                    </div>
                    <div className=" space-y-10">
                        <button
                            onClick={ () => onValidateForm() }
                            className="btn btn-info w-full"
                        >
                            Validate OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
