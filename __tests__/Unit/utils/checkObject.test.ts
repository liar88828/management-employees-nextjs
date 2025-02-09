import { TMethod } from "../../../src/interface/Utils";
import { checkObject } from "../../../src/utils/checkObject";

describe('checkObject Function Tests', () => {
    test('should return true for an empty object', () => {
        expect(checkObject({})).toBe(true);
    });

    test('should return false for an object with keys', () => {
        expect(checkObject({ key: 'value' })).toBe(false);
    });

    test('should return true for null', () => {
        expect(checkObject(null)).toBe(true);
    });

    test('should return true for undefined', () => {
        expect(checkObject(undefined)).toBe(true);
    });

    test('should return true for non-object types', () => {
        expect(checkObject('string' as unknown as TMethod)).toBe(true);
        expect(checkObject(123 as unknown as TMethod)).toBe(true);
        expect(checkObject([] as unknown as TMethod)).toBe(true); // Arrays will pass as empty objects if empty
    });

    test('should return false for an object with multiple keys', () => {
        expect(checkObject({ a: 1, b: 2 })).toBe(false);
    });
});
