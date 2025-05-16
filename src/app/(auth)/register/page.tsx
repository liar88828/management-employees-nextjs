'use client';

import { registerAction } from "@/server/action/auth.action";
import { useActionState } from "react";
import Link from "next/link";
import { useOtpStore } from "@/store/otp";
import { MyInput, MyInputEmail, MyInputPassword, MyInputPhone } from "@/app/components/form/action";

export default function RegisterForm() {
    const [ state, action, pending ] = useActionState(registerAction, undefined);
    const { store, setData } = useOtpStore()
    return (
        <div className="card bg-base-200 max-w-2xl mt-10 w-full">
            <form action={ action } className="card-body">
                <h2 className="card-title">Register</h2>
                <div className="grid grid-cols-2 gap-4">
                    <MyInput title={ 'name' }
                             error={ state?.errors?.name }
                             defaultValue={ state?.prevData?.name }
                    />

                    <MyInputEmail onChangeAction={ email => setData({ email }) }
                                  error={ state?.errors?.email }
                                  defaultValue={ store.email }
                    />
                    <MyInputPhone error={ state?.errors?.phone } defaultValue={ state?.prevData?.phone }
                                  title={ 'phone' }
                    />
                    <div className=""></div>
                    {/*<MyInputTextArea defaultValue={ state?.prevData?.address } error={ state?.errors?.address }*/ }
                    {/*                 title={ 'address' }*/ }
                    {/*/>*/ }
                    <MyInputPassword title={ 'password' } errors={ state?.errors?.password } />
                    <MyInputPassword title={ 'confirm' } errors={ state?.errors?.confirm } />
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
