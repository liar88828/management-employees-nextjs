import { ResponseData } from "@/interface/server/TResponse";
import toast from "react-hot-toast";

export async function onAction(fun: () => any, message: string): Promise<ResponseData> {
    const toastId = toast.loading('Loading ....');
    try {
        const response = await fun()
        toast.success(message);
        return response;
    } catch (e) {
        if (e instanceof Error) {
            toast.error(e.message)
            return {
                message: e.message,
                data: e,
                success: false
            };
        }
        return {
            message: 'Something went wrong',
            data: e,
            success: false
        };
    } finally {
        toast.dismiss(toastId)
    }
}