import { expect, test } from "vitest";
import { examplePayment } from "../../../src/assets/ExamplePayment";
import { PaymentCreate } from "../../../src/validation/payment.valid";

test("Payment valid test", () => {
    const data = PaymentCreate.parse(examplePayment)
    expect(data).toEqual(examplePayment)
})
