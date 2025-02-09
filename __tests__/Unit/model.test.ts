import { DELIVERY } from "../../src/interface/entity/delivery.model";
import { exampleSearch, ORDER } from "../../src/interface/entity/order.model";
import { PAYMENT } from "../../src/interface/entity/payment.model";
import { PRODUCT, PRODUCT_FILTER_PRICE } from "../../src/interface/entity/product.model";
import { TROLLEY } from "../../src/interface/entity/trolley.model";
import { ROLE, USER_STATUS } from "../../src/interface/Utils";

describe('Tests Model', () => {
    describe('DELIVERY Enum Tests', () => {
        test('DELIVERY.KEY should be "delivery_query"', () => {
            expect(DELIVERY.KEY).toBe('delivery_query');
        });

        test('DELIVERY should have correct keys and values', () => {
            expect(Object.keys(DELIVERY)).toContain('KEY');
            expect(Object.values(DELIVERY)).toContain('delivery_query');
        });
    });

    describe('ExampleSearch and ORDER Tests', () => {
        // Test the ORDER enum
        test('ORDER.KEY should be "order_query"', () => {
            expect(ORDER.KEY).toBe('order_query');
        });

        test('ORDER.HISTORY should be "history"', () => {
            expect(ORDER.HISTORY).toBe('history');
        });

        test('ORDER should have correct keys and values', () => {
            expect(Object.keys(ORDER)).toEqual(expect.arrayContaining([ 'KEY', 'HISTORY' ]));
            expect(Object.values(ORDER)).toEqual(expect.arrayContaining([ 'order_query', 'history' ]));
        });

        // Test the exampleSearch object
        test('exampleSearch should have correct values', () => {
            expect(exampleSearch.receiverName).toBe('Alice');
            expect(exampleSearch.status).toBe('Pending');
            expect(exampleSearch?.dateRange?.start).toEqual(new Date('2024-12-01'));
            expect(exampleSearch?.dateRange?.end).toEqual(new Date('2024-12-31'));
            expect(exampleSearch.productId).toBe('prod-001');
        });

        test('exampleSearch dateRange should be valid', () => {
            // @ts-ignore
            const { start, end } = exampleSearch?.dateRange;
            expect(start).toBeInstanceOf(Date);
            expect(end).toBeInstanceOf(Date);
            expect(start.getTime()).toBeLessThanOrEqual(end.getTime()); // Ensure start is before or equal to end
        });
    });

    describe('PAYMENT Enum Tests', () => {
        test('PAYMENT.KEY should be "payment_query"', () => {
            expect(PAYMENT.KEY).toBe('payment_query');
        });

        test('PAYMENT should contain the correct keys and values', () => {
            expect(Object.keys(PAYMENT)).toContain('KEY');
            expect(Object.values(PAYMENT)).toContain('payment_query');
        });
    });

    describe('Enum Tests for PRODUCT and PRODUCT_FILTER_PRICE', () => {
        // Tests for PRODUCT enum
        test('PRODUCT.KEY should be "product_query"', () => {
            expect(PRODUCT.KEY).toBe('product_query');
        });

        test('PRODUCT.TYPE should be "type"', () => {
            expect(PRODUCT.TYPE).toBe('type');
        });

        test('PRODUCT should contain correct keys and values', () => {
            expect(Object.keys(PRODUCT)).toEqual(expect.arrayContaining([ 'KEY', 'TYPE' ]));
            expect(Object.values(PRODUCT)).toEqual(expect.arrayContaining([ 'product_query', 'type' ]));
        });

        // Tests for PRODUCT_FILTER_PRICE enum
        test('PRODUCT_FILTER_PRICE.NORMAL should be "NORMAL"', () => {
            expect(PRODUCT_FILTER_PRICE.NORMAL).toBe('NORMAL');
        });

        test('PRODUCT_FILTER_PRICE.HIGH should be "HIGH"', () => {
            expect(PRODUCT_FILTER_PRICE.HIGH).toBe('HIGH');
        });

        test('PRODUCT_FILTER_PRICE.LOW should be "LOW"', () => {
            expect(PRODUCT_FILTER_PRICE.LOW).toBe('LOW');
        });

        test('PRODUCT_FILTER_PRICE should contain correct keys and values', () => {
            expect(Object.keys(PRODUCT_FILTER_PRICE)).toEqual(expect.arrayContaining([ 'NORMAL', 'HIGH', 'LOW' ]));
            expect(Object.values(PRODUCT_FILTER_PRICE)).toEqual(expect.arrayContaining([ 'NORMAL', 'HIGH', 'LOW' ]));
        });
    });

    describe('TROLLEY Enum Tests', () => {
        // Test specific enum values
        test('TROLLEY.KEY should be "trolley_query"', () => {
            expect(TROLLEY.KEY).toBe('trolley_query');
        });

        test('TROLLEY.COUNT should be "count"', () => {
            expect(TROLLEY.COUNT).toBe('count');
        });

        test('TROLLEY.selected should be "selected"', () => {
            expect(TROLLEY.selected).toBe('selected');
        });

        test('TROLLEY.counter should be "counter"', () => {
            expect(TROLLEY.counter).toBe('counter');
        });

        test('TROLLEY.order should be "order"', () => {
            expect(TROLLEY.order).toBe('order');
        });

        // Test overall structure of TROLLEY enum
        test('TROLLEY should have the correct keys and values', () => {
            expect(Object.keys(TROLLEY)).toEqual(expect.arrayContaining([ 'KEY', 'COUNT', 'selected', 'counter', 'order' ]));
            expect(Object.values(TROLLEY)).toEqual(expect.arrayContaining([ 'trolley_query', 'count', 'selected', 'counter', 'order' ]));
        });
    });

    describe('Enum Tests for ROLE and USER_STATUS', () => {
        // Tests for ROLE enum
        test('ROLE.USER should be "USER"', () => {
            expect(ROLE.USER).toBe('USER');
        });

        test('ROLE.ADMIN should be "ADMIN"', () => {
            expect(ROLE.ADMIN).toBe('ADMIN');
        });

        test('ROLE should contain correct keys and values', () => {
            expect(Object.keys(ROLE)).toEqual(expect.arrayContaining([ 'USER', 'ADMIN' ]));
            expect(Object.values(ROLE)).toEqual(expect.arrayContaining([ 'USER', 'ADMIN' ]));
        });

        // Tests for USER_STATUS enum
        test('USER_STATUS.OTP should be "OTP"', () => {
            expect(USER_STATUS.OTP).toBe('OTP');
        });

        test('USER_STATUS.RESET should be "RESET"', () => {
            expect(USER_STATUS.RESET).toBe('RESET');
        });

        test('USER_STATUS.COMPLETED should be "COMPLETED"', () => {
            expect(USER_STATUS.COMPLETED).toBe('COMPLETED');
        });

        test('USER_STATUS should contain correct keys and values', () => {
            expect(Object.keys(USER_STATUS)).toEqual(expect.arrayContaining([ 'OTP', 'RESET', 'COMPLETED' ]));
            expect(Object.values(USER_STATUS)).toEqual(expect.arrayContaining([ 'OTP', 'RESET', 'COMPLETED' ]));
        });
    });

});
