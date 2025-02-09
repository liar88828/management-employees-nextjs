'use client'
import React, { useEffect, useState } from "react";
import { useOtpStore } from "@/store/otp";
import { useEmail } from "@/hook/useEmail";

// const targetTime = new Date(Date.now() + 60 * 1000).getTime();

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

    // If there's no target time or it's null, show a message
    if (!targetTime) return (<>Is button to add 1 min</>);

    // If countdown has finished
    if (remainingTime <= 0) return (<>Time&#39;s up!</>);

    const seconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;

    return (<>{ minutes }:{ displaySeconds < 10 ? `0${ displaySeconds }` : displaySeconds }s</>
    );
};

//     const dataUser = new Date(startDate).getTime(); // Convert startDate to milliseconds
//     const dataNow = Date.now(); // Get current time in milliseconds
//     const date = dataUser - dataNow
//     console.log(date)// to date

export function CountdownButton() {
    const { store, setData } = useOtpStore()
    const { generateOTP } = useEmail()

    const addOneMinute = () => {
        // let myTime = store.time ?? 0
        let moreTime = Date.now() + 62 * 1000
        setData({ time: moreTime })
        generateOTP.mutate({
            email: store.email,
            time: new Date(moreTime),
            reason: store.reason
        })
    };

    return (
        <div className="flex items-center flex-col mb-2">
            <div className="">
                <Countdown/>
            </div>
            <button
                disabled={ store.remainingTime > 0 }
                className="btn btn-sm"
                onClick={ addOneMinute }
            >
                Send email : { store.email }
            </button>
        </div>
    );
}
