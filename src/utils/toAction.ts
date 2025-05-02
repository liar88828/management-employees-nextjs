'use client'

import { ResponseData } from "@/interface/server/TResponse";
import toast from "react-hot-toast";

export async function toAction(fun: () => any, message: string): Promise<ResponseData> {
    const toastId = toast.loading('Loading ....');
    try {
        const response = await fun()
        toast.success(message);
        return response;
    } catch (e) {
        // console.log('onAction', e);
        if (e instanceof Error) {
            // console.log('is instance of error');
            toast.error(e.message)
            return {
                message: e.message,
                success: false,
                data: e,
            };
        }
        return {
            message: 'Something went wrong',
            success: false,
            data: e,
        };
    } finally {
        toast.dismiss(toastId)
    }
}
