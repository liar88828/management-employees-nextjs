import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

type StoreOTP = {
    email: string
    otp: string
    time: number | null
    remainingTime: number
    reason: "OTP" | 'RESET'

};

interface OTPState {
    store: StoreOTP
    setData: (data: Partial<StoreOTP>) => void
}

export const useOtpStore = create<OTPState>()(
    persist(
        (set, get) => ({
            store: {
                otp: "",
                email: "",
                time: 0,
                remainingTime: 0,
                reason: "OTP"
            },
            setData: (data) => {
                set((state) => ({ store: { ...state.store, ...data } }))
            }
        }),

        {
            name: 'otp', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage),
        },
    )
)