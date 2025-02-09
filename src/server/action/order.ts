'use server'
import { revalidateTag } from "next/cache";
import { incomingActionFetch } from "@/server/network/order";

export async function incomingActionForm(prevState: any, form: FormData): Promise<{
    msg: any,
    isSuccess: boolean,
}> {
    try {
        const status = form.get('status') ?? ''
        const id = form.get('id') ?? ''
        // console.log(status);
        if (!id || !status) {
            throw new Error(`Invalid status: ${ status }`);
        }

        // @ts-ignore
        await incomingActionFetch({ id, status })

        revalidateTag('incoming')
        revalidateTag(status.toString())
        revalidateTag(id.toString())
        return {
            msg: `Success Change Order by Invoice : ${ id } to ${ status }`,
            isSuccess: true
        }
    } catch (err) {
        if (err instanceof Error) {
            return {
                isSuccess: false,
                msg: err.message
            }
        }
        return {
            msg: 'Error Server',
            isSuccess: false
        }
    }
}
