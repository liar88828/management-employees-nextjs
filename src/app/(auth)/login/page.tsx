'use client';

import { signIn } from "@/server/action/auth";
import { useActionState } from "react";
import Link from "next/link";
import { useOtpStore } from "@/store/otp";
import { FormError } from "@/app/components/FormError";

export default function LoginForm() {
    const { store, setData } = useOtpStore()

	const [ state, action, pending ] = useActionState(signIn, undefined);
    // console.log(state);
	return (
        <div className="card card-bordered bg-base-100  max-w-xl mt-20">
            <form action={ action } className="card-body">
                <h2 className="card-title">Sign In</h2>
                {/* Email Input */ }
                <div className="form-control w-full">
                    <label htmlFor="email" className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        onChange={ e => setData({ email: e.target.value }) }
                        value={ store.email }
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                        // defaultValue={ state?.prev?.email ??''}
                    />
                    <FormError errors={ state?.errors?.email } title="must add:"/>
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
                        // defaultValue={ state?.prev?.password ??''}
                    />
                    <FormError errors={ state?.errors?.password } title="must Add:"/>
                </div>
                { state?.message && (
                    <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                ) }
                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        onClick={ () => setData({
                            time: null,
                            reason: "OTP"
                        }) }
                        disabled={ pending }
                        type="submit"
                        className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" } mt-5` }
                    >
                        { pending ? "Signing In..." : "Sign In" }
                    </button>

                    <div className="flex sm:justify-between w-full flex-col sm:flex-row">

                        <div className="">
                            Dont Have Account
                            <Link
                                href="/register"
                                className={ `btn btn-link mx-0.5 px-0.5` }
                            >
                                Register
                            </Link>
                            Now!
                        </div>


                        <div className="">
                            Forget Password
                            <Link
                                href="/forget"
                                className={ `btn btn-link mx-0.5 px-0.5` }
                            >
                                Reset
                            </Link>
                            Now!
                        </div>
                    </div>
                </div>

            </form>
        </div>
    );
}