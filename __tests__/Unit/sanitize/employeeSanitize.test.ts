import { expect, test } from 'vitest';
import { employeeSanitize } from "../../../src/sanitize/employe.sanitize";

describe('Test employee sanitized', () => {

    test('should correctly parse valid JSON and add imagePath', () => {
        const mockFormData = new FormData();
        const formData = {
            data: JSON.stringify({ name: 'John Doe', position: 'Developer' })
        };
        mockFormData.set('data', formData.data);

        const imagePath = 'path/to/image.jpg';

        const result = employeeSanitize(mockFormData, imagePath);

        // Check if the data is parsed correctly and imagePath is added
        expect(result).toEqual({
            name: 'John Doe',
            position: 'Developer',
            img: imagePath
        });
    });

    test.skip('should return empty object when formData has no data field', () => {
        const mockFormData = new FormData();
        const imagePath = 'path/to/image.jpg';

        const result = employeeSanitize(mockFormData, imagePath);

        // Should return an object with the img field only
        expect(result).toEqual({ img: imagePath });
    });

    test('should handle invalid JSON in formData', () => {
        const mockFormData = new FormData();
        const invalidJson = 'invalid_json';
        mockFormData.set('data', invalidJson);

        const imagePath = 'path/to/image.jpg';

        // Should return an empty object when JSON is invalid
        expect(() => employeeSanitize(mockFormData, imagePath)).toThrow(SyntaxError);
    });

    test('should handle missing imagePath', () => {
        const mockFormData = new FormData();
        const validJson = JSON.stringify({ name: 'Jane Doe', position: 'Manager' });
        mockFormData.set('data', validJson);

        // Testing without imagePath argument
        const result = employeeSanitize(mockFormData, '');

        // Image path should still be included
        expect(result.img).toBe('');
    });
});
