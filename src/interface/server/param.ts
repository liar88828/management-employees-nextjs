export type TContext = {
    searchParams: Promise<{
        search: string,
        status: string,
        redirect: string,
        query: string,
        page: string,
        limit: string,
        error: string,
        type: string
    }>,
    params: Promise<{ id: string, search: string, route: string }>
}
export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>

export type ResponseAll<T> = {
    data: T[],
    page: number,
    limit: number
}


export type OTPGenerate = {
    email: string,
    time: Date,
    reason: 'RESET' | 'OTP'
}

export type OTPValid = {
    email: string,
    otp: string,
    // reason: 'RESET' | 'OTP'
}

