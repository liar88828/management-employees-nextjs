import { act, renderHook } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import { useTable } from "../../../src/hook/useTable";

// Mock the useDownloadExcel hook and its return value
vi.mock('react-export-table-to-excel', () => ({
    useDownloadExcel: vi.fn().mockReturnValue({
        onDownload: vi.fn(() => true), // Mock the onDownload function to return true when invoked
    }),
}));

describe('useTable hook', () => {
    beforeEach(() => {
        // Reset the mocks before each test
        vi.clearAllMocks();
    });

    test('should initialize tableRef correctly', () => {
        const { result } = renderHook(() => useTable());

        // Initially, tableRef.current should be null
        expect(result.current.tableRef.current).toBeNull();
    });

    test('should call onDownload when invoked', async () => {
        const { result } = renderHook(() => useTable());
        const { onDownload } = result.current;

        // Call the onDownload function
        act(() => {
            onDownload();
        });

        // Ensure the onDownload function was called
        expect(onDownload).toHaveBeenCalledTimes(1); // Check if it's been called exactly once
    });

    test.skip('should pass correct arguments to useDownloadExcel hook', () => {
        const { result } = renderHook(() => useTable());

        // Access the mock of useDownloadExcel to check the arguments passed to it
        const useDownloadExcelMock = require('../../../src/hook/useTable').useDownloadExcel;

        // Call onDownload to trigger the mock
        act(() => {
            result.current.onDownload();
        });

        // Ensure useDownloadExcel was called with correct arguments
        const [ args ] = useDownloadExcelMock.mock.calls[0]; // Get the first call's arguments

        // Check that the values are correct (note: tableRef is null, filename is 'Users table', sheet is 'Users')
        expect(args.currentTableRef).toBeNull();
        expect(args.filename).toBe('Users table');
        expect(args.sheet).toBe('Users');
    });
});
