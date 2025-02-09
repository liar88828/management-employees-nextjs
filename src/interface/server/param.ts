import { ZodIssue } from "zod";

export type TContext = {
    searchParams: Promise<{ search: string, status: string, redirect: string, query: string, page: string }>,
    params: Promise<{ id: string, search: string, route: string }>
}

export type TReactFormHookComponent<T> = {
    defaultValues?: T,
    method: "POST" | "PUT",
    id: string,

};

export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>
export type ResponseAll<T> = {
    data: T[],
    page: number,
    limit: number
}

export type PaginatedResponse<T> = {
    data: T[];
    nextCursor: number; // Cursor for next page or null if no more data
};

export type PageParams = {
    pageParam?: string;
};
export type ResponseValidOTP = { msg: string | ZodIssue[], data?: string };

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

