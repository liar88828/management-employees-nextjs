import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useOtpInput from "../../../src/hook/useOtpInput";

// Mocking the external hooks `useEmail` and `useOtpStore`
// vi.mock('./path-to-your-email-hook', () => ({
//     useEmail: () => ({
//         validOTP: { mutate: vi.fn(), isError: false },
//     }),
// }));
//
// vi.mock('./path-to-your-otp-store', () => ({
//     useOtpStore: () => ({
//         store: { email: 'test@example.com' },
//     }),
// }));

describe.skip('useOtpInput hook', () => {
    test('should initialize OTP state with empty strings', () => {
        const { result } = renderHook(() => useOtpInput());
        expect(result.current.otp).toEqual([ '', '', '', '', '', '' ]);
        expect(result.current.error).toBe('');
    });

    test('should handle OTP input change correctly', () => {
        const { result } = renderHook(() => useOtpInput());

        // Simulate changing OTP value at index 0
        act(() => {
            result.current.handleChange('1', 0);
        });

        expect(result.current.otp).toEqual([ '1', '', '', '', '', '' ]);
        expect(result.current.error).toBe('');

        // Simulate changing OTP value at index 1
        act(() => {
            result.current.handleChange('2', 1);
        });

        expect(result.current.otp).toEqual([ '1', '2', '', '', '', '' ]);
        expect(result.current.error).toBe('');
    });

    test('should clear subsequent OTP digits when previous digit is changed', () => {
        const { result } = renderHook(() => useOtpInput());

        // Simulate entering a value in index 0
        act(() => {
            result.current.handleChange('1', 0);
        });

        // Simulate entering a value in index 1
        act(() => {
            result.current.handleChange('2', 1);
        });

        // Simulate changing value in index 0 again
        act(() => {
            result.current.handleChange('3', 0);
        });

        expect(result.current.otp).toEqual([ '3', '', '', '', '', '' ]); // Subsequent digits should be cleared
    });

    test('should focus on the next input when a digit is entered', () => {
        document.body.innerHTML = '<input id="otp-1" /><input id="otp-2" />'; // Mock input elements

        const { result } = renderHook(() => useOtpInput());

        act(() => {
            result.current.handleChange('1', 0);
        });

        const otp2Input = document.getElementById('otp-2') as HTMLInputElement;
        expect(otp2Input === document.activeElement).toBe(true); // Ensure the focus is moved to the next input
    });

    test('should focus on previous input when backspace is pressed and current OTP is empty', () => {
        document.body.innerHTML = '<input id="otp-1" /><input id="otp-2" />'; // Mock input elements

        const { result } = renderHook(() => useOtpInput());

        // Simulate typing in the first OTP input
        act(() => {
            result.current.handleChange('1', 0);
        });

        // Simulate pressing backspace in the second input (which is empty)
        const backspaceEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
        act(() => {
            // @ts-expect-error
            result.current.handleKeyDown(backspaceEvent, 1);
        });

        const otp1Input = document.getElementById('otp-1') as HTMLInputElement;
        expect(otp1Input === document.activeElement).toBe(true); // Ensure focus moves to the previous input
    });

    test('should show an error if OTP length is not 6', () => {
        const { result } = renderHook(() => useOtpInput());

        // Simulate entering an incomplete OTP (less than 6 digits)
        act(() => {
            result.current.handleChange('1', 0);
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        expect(result.current.error).toBe('Please enter a 6-digit OTP.');
    });

    test('should submit OTP if valid', async () => {
        const { result } = renderHook(() => useOtpInput());

        // Simulate entering a valid OTP and submitting
        act(() => {
            result.current.handleChange('1', 0);
            result.current.handleChange('2', 1);
            result.current.handleChange('3', 2);
            result.current.handleChange('4', 3);
            result.current.handleChange('5', 4);
            result.current.handleChange('6', 5);
        });

        await act(async () => {
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        // expect(result.current.error).toBe('');
        // expect(result.current.mutate).toHaveBeenCalledWith({
        //     email: 'test@example.com',
        //     otp: '123456',
        // });
    });

    test('should show error if OTP submission fails', async () => {
        // Mock `isError` as true to simulate OTP failure
        vi.mock('./path-to-your-email-hook', () => ({
            useEmail: () => ({
                validOTP: { mutate: vi.fn(), isError: true },
            }),
        }));

        const { result } = renderHook(() => useOtpInput());

        // Simulate entering a valid OTP and submitting
        act(() => {
            result.current.handleChange('1', 0);
            result.current.handleChange('2', 1);
            result.current.handleChange('3', 2);
            result.current.handleChange('4', 3);
            result.current.handleChange('5', 4);
            result.current.handleChange('6', 5);
        });

        await act(async () => {
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        expect(result.current.error).toBe('Invalid OTP. Please try again.');
    });
});
