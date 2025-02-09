'use client'
import React from "react";
import useOtpInput from "@/hook/useOtpInput";
import Link from "next/link";

export function OtpForm() {
    const { otp, error, handleChange, handleKeyDown, handleSubmit } = useOtpInput();

    return (<form onSubmit={ handleSubmit }>
            <div className="flex justify-between mb-4">
                { otp.map((digit, index) => (
                    <input
                        type="number"
                        key={ index }
                        id={ `otp-${ index }` }
                        value={ digit }
                        onChange={ (e) => handleChange(e.target.value, index) }
                        onKeyDown={ (e) => handleKeyDown(e, index) }
                        maxLength={ 1 }
                        className="w-12 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-info"
                    />
                )) }
            </div>
            { error && <p className="text-error text-sm mb-4">{ error }</p> }
            <div className=" space-y-4">

                <button
                    type="submit"
                    className="btn btn-info w-full"
                >
                    Validate OTP
                </button>

                <Link
                    href={ '/forget' }
                    className="btn btn-neutral "
                >
                    Back
                </Link>
            </div>
        </form>
    )
}

