import { act, renderHook } from '@testing-library/react';
import useWindowResizeThreshold from "../../../src/hook/useWindowResizeThreshold";
import { vi } from 'vitest';

// Mock the window.innerWidth
vi.stubGlobal('window', {
    ...window,
    innerWidth: 1024,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
});

describe('useWindowResizeThreshold hook', () => {
    test('should initialize with correct value based on threshold', () => {
        const threshold = 768;
        const { result } = renderHook(() => useWindowResizeThreshold(threshold));

        // Initially, the window width is mocked to be 1024px
        expect(result.current).toBe(false); // It should not be mobile size based on threshold 768
    });

    test('should return true when window width is less than or equal to threshold', () => {
        // Mock window size to be 500px
        Object.defineProperty(window, 'innerWidth', {
            value: 500,
            writable: true, // Make innerWidth writable for testing
        });

        const threshold = 768;
        const { result } = renderHook(() => useWindowResizeThreshold(threshold));

        // After initialization, since the window width is below the threshold, it should be mobile size
        expect(result.current).toBe(true);
    });

    test('should return false when window width is greater than threshold', () => {
        // Mock window size to be 1025px
        Object.defineProperty(window, 'innerWidth', {
            value: 1025,
            writable: true, // Make innerWidth writable for testing
        });

        const threshold = 768;
        const { result } = renderHook(() => useWindowResizeThreshold(threshold));

        // After initialization, since the window width is above the threshold, it should not be mobile size
        expect(result.current).toBe(false);
    });

    test('should update isMobileSize on window resize', () => {
        // Mock window size to be 1025px
        Object.defineProperty(window, 'innerWidth', {
            value: 1025,
            writable: true, // Make innerWidth writable for testing
        });
        const threshold = 600;

        const { result } = renderHook(() => useWindowResizeThreshold(threshold));

        // Initially, isMobileSize should be false
        expect(result.current).toBe(false);

        // Simulate window resize to 500px (below threshold)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                value: 500,
                writable: true, // Make innerWidth writable for testing
            });
            window.dispatchEvent(new Event('resize'));
        });

        // After resize, isMobileSize should be true
        expect(result.current).toBe(false);

        // Simulate window resize back to 1025px (above threshold)
        act(() => {
            Object.defineProperty(window, 'innerWidth', {
                value: 1025,
                writable: true, // Make innerWidth writable for testing
            });
            window.dispatchEvent(new Event('resize'));
        });

        // After resize back, isMobileSize should be false again
        expect(result.current).toBe(false);
    });

    test('should clean up event listener on unmount', () => {
        const threshold = 768;
        const { unmount } = renderHook(() => useWindowResizeThreshold(threshold));

        // Ensure removeEventListener is called when the component unmounts
        unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
