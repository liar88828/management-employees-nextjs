'use client'
import React from "react";
import useOtpInput from "@/hook/useOtpInput";
import Link from "next/link";

export function OtpForm() {
    const { otp, error, handleChange, handleSubmit } = useOtpInput();

    return (<form onSubmit={ handleSubmit }>
            <div className="flex justify-between mb-4">
                    <input
                        type="number"
                        value={ otp }
                        onChange={ handleChange }
                        className="input input-bordered w-full"
                    />
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

