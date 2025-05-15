'use client';
import Link from "next/link";
import { loginAction } from "@/server/action/auth.action";
import { useActionState, useEffect } from "react";
import { useOtpStore } from "@/store/otp";
import { MyInputEmail, MyInputPassword } from "@/app/components/form/action";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
    const { store, setData, reset } = useOtpStore()
    const [ state, action, pending ] = useActionState(loginAction, undefined);
    useEffect(() => {
        if (state) {
            if (typeof state.success === 'boolean' && !state.success) {
            } else {
                reset()
            }
            console.log('in State')
        }
        console.log('is Load')
    }, [ state, reset ]);

    const searchParam = useSearchParams()
    const message = searchParam.get('message')
    return (
        <div className="card bg-base-200 max-w-xl mt-10">
            <form action={ action } className="card-body">
                <h2 className="card-title">Login { message && <span className={ 'text-error' }>{ message }</span> }</h2>
                {/* Email Input */ }
                <MyInputEmail
                    error={ state?.errors?.email }
                    defaultValue={ store.email }
                    onChangeAction={ email => setData({ email }) }
                />

                <MyInputPassword
                    title={ 'password' }
                    errors={ state?.errors?.password }
                />

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
