import { describe, expect, test } from "vitest"
import { CustomerCreate } from "../../../src/validation/orderReceiver.valid";
import { customerExample } from "../../../src/assets/customer.example";

describe('Customer Tests Validation', () => {

    test("customer validation", () => {
        const data = CustomerCreate.parse(customerExample)
        expect(data).toEqual(customerExample)
    })

})
