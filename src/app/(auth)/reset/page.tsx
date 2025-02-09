'use client';

import { reset } from "@/server/action/auth";
import { useActionState } from "react";
import { useOtpStore } from "@/store/otp";

export default function SignupForm() {
    const { store } = useOtpStore()
    const [ state, action, pending ] = useActionState(reset, undefined)
    return (
        <div className="card card-bordered bg-base-100 lg:mx-60">
            <form action={ action } className="card-body">
                <input type="hidden" name={ 'email' } value={ store.email }/>
                <h2 className="card-title">Reset</h2>
                <p>Please fill the password and confirm password.</p>

                {/* Password Input */ }
                <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={ 'password' }

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


                <div className="form-control w-full">
                    <label htmlFor="name" className="label">
                        <span className="label-text">Confirm</span>
                    </label>
                    <input
                        id="confirm"
                        name="confirm"
                        placeholder="Enter your confirm Password"
                        className="input input-bordered w-full"
                        type={ 'password' }
                    />
                    { state?.errors?.confirm && (
                        <p className="text-red-500 text-sm mt-1">{ state.errors.confirm }</p>
                    ) }
                </div>


                { state?.message && (
                    <p className="text-red-500 text-sm mt-1">{ state.message }</p>
                ) }

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        disabled={ pending }
                        type="submit"
                        className={ `btn btn-primary w-full ${ pending ? "btn-disabled" : "" }` }
                    >
                        { pending ? "Resetting..." : "Reset" }
                    </button>

                </div>
            </form>
        </div>
    );
}


