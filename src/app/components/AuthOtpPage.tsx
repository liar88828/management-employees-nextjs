'use client'
import { useOtpStore } from "@/store/otp";
import useOtpInput from "@/hook/useOtpInput";
import Link from "next/link";
import React from "react";
import { Countdown } from "@/app/components/AuthResetPage";

export function AuthOtpPage() {
    const { store, setData } = useOtpStore()
    const { otp, error, handleChange, handleSubmit, addOneMinute } = useOtpInput();

    return (
        <div className="card card-bordered bg-base-200">
            <div className="card-body">
                <h2 className="card-title">OTP Validation <span className={ 'text-success' }
                >{ store.successOtp && 'Otp Is Valid' }</span></h2>
                <p>
                    { store.email
                        ? <span>Email telah dikirim ke {store.email}. Silakan periksa kotak masuk Anda.</span>
                        : <span><Countdown setData={ (now) => setData({ remainingTime: now }) }
                                           targetTime={ store.time }
                        /></span>
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

                        <button type="submit" className="btn btn-info btn-block">Validate OTP</button>
                        <button type="button" disabled={ store.remainingTime > 0 }
                                className="btn btn-primary  btn-block" onClick={ addOneMinute }
                        >
                            Send email
                        </button>
                        <Link href={ '/login' } className="btn btn-neutral ">Back</Link></div>
                </form>
            </div>
        </div>
    );
}
