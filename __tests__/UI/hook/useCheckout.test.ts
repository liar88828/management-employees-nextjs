import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useCheckout } from "../../../src/hook/useCheckout";

const mockData = [
    { id: '1', qty_at_buy: 2 },
    { id: '2', qty_at_buy: 1 },
];

describe('useCheckout hook', () => {
    test('should increment qty_at_buy for a specific item', () => {
        const { result } = renderHook(() => useCheckout(mockData));

        // Increment item with id '1'
        act(() => {
            result.current.onIncrement('1');
        });

        // Check if the qty_at_buy was updated
        expect(result.current.onData).toEqual([
            { id: '1', qty_at_buy: 3 },
            { id: '2', qty_at_buy: 1 },
        ]);
    });

    test('should not decrement qty_at_buy below 1', () => {
        const { result } = renderHook(() => useCheckout(mockData));

        // Decrement item with id '2' (it has qty_at_buy 1, so it should stay 1)
        act(() => {
            result.current.onDecrement('2');
        });

        // Check if the qty_at_buy is still 1
        expect(result.current.onData).toEqual([
            { id: '1', qty_at_buy: 2 },
            { id: '2', qty_at_buy: 1 },
        ]);
    });

    test('should decrement qty_at_buy for a specific item if greater than 1', () => {
        const { result } = renderHook(() => useCheckout(mockData));

        // Decrement item with id '1' (it has qty_at_buy 2)
        act(() => {
            result.current.onDecrement('1');
        });

        // Check if the qty_at_buy was updated
        expect(result.current.onData).toEqual([
            { id: '1', qty_at_buy: 1 },
            { id: '2', qty_at_buy: 1 },
        ]);
    });

    test('should remove an item from the trolley', () => {
        const { result } = renderHook(() => useCheckout(mockData));

        // Remove item with id '1'
        act(() => {
            result.current.onRemove('1');
        });

        // Check if the item with id '1' was removed
        expect(result.current.onData).toEqual([ { id: '2', qty_at_buy: 1 } ]);
    });

    test('should not modify data if undefined is passed initially', () => {
        const { result } = renderHook(() => useCheckout(undefined));

        // Try removing an item (there's no data to remove)
        act(() => {
            result.current.onRemove('1');
        });

        // Check if the data remains unchanged
        expect(result.current.onData).toEqual(undefined);
    });
});
