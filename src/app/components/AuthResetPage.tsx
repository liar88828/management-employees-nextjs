'use client';

import { useOtpStore } from "@/store/otp";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkEmailAction, checkOtpAction, resetPasswordAction } from "@/action/reset-password.action";

export function ResetCheckEmail() {
    const { store, setData } = useOtpStore()
    const [ messageError, setMessageError ] = useState<string | null>()
    const addOneMinute = async () => {
        setData({
            loading: true,
            errorEmail: null
        });
        setMessageError(null)
        try {
            // let myTime = store.time ?? 0
            let moreTime = Date.now() + 62 * 1000
            const response = await checkEmailAction({
                email: store.email,
                time: new Date(moreTime),
                reason: "OTP"
            })

            if (response.success) {
                // setMessageError(response.message)
                setData({ time: moreTime, successEmail: true })
            } else {
                setMessageError(response.message)
                setData({
                    successEmail: false,
                    errorEmail: response.errors.email
                })
            }
        } finally {
            setData({ loading: false });
        }
    }

    return (
        <div className="card card-bordered bg-base-200 ">
            <div
                className="card-body"
            >
                <h2 className="card-title">Check Email
                    { store.successEmail && <span className={ 'text-success' }>Is True</span> }

                </h2>
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
                        placeholder="Enter your email"
                        className="input input-bordered w-full"
                    />
                    { store.errorEmail || messageError && ( <>
                            <p className="text-error text-sm mt-1">{ store.errorEmail }</p>
                            <p className="text-error text-sm mt-1">{ messageError }</p>
                        </>
                    ) }
                </div>

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        disabled={ store.remainingTime > 0 }
                        className="btn  btn-primary w-full mt-2"
                        onClick={ addOneMinute }
                    >
                        Send email : <Countdown
                        setData={ (now) => setData({ remainingTime: now }) }
                        targetTime={ store.time }
                    />
                    </button>
                </div>
            </div>
        </div>
    );
}

export const Countdown = ({ targetTime, setData }: {
    targetTime: number | null,
    setData: (now: number) => void
}) => {
    const [ remainingTime, setRemainingTime ] = useState(targetTime ? targetTime - Date.now() : 0);
    const [ isMounted, setIsMounted ] = useState(false); // To check if component has mounted

    useEffect(() => {
        setIsMounted(true); // Set to true once mounted
    }, []);

    useEffect(() => {
        if (!isMounted || !targetTime) return;

        const interval = setInterval(() => {
            const now = targetTime - Date.now()
            setRemainingTime(now);
            setData(now)
        }, 1000);

        return () => clearInterval(interval);
    }, [ isMounted, setData, targetTime ]);

    // If there's no target time, or it's null, show a message
    if (!targetTime) return ( <>Is button will add 1 min</> );

    // If countdown has finished
    if (remainingTime <= 0) return ( <>Time&#39;s up!</> );

    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    return ( <>{ minutes }:{ displaySeconds < 10 ? `0${ displaySeconds }` : displaySeconds }s</>
    );
};

export function ResetCheckOtp() {
    const { store, setData } = useOtpStore()
    const [ messageError, setMessageError ] = useState<string | null>()
    const onValidateForm = async () => {
        try {
            setData({ loading: true });
            setMessageError(null)
            if (store.otp.length !== 6) {
                // setData({
                //     message: "Please enter a 6-digit OTP.",
                //     error: true
                // });
                setMessageError("Please enter a 6-digit OTP.")

            } else {
                const response = await checkOtpAction({ email: store.email, otp: store.otp });
                if (response.success) {
                    setData({ successOtp: true });
                } else {
                    setMessageError(response.message)
                    setData({ successOtp: false });
                }
            }
        } catch (e) {
            console.error(e);
            setMessageError(e as string)
            setData({ successOtp: false });

        } finally {
            setData({
                loading: false
            });
        }
    };

    return (
        <div className="card card-bordered bg-base-200">
            <div className="card-body">
                <h2 className="card-title">Check Otp
                    { store.successOtp && <span className={ 'text-success' }>Is True</span> }
                </h2>
                { store.email && (
                    <p className={ '~text-sm/base text-base-content/50' }>
                        Was send this email { store.email }. please check the mail box
                    </p>
                ) }
                <div>
                    <div className="form-control w-full">
                        <input
                            type="text"
                            value={ store.otp }
                            onChange={ (e) => setData({ otp: e.target.value }) }
                            className="input input-bordered w-full"
                            placeholder="Enter otp number ex: 123456"
                        />

                        { store.errorOtp && <p className="text-red-500 text-sm mt-1">{ store.errorOtp }</p> }
                        { messageError && <p className="text-error text-sm mt-1">{ messageError }</p> }
                    </div>
                    <div className=" space-y-10">
                        <button
                            onClick={ () => onValidateForm() }
                            className="btn btn-info w-full"
                        >
                            Validate OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ResetPassword() {
    const router = useRouter();
    const { store, setData, reset } = useOtpStore()
    const [ messageError, setMessageError ] = useState<string | null>()

    const handlerReset = async () => {
        setMessageError(null)
        setData({
            loading: true,
            errorPassword: null,
            errorConfirm: null,
        })
        try {
            const response = await resetPasswordAction({
                email: store.email,
                confirm: store.confirm,
                password: store.password,
                otp: store.otp,
            })
            if (response.success) {
                const willReset = reset()
                if (willReset) {
                    router.replace('/login')
                }

            } else {
                setMessageError(response.message)
                if (response.errors) {
                    setData({
                        errorPassword: response.errors.password ?? null,
                        errorConfirm: response.errors.confirm ?? null,
                    })
                }
            }
        } finally {
            setData({ loading: false })
        }
    }
    return (
        <div className="card card-bordered bg-base-200 ">
            <div className="card-body">
                <h2 className="card-title">Reset</h2>
                <p>Please fill the password and confirm password.</p>

                {/* Password Input */ }
                <div className="form-control w-full">
                    <label htmlFor="password" className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={ 'password' }
                        value={ store.password }
                        onChange={ (e) => {
                            setData({ password: e.target.value })
                        } }
                        placeholder="Enter your password"
                        className="input input-bordered w-full"
                    />
                    { store.errorPassword && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Password must:</p>
                            <ul className="list-disc list-inside">
                                { store.errorPassword.map((error) => (
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
                        type={ 'password' }
                        value={ store.confirm }
                        onChange={ (e) => {
                            setData({ confirm: e.target.value })
                        } }
                        placeholder="Enter your confirm Password"
                        className="input input-bordered w-full"
                    />
                    { store.errorConfirm && (
                        <div className="mt-2 text-red-500 text-sm">
                            <p>Confirm must:</p>
                            <ul className="list-disc list-inside">
                                { store.errorConfirm.map((error) => (
                                    <li key={ error }>{ error }</li>
                                )) }
                            </ul>
                        </div>
                    ) }
                </div>

                { messageError && (
                    <p className="text-red-500 text-sm mt-1">{ messageError }</p>
                ) }

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        onClick={ async () => {
                            const willReset = await handlerReset()
                            // if (willReset) {
                            //     router.replace('/login')
                            // }
                        } }
                        disabled={ store.loading }
                        type="submit"
                        className={ `btn btn-info w-full ${ store.loading ? "btn-disabled" : "" }` }
                    >
                        { store.loading ? "Resetting..." : "Reset" }
                    </button>
                    {/*<button onClick={ () => {*/ }
                    {/*    resetAction()*/ }
                    {/*} }*/ }
                    {/*>AuthResetPage*/ }
                    {/*</button>*/ }
                </div>
            </div>
        </div>
    );
}

export default function AuthResetPage() {
    return ( <section className={ 'grid grid-cols-1 gap-4 max-w-3xl w-full' }>
            <ResetCheckEmail />
            <ResetCheckOtp />
            <ResetPassword />
        </section>
    );
}
