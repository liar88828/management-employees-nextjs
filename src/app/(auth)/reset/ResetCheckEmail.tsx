'use client';

import { checkEmailAction } from "@/server/action/auth.action";
import { useOtpStore } from "@/store/otp";
import toast from "react-hot-toast";
import { useEmail } from "@/hook/useEmail";
import React, { useEffect, useState } from "react";

export default function ResetCheckEmail() {
    const { store, setData } = useOtpStore()
    const { onCheckEmail } = useEmail()
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
            const response = await onCheckEmail({
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

    // const { onGenerate } = useEmail()

    // const addOneMinute = async () => {
    //     // let myTime = store.time ?? 0
    //     let moreTime = Date.now() + 62 * 1000
    //     setData({ time: moreTime })
    //     await onGenerate({
    //         email: store.email,
    //         time: new Date(moreTime),
    //         reason: store.reason
    //     })
    // };

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
                        Send email : <Countdown />
                    </button>
                </div>
            </div>
        </div>
    );
}

export const Countdown = () => {
    const { store: { time: targetTime }, setData } = useOtpStore()
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
            setData({ remainingTime: now })
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

export function CheckEmailxxx() {
    const { store, setData } = useOtpStore()

    // const [ state, action, pending ] = useActionState(checkEmailAction, undefined);
    // console.log(state);
    const onCheckEmail = async () => {

        const toastId = toast.loading('Loading...');
        setData({
            loading: true,
            errorEmail: null,
            // message: null,
            // error: false,
        })
        try {
            const response = await checkEmailAction({ email: store.email })
            if (response.success) {
                toast.success("Please Check OTP In Your Email");
            }

            setData({
                errorEmail: response?.errors?.email as string[],
                // message: response.message,
                // error: false,
            })

        } catch (e) {
            console.log(e)
            if (e instanceof Error) {
                setData({
                    // message: e.message,
                    errorEmail: null,
                    // error: true
                })
                toast.error(e.message);

            }
        } finally {
            toast.dismiss(toastId)
            setData({ loading: false })
        }
    }

    return (
        <div className="card card-bordered bg-base-200 ">
            <div

                className="card-body"
            >
                <h2 className="card-title">Check Email</h2>
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
                    { store.errorEmail && (
                        <p className="text-red-500 text-sm mt-1">{ store.errorEmail }</p>
                    ) }
                </div>

                {/* Submit Button */ }
                <div className="card-actions">
                    <button
                        onClick={ onCheckEmail }
                        disabled={ store.loading || store.remainingTime > 0 }
                        type="submit"
                        className={ `btn btn-info  btn-block ${ store.loading ? "btn-disabled" : "" }` }
                    >
                        { store.loading ? "Sending..." : "Send Otp Email" }
                    </button>

                </div>
            </div>
        </div>
    );
}
