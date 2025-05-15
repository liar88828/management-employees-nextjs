export type ResponseAction<P = any, E = any> = {
    prevData?: P,
    errors?: E,
    response: any,
    success: boolean,
    message: string,
}
