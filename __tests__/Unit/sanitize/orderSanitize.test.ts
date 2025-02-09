import { describe, test } from "vitest"
import { orderSanitize, orderTransactionSanitize } from "../../../src/sanitize/order.sanitize";

// Sample mock data for TOrderTransactionDB
const mockOrderTransactionDB = {
    id: 'order-id',
    Customers: {
        id: 'customer-id',
        name: 'Alice',
        phone: '1234567890',
    },
    address: '123 Main St',
    desc: 'Order description',
    nameDelivery: 'John Doe',
    phoneDelivery: '9876543210',
    priceDelivery: 5.0,
    Payments: { name: 'Credit Card' },
    orderTime: '2024-01-01T00:00:00Z',
    sendTime: '2024-01-02T00:00:00Z',
    status: 'pending',
    totalPayment: 100.0,
    Trolleys: [
        {
            Product: { price: 20.0 },
            qty_at_buy: 2,
        },
        {
            Product: { price: 30.0 },
            qty_at_buy: 1,
        },
    ],
    totalAll: 130.0,
};

// Sample mock data for OrderFormAdmin
const mockOrderFormAdmin = {
    delivery: { id: 'delivery-id' },
    order: {
        id_customer: 'customer-id',
        addressCs: 'address',
        desc: 'description',
        orderTime: '2024-01-01T00:00:00Z',
        sendTime: '2024-01-02T00:00:00Z',
        nameDelivery: 'John Doe',
        phoneDelivery: '1234567890',
        priceDelivery: 5.0,
        totalPayment: 100.0,
        totalAll: 120.0,
        status: 'pending',
    },
    receiver: 'Alice',
    payment: { id: 'payment-id' },
    product: [
        {
            id: 'product-id-1',
            qty_at_buy: 1,
            price_at_buy: 20,
            id_product: 'prod-001',
        },
        {
            id: 'product-id-2',
            qty_at_buy: 2,
            price_at_buy: 25,
            id_product: 'prod-002',
        },
    ],
};

describe('orderSanitize test', () => {
    describe('orderSanitize fun ', () => {
        test('should return sanitized data when provided with valid input', () => {
            const result = orderSanitize(mockOrderTransactionDB);

            expect(result).toEqual({
                id: 'order-id',
                id_customer: 'customer-id',
                nameCs: 'Alice',
                phoneCs: '1234567890',
                addressCs: '123 Main St',
                desc: 'Order description',
                nameDelivery: 'John Doe',
                phoneDelivery: '9876543210',
                priceDelivery: 5.0,
                namePayment: 'Credit Card',
                orderTime: '2024-01-01T00:00',
                sendTime: '2024-01-02T00:00',
                status: 'pending',
                totalPayment: 100.0,
                totalProduct: 70.0, // (2 * 20) + (1 * 30)
                totalAll: 130.0,
            });
        });

        test('should return undefined when no data is provided', () => {
            const result = orderSanitize(undefined);
            expect(result).toBeUndefined();
        });

        test('should handle missing or incomplete data gracefully', () => {
            const incompleteData = { ...mockOrderTransactionDB };
            // @ts-ignore
            delete incompleteData.Customers; // Simulate missing customer data
            const result = orderSanitize(incompleteData);
            expect(result).toBeUndefined();//TypeError: Cannot read properties of undefined (reading 'id')
        });
    });

    describe('orderTransactionSanitize', () => {
        test('should throw an error if payment is not complete', () => {
            const invalidPayment = { ...mockOrderFormAdmin, payment: { id: '' } };

            expect(() => orderTransactionSanitize(invalidPayment)).toThrow(
                'Payment is not complete'
            );
        });

        test('should throw an error if delivery is not complete', () => {
            const invalidDelivery = { ...mockOrderFormAdmin, delivery: { id: '' } };

            expect(() => orderTransactionSanitize(invalidDelivery)).toThrow(
                'Delivery is not complete'
            );
        });

        test('should throw an error if products are empty', () => {
            const invalidProduct = { ...mockOrderFormAdmin, product: [] };

            expect(() => orderTransactionSanitize(invalidProduct)).toThrow('product is Empty');
        });

        test('should return a valid sanitized order object', () => {
            const sanitizedOrder = orderTransactionSanitize(mockOrderFormAdmin);

            expect(sanitizedOrder).toEqual({
                orderReceiver: 'Alice',
                orderTrolley: [
                    {
                        id: 'product-id-1',
                        qty_at_buy: 1,
                        price_at_buy: 20,
                        id_user: 'customer-id',
                        id_product: 'prod-001',
                    },
                    {
                        id: 'product-id-2',
                        qty_at_buy: 2,
                        price_at_buy: 25,
                        id_user: 'customer-id',
                        id_product: 'prod-002',
                    },
                ],
                order: {
                    id_customer: 'customer-id',
                    address: 'address',
                    desc: 'description',
                    orderTime: '2024-01-01T00:00:00Z',
                    sendTime: '2024-01-02T00:00:00Z',
                    id_delivery: 'delivery-id',
                    nameDelivery: 'John Doe',
                    phoneDelivery: '1234567890',
                    priceDelivery: 5.0,
                    id_payment: 'payment-id',
                    totalPayment: 100.0,
                    totalAll: 120.0,
                    status: 'pending',
                },
            });
        });
    });
});
