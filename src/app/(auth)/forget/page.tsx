'use client';

import { forget } from "@/server/action/auth";
import { useActionState } from "react";
import Link from "next/link";
import { useOtpStore } from "@/store/otp";

export default function Forget() {
    const { store, setData } = useOtpStore()

    const [ state, action, pending ] = useActionState(forget, undefined);
    // console.log(state);
    return (
        <div className="card card-bordered bg-base-100 lg:mx-60 mt-10">
            <form action={ action } className="card-body">
                <h2 className="card-title">Forget</h2>
                {/* Email Input */ }
                <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        onChange={ e => setData({
                            email: e.target.value,
                        }) }
                        value={ store.email }
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        // defaultValue={ state?.prev?.email ??''}
                    />
                    { state?.errors?.email && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.email }</p>
                    ) }
                </div>


                { state?.message && (
                    <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                ) }
                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        // onClick={ () => {
                        //     setData({
                        //         reason: 'RESET',
                        //         time: Date.now() + 62 * 1000
                        //     })
                        // } }
                        disabled={ pending }
                        type="submit"
                        className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
                    >
                        { pending ? "Sending..." : "Send Otp Email" }
                    </button>
                    <Link href="/login" className={ `btn btn-neutral` }>Back</Link>
                </div>
            </form>
        </div>
    );
}


