import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

type StoreOTP = {
    email: string
    otp: string
    password: string,
    confirm: string,
    time: number | null
    remainingTime: number
    reason: "OTP" | 'RESET',
    loading: boolean,
    errorEmail: string[] | null,
    errorPassword: string[] | null,
    errorConfirm: string[] | null,
    errorOtp: string | null,
    successEmail: boolean,
    successOtp: boolean,
    // message: string | null
    // error: boolean,
};

interface OTPState {
    store: StoreOTP
    setData: (data: Partial<StoreOTP>) => void
    reset: () => boolean
}

export const useOtpStore = create<OTPState>()(
    persist(
        (set) => {
            const initialState: StoreOTP = {
                // error: false,
                // message: null,
                loading: false,
                errorEmail: null,
                errorPassword: null,
                errorConfirm: null,
                errorOtp: null,
                otp: "",
                successEmail: false,
                successOtp: false,
                password: "",
                confirm: "",
                email: "",
                time: 0,
                remainingTime: 0,
                reason: "OTP"
            };
            return ( {
                store: initialState,
                reset: () => {
                    set({ store: initialState })
                    return true
                },
                setData: (data) => set((state) => ( { store: { ...state.store, ...data } } ))
            } );
        },

        {
            name: 'resetAction-password', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage),
        },
    )
)
