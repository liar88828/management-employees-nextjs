import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useScrollVisibility } from "../../../src/hook/UseScrollVisibility";

// Mock window.scrollY
vi.stubGlobal('window', {
    ...window,
    scrollY: 0,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),

});

describe('useScrollVisibility hook', () => {
    test('should initialize visibility based on initialVisibility prop', () => {
        const { result } = renderHook(() => useScrollVisibility(false));
        expect(result.current).toBe(false); // Initially should be hidden if initialVisibility is false
    });

    test('should hide element when scrolling down past 50px', () => {
        // Mock scroll position to be more than 50px
        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(60);

        const { result } = renderHook(() => useScrollVisibility(true));

        // Simulate a scroll event to update the visibility
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBe(true); // Element should be hidden after scrolling down past 50px
    });

    test('should show element when scrolling up', () => {
        // Mock scroll position to be more than 50px
        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(60);

        const { result } = renderHook(() => useScrollVisibility(false));

        // Simulate scrolling down to hide the element first
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        // Simulate scrolling up
        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(40);
        act(() => {
            window.dispatchEvent(new Event('scroll'));
        });

        expect(result.current).toBe(false); // Element should be visible again after scrolling up
    });

    test('should clean up event listener on unmount', () => {
        const { unmount } = renderHook(() => useScrollVisibility(true));

        // Ensure removeEventListener is called when the component unmounts
        unmount();
        expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
});
