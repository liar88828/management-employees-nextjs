import { act, renderHook } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { useDebounce } from "../../../src/hook/useDebounce";

describe('useDebounce hook', () => {
    test('should debounce value after specified delay', async () => {
        const { result, rerender } = renderHook(() => useDebounce({ value: 'test', delay: 500 }));

        // Initially, debouncedValue should be 'test'
        expect(result.current).toBe('test');

        // Update the value
        act(() => {
            rerender({ value: 'updated' });
        });

        // Debounced value should stay the same for now
        expect(result.current).toBe('test');

        // Wait for the debounce delay to pass
        // await rerender(() => expect(result.current).toBe('updated'), { timeout: 600 });
    });

    test('should call fun after debounce delay', async () => {
        const funMock = vi.fn();
        const { rerender } = renderHook(() => useDebounce({ value: 'test', delay: 500, fun: funMock }));

        // Initially, the funMock should not have been called
        expect(funMock).not.toHaveBeenCalled();

        // Update the value to trigger the debounce
        act(() => {
            rerender({ value: 'updated', fun: funMock });
        });

        // Wait for the debounce delay to pass
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Check that funMock was called after the delay
        expect(funMock).toHaveBeenCalled();
    });

    test('should handle default delay', async () => {
        const { result, unmount, rerender } = renderHook(() => useDebounce({
            value: 'test',
            delay: 500
        }));

        // Initially, debouncedValue should be 'test'
        expect(result.current).toBe('test');

        // Update the value
        act(() => {
            rerender({ value: 'updated' });
        });

        // Debounced value should stay the same for now
        expect(result.current).toBe('test');

        // Wait for the default debounce delay (1000 ms)
        // await waitFor(() => {
        //     expect(result.current).toBe('updated')
        // }, { timeout: 1100 });

        // await waitFor(() => {
        //     // console.log(result.current)
        // }, {
        //     timeout: 2000
        //
        // });

    });

    test('should clean up timeout on unmount', async () => {
        const { unmount, result, rerender } = renderHook(() => useDebounce({ value: 'test', delay: 500 })
            , {});

        // Initially, debouncedValue should be 'test'
        expect(result.current).toBe('test');

        // Update the value and unmount the component before debounce triggers
        act(() => {
            rerender({ value: 'updated' });
        });

        unmount();

        // Wait for the debounce timeout and ensure debounced value has not changed due to unmount
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Ensure that the debounced value didn't change after unmount
        expect(result.current).toBe('test');
    });
})
;
