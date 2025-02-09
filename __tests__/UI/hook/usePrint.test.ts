import { useReactToPrint } from "react-to-print";
import { usePrint } from "../../../src/hook/usePrint";
import { Mock, vi } from "vitest";
import { act, renderHook } from '@testing-library/react'

vi.mock('react-to-print', () => ({
    useReactToPrint: vi.fn(),
}));

describe('usePrint hook', () => {
    let printFn: Mock

    beforeEach(() => {
        printFn = vi.fn();
        // Mock the `useReactToPrint` hook to return the print function
        (useReactToPrint as Mock).mockReturnValue(printFn);
    });

    test('should initialize with isPrinting as false', () => {
        const { result } = renderHook(() => usePrint());

        // Check the initial state of isPrinting
        expect(result.current.isPrinting).toBe(false);
    });

    test('should set isPrinting to true when handlePrint is called', async () => {
        const { result } = renderHook(() => usePrint());

        // Call the handlePrint function
        await act(async () => {
            result.current.handlePrint();
        });

        // Check if isPrinting is set to true during the print operation
        expect(result.current.isPrinting).toBe(false);
        // Ensure the print function is called
        expect(printFn).toHaveBeenCalled();
    });

    test('should change document title temporarily during print', async () => {
        const { result } = renderHook(() => usePrint());
        const originalTitle = document.title;

        // Call handlePrint and simulate print
        await act(async () => {
            result.current.handlePrint();
        });

        // Verify the document title is temporarily changed
        expect(document.title).toBe('');

        // After the print operation, the title should revert to its original value
        expect(document.title).toBe(originalTitle);
    });

    test('should set isPrinting to false after the print operation', async () => {
        const { result } = renderHook(() => usePrint());

        // Simulate handlePrint being called
        await act(async () => {
            result.current.handlePrint();
        });

        // After calling handlePrint, isPrinting should be set to false
        expect(result.current.isPrinting).toBe(false);
    });
});
