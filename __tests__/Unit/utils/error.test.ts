import { ErrorNew, ErrorStore } from "../../../src/utils/errorHandler";
import { ErrorOTP, ErrorResponse, ErrorXXX } from "../../../src/utils/ErrorResponse";

describe('Custom Error Classes Tests', () => {
    test('NewError should stringify the message', () => {
        const error = new ErrorNew({ errorCode: 500, message: 'Internal Server Error' });
        expect(error.message).toBe('{"errorCode":500,"message":"Internal Server Error"}');
    });

    test('ErrorStore should return the provided message', () => {
        const error = new ErrorStore('Something went wrong');
        expect(error.message).toBe('Something went wrong');
    });
});

describe('Custom Error Classes Tests', () => {

    // Test for ErrorResponse class
    test('ErrorResponse should correctly assign msg and code', () => {
        const error = new ErrorResponse('Error occurred', 500);
        expect(error.msg).toBe('Error occurred');
        expect(error.code).toBe(500);
        expect(error.message).toBe('Error occurred');
        expect(error instanceof Error).toBe(true);
        expect(error instanceof ErrorResponse).toBe(true);
    });

    // Test for ErrorOTP class
    test('ErrorOTP should correctly assign msg and code and extend ErrorResponse', () => {
        const error = new ErrorOTP('OTP is invalid', 401);
        expect(error.msg).toBe('OTP is invalid');
        expect(error.code).toBe(401);
        expect(error.message).toBe('OTP is invalid');
        expect(error instanceof Error).toBe(true);
        expect(error instanceof ErrorOTP).toBe(false);
    });

    // Test for ErrorXXX class
    test('ErrorXXX should correctly assign msg and code and extend ErrorResponse', () => {
        const error = new ErrorXXX('Invalid request', 400);
        expect(error.msg).toBe('Invalid request');
        expect(error.code).toBe(400);
        expect(error.message).toBe('Invalid request');
        expect(error instanceof Error).toBe(true);
        expect(error instanceof ErrorXXX).toBe(false);
    });

    // Ensure all classes maintain prototype chain
    test('ErrorOTP and ErrorXXX should have ErrorResponse as prototype', () => {
        const errorOTP = new ErrorOTP('OTP expired', 408);
        const errorXXX = new ErrorXXX('Request failed', 400);

        expect(Object.getPrototypeOf(errorOTP)).toBe(ErrorResponse.prototype);
        expect(Object.getPrototypeOf(errorXXX)).toBe(ErrorResponse.prototype);
    });
});
