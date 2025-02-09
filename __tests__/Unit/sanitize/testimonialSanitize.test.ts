import { expect, test } from 'vitest';
import { testimonialSanitize } from "../../../src/sanitize/testimonial.sanitize";

describe('Test employee sanitized', () => {

    test('should correctly sanitize and return expected data', () => {
        const mockFormData = new FormData();
        mockFormData.set('name', 'John Doe');
        mockFormData.set('desc', 'A software engineer');
        mockFormData.set('social', '@john_doe');
        mockFormData.set('jobs', 'Developer');
        mockFormData.set('method', 'POST');
        mockFormData.set('id', '123');

        const result = testimonialSanitize(mockFormData);

        expect(result).toEqual({
            name: 'John Doe',
            social: 'A software engineer',
            desc: '@john_doe',
            jobs: 'Developer',
            method: 'POST',
            id: 123
        });
    });

    test('should return default values when formData is missing fields', () => {
        const mockFormData = new FormData();
        mockFormData.set('method', 'PUT');
        mockFormData.set('id', '456');

        const result = testimonialSanitize(mockFormData);

        expect(result).toEqual({
            name: '',
            social: '',
            desc: '',
            jobs: '',
            method: 'PUT',
            id: 456
        });
    });

    test('should return default empty string for missing fields', () => {
        const mockFormData = new FormData();

        const result = testimonialSanitize(mockFormData);

        expect(result).toEqual({
            name: '',
            social: '',
            desc: '',
            jobs: '',
            method: "null",
            id: 0
        });
    });
});
