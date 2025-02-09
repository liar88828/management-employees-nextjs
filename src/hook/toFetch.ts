import {TMethod} from "@/interface/Utils"
import {FetchResponse} from "@/interface/server/param";

const isTest = false

type ToFetch = {
    url: string,
    data?: any,
    cacheData?: RequestInit
};

export const toFetch = async <R>(
    method: TMethod,
    {
        url,
        data,
        cacheData = {
            cache: "default",
            next: {revalidate: 0}
        }
    }: ToFetch
): FetchResponse<R> => {
    // Initialize headers
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    // Prepare fetch options
    const fetchOptions: RequestInit = {
        method: method,
        headers,
    }

    // If method is POST, PUT, or PATCH, include the body
    if (["POST", "PUT", "PATCH"].includes(method) && data) {
        fetchOptions.body = JSON.stringify(data)
    }

    if (["GET"].includes(method)) {
        fetchOptions.cache = cacheData.cache
        fetchOptions.next = cacheData.next
        // cache: 'no-store',
        // fetchOptions.next = {
        // 	revalidate: 0
        // }

    }


    try {
        // Make the fetch request
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_API}/api/${url}`,
            fetchOptions
        )

        // Check for successful response
        // @ts-ignore
        if (!isTest) {
            if (!response.ok) {
                const data = await response.text()
                console.info(data)
                throw new Error(`HTTP error! status`)
                // throw new Error(`HTTP error! status: ${response.status} msg : ${data.msg}`)
            }
        }

        // Parse and return the JSON response
        return response.json()
    } catch (error) {

        // console.log(error.)
        if (error instanceof Error) {
            // Handle errors
            // 	console.error("Fetch error:", error.message)

        }
        throw error // Rethrow the error for the caller to handle
    }
}
