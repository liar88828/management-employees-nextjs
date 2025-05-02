'use client'
import React from "react";
import { useOtpStore } from "@/store/otp";
import { OtpCountdownTime } from "@/app/(auth)/otp/OtpCountdownButton";
import Link from "next/link";
import useOtpInput from "@/hook/useOtpInput";

export default function Page() {
    const { store, } = useOtpStore()
    const { otp, error, handleChange, handleSubmit, addOneMinute } = useOtpInput();

    return (
        <div className="card card-bordered bg-base-200">
            <div className="card-body">
                <h2 className="card-title">OTP Validation <span className={ 'text-success' }
                >{ store.successOtp && 'Otp Is Valid' }</span></h2>
                <p>
                    { store.email
                        ? <span>Was send this email { store.email }. please check the mail box</span>
                        : <span><OtpCountdownTime /></span>
                    }
                </p>

                <form onSubmit={ handleSubmit }>
                    <div className="flex justify-between mb-4">
                        <input
                            type="number"
                            value={ otp }
                            onChange={ handleChange }
                            className="input input-bordered w-full"
                            placeholder="Enter otp number ex: 123456"
                        />
                    </div>
                    { error && <p className="text-error text-sm mb-4">{ error }</p> }

                    <div className=" card-actions">

                        <button
                            type="submit"
                            className="btn btn-info btn-block"
                        >
                            Validate OTP
                        </button>
                        <button
                            type="button"
                            disabled={ store.remainingTime > 0 }
                            className="btn btn-primary  btn-block"
                            onClick={ addOneMinute }
                        >
                            Send email
                        </button>

                        <Link
                            href={ '/forget' }
                            className="btn btn-neutral "
                        >
                            Back
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
