import { z } from "zod";
export const ERRORMESSAGE = {
    VALIDATION: 'ERROR VALIDATION',
    FETCH: "ERROR FETCH",
    DATABASE: "ERROR DATABASE",
    VALIDATION_SCHEMA: "ERROR VALIDATION SCHEMA",

}
type ErrorType = {
    message: string,
    resolve: string,
    errors?: any
};
export function catchErrorAPI(
    e: unknown,
    message: string = 'Something went wrong',
    from?: string
): ErrorType {

    if (e instanceof z.ZodError) {
        catchErrorZod(e, from)
    }

    if (e instanceof Error) {
        const message = `${ e.message } : ${ from }`
        if (e.message === ERRORMESSAGE.VALIDATION) {

            return {
                message,
                resolve: 'Please correct the prevData'
            }
        }
        if (e.message === ERRORMESSAGE.FETCH) {
            return {
                message,
                resolve: 'please try again',
            }

        }
        if (e.message === ERRORMESSAGE.DATABASE) {
            return {
                message,
                resolve: 'Maybe system is busy '
            }

        }
        if (e.message === ERRORMESSAGE.VALIDATION_SCHEMA) {
            return {
                message,
                resolve: 'Please correct field'

            }
        }
    }
    return {
        message: 'Something went wrong !!!',
        resolve: 'System Wrong !!!'
    }
}

export function catchErrorZod(e: z.ZodError, from?: string): ErrorType {
    return {
        resolve: `Please fill correct field ${ from }`,
        message: `Zod Validation Error form ${ from }`,
        errors: e.flatten().fieldErrors,
    }
}
