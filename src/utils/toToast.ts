'use client'
import toast from "react-hot-toast";

export const toToasts = (
    { action, error, success = 'Success',/* redirect, */ }: {
        action: () => any,
        error: string,
        success: string,
        // redirect: string,
    }) => {
    const idToast = toast.loading('Loading...')
    try {
        action()
        toast.success(success);
    } catch (e) {
        if (e instanceof Error) toast.error(error ? error : e.message);
    } finally {
        toast.dismiss(idToast)
    }
}