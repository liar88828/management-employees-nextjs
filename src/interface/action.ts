export type ActionResponse<P = any, E = any> = {
    prevData: P,
    success: boolean,
    errors?: E,
    message: string,
}
