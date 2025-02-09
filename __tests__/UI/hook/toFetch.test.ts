import { expect, test, vi } from 'vitest';
import { toFetch } from "../../../src/hook/toFetch";

// Mocking fetch
vi.mock('node-fetch', async () => {
    const actual = await vi.importActual('node-fetch');
    return {
        ...actual,
        fetch: vi.fn(),
    };
});

const mockFetch = vi.fn();

describe('toFetch function', () => {
    const originalEnv = process.env;

    beforeAll(() => {
        process.env = { ...originalEnv, NEXT_PUBLIC_URL_API: 'https://api.example.com' };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    test('should make a GET request and return response', async () => {
        const mockResponse = { data: 'test data' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        // Replace global fetch with the mock function
        global.fetch = mockFetch;

        const result = await toFetch('GET', { url: 'test-url' });

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/api/test-url',
            expect.objectContaining({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'default',
                next: { revalidate: 0 },
            })
        );
        expect(result).toEqual(mockResponse);
    });

    test('should handle GET request with cacheData options', async () => {
        const mockResponse = { data: 'cached data' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        // Replace global fetch with the mock function
        global.fetch = mockFetch;

        const result = await toFetch('GET', {
            url: 'test-url', cacheData: {
                cache: 'no-store',
                // @ts-ignore
                next: {
                    revalidate: 1
                }
            }
        });

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/api/test-url',
            expect.objectContaining({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
                next: { revalidate: 1 },
            })
        );
        expect(result).toEqual(mockResponse);
    });

    test('should make a POST request with body and return response', async () => {
        const mockResponse = { data: 'posted data' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        // Replace global fetch with the mock function
        global.fetch = mockFetch;

        const result = await toFetch('POST', { url: 'test-url', data: { key: 'value' } });

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.example.com/api/test-url',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '{"key":"value"}',
            })
        );
        expect(result).toEqual(mockResponse);
    });

    test('should throw an error if fetch response is not ok', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            text: async () => 'Error message',
        });

        // Replace global fetch with the mock function
        global.fetch = mockFetch;

        try {
            await toFetch('GET', { url: 'test-url' });
        } catch (error) {
            expect(error).toEqual(new Error('HTTP error! status'));
        }
    });

    test('should throw error if fetch fails', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network Error'));

        // Replace global fetch with the mock function
        global.fetch = mockFetch;

        try {
            await toFetch('GET', { url: 'test-url' });
        } catch (error) {
            expect(error).toEqual(new Error('Network Error'));
        }
    });
});
