'use client';
import Link from "next/link";
import { login } from "@/server/action/auth";
import { useActionState } from "react";
import { useOtpStore } from "@/store/otp";
import { FormError } from "@/app/components/form/action";

export default function LoginForm() {
    const { store, setData } = useOtpStore()
    const [ state, action, pending ] = useActionState(login, undefined);
    // console.log(state);
	return (
        <div className="card bg-base-200 max-w-xl mt-10">
            <form action={ action } className="card-body">
                <h2 className="card-title">Login</h2>
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
                        { pending ? "Login..." : "Login" }
                    </button>

                    <div className="flex sm:justify-between w-full flex-col sm:flex-row">

                        <div>
                            Dont Have Account
                            <Link
                                href="/register"
                                className={ `btn btn-link mx-0.5 px-0.5` }
                            >
                                Register
                            </Link>
                            Now!
                        </div>

                        <div>
                            Forget Password
                            <Link
                                href="/reset"
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
