'use client';

import { register } from "@/server/action/auth.action";
import { useActionState } from "react";
import Link from "next/link";
import { useOtpStore } from "@/store/otp";

export default function RegisterForm() {
    const [ state, action, pending ] = useActionState(register, undefined);
    const { store, setData } = useOtpStore()
    return (
        <div className="card bg-base-200 max-w-2xl mt-10 w-full">
            <form action={ action } className="card-body">
                <h2 className="card-title">Register</h2>
                <div className="grid grid-cols-2 gap-4">

                    {/* Name Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="name" className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            defaultValue={ state?.prev.name }
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                        { state?.errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{ state.errors.name }</p>
                        ) }
                    </div>

                    {/* Email Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input

                            value={ store.email }
                            onChange={ e => setData({
                                email: e.target.value,
                            }) }
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                        { state?.errors?.email && (
                            <p className="text-red-500 text-sm mt-1">{ state.errors.email }</p>
                        ) }
                    </div>

                    {/* Phone Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="phone" className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            defaultValue={ state?.prev.phone }
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            className="input input-bordered w-full"
                        />
                        { state?.errors?.phone && (
                            <p className="text-red-500 text-sm mt-1">{ state.errors.phone }</p>
                        ) }
                    </div>

                    {/* Address Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="address" className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <textarea
                            defaultValue={ state?.prev.address }
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            className="textarea textarea-bordered w-full"
                        />
                        { state?.errors?.address && (
                            <p className="text-red-500 text-sm mt-1">{ state.errors.address }</p>
                        ) }
                    </div>

                    {/* Password Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="password" className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                        { state?.errors?.password && (
                            <div className="mt-2 text-red-500 text-sm">
                                <p>Password must:</p>
                                <ul className="list-disc list-inside">
                                    { state.errors.password.map((error) => (
                                        <li key={ error }>{ error }</li>
                                    )) }
                                </ul>
                            </div>
                        ) }
                    </div>

                    {/* Password Input */ }
                    <div className="form-control w-full">
                        <label htmlFor="confirm" className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                            name="confirm"
                            type="password"
                            placeholder="Enter your confirm password"
                            className="input input-bordered w-full"
                        />
                        { state?.errors?.confirm && (
                            <div className="mt-2 text-red-500 text-sm">
                                <p>Password must:</p>
                                <ul className="list-disc list-inside">
                                    { state.errors.confirm.map((error) => (
                                        <li key={ error }>{ error }</li>
                                    )) }
                                </ul>
                            </div>
                        ) }
                    </div>
                </div>

                {/* Submit Button */ }
                <div className="card-actions mt-4">
                    <button
                        onClick={ e => setData({
                            time: null,
                            reason: "OTP"
                        }) }
                        disabled={ pending }
                        type="submit"
                        className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
                    >
                        { pending ? "Register..." : "Register" }
                    </button>
                    <div>
                        Already have an account?
                        <Link href="/login" className="btn btn-link mx-0.5 px-0.5">
                            Login
                        </Link>
                        Now!
                    </div>
                </div>
            </form>
        </div>
    );
}
